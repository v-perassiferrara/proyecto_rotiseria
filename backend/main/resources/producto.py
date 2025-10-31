from flask_restful import Resource
from flask import request, jsonify
from .. import db
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required
from main.models import Producto_db


class Productos(Resource):
    
    
# GET: obtener una lista de productos Rol: USER/ADMIN/EMPLEADO
    @jwt_required(optional=True)
    def get(self):

        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 10
        
        productos = db.session.query(Producto_db)

        # Bandera para saber si se usó el filtro top3
        is_top3 = False

        # Objeto de consulta final que se paginará
        query_to_paginate = productos

        # --- FILTRO PARA OBTENER LOS PRIMEROS 3 PRODUCTOS RECIENTES ---
        if request.args.get('top3', type=str) and request.args.get('top3', type=str).lower() == 'true':

            query_to_paginate = query_to_paginate.filter(Producto_db.visible == True)
            query_to_paginate = query_to_paginate.order_by(Producto_db.id.desc())
            query_to_paginate = query_to_paginate.limit(3)

            per_page = 3
            page = 1
            is_top3 = True
        # -------------------------------------------------------------------------

        # --- MANEJO DE PAGINACIÓN ESTÁNDAR ---
        if not is_top3:
            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))


        # ---FILTROS PARA PRODUCTOS---

        # Filtrar por nombre (búsqueda parcial)
        if request.args.get('nombre'):
            productos = productos.filter(Producto_db.nombre.ilike(f"%{request.args.get('nombre')}%"))

        # Filtrar por precio mínimo
        if request.args.get('precio_min'):
            productos = productos.filter(Producto_db.precio >= float(request.args.get('precio_min')))

        # Filtrar por precio máximo
        if request.args.get('precio_max'):
            productos = productos.filter(Producto_db.precio <= float(request.args.get('precio_max')))

        # Filtrar por id de categoria
        if request.args.get('categoria'):
            productos = productos.filter(Producto_db.fk_id_categoria == int(request.args.get('categoria')))

        # Ordenar por nombre
        if request.args.get('sortby_nombre'):
            productos = productos.order_by(Producto_db.nombre.desc() if request.args.get('sortby_nombre') == 'desc' else Producto_db.nombre.asc())

        # Ordenar por precio
        if request.args.get('sortby_precio'):
            productos = productos.order_by(Producto_db.precio.desc() if request.args.get('sortby_precio') == 'desc' else Producto_db.precio.asc())


        #Obtener valor paginado
        productos = productos.paginate(page=page, per_page=per_page, error_out=False)

        
        claims = get_jwt()
        
        if claims.get("rol") in ["admin", "empleado"]:
            return jsonify({
        'productos': [producto.to_json_complete() for producto in productos.items],
                'total': productos.total,
                'pages': productos.pages,
                'page': page
            })

        else:
            return jsonify({
        'productos': [producto.to_json() for producto in productos.items],
                'total': productos.total,
                'pages': productos.pages,
                'page': page
            })

    


# POST: crear un producto Rol: ADMIN
    @jwt_required(optional=False)
    @role_required(roles = ["admin"]) 
    def post(self):
        producto = Producto_db.from_json(request.get_json())
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 201
        


class Producto(Resource):

# GET: Obtener un producto. Rol: ADMIN  
    @jwt_required(optional=False)
    def get(self, id):
        claims = get_jwt()
        producto = db.session.query(Producto_db).get_or_404(id)     
        if claims.get("rol") == "admin":
            return jsonify(producto.to_json_complete())
        else:
            return jsonify(producto.to_json())


# DELETE: Eliminar un producto (ocultar/descontinuar). Rol: ADMIN
    @jwt_required(optional=False)
    @role_required(roles = ["admin"]) 
    def delete(self, id):
        producto = db.session.query(Producto_db).get_or_404(id)
        setattr(producto, 'visible', False) 
        db.session.add(producto)
        db.session.commit()
        return {
            'message': 'Producto bloqueado con éxito',
            'producto': producto.to_json()
        }, 200  # con 204 flask no devuelve el mensaje


# PUT: Editar un producto. Rol: ADMIN/EMPLEADO  
    @jwt_required(optional=False)
    @role_required(roles = ["admin", "empleado"]) 
    def put(self, id):
        producto = db.session.query(Producto_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(producto, key, value)
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 201
        