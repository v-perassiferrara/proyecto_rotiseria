from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Producto_db


class Productos(Resource):

# GET: obtener una lista de productos Rol: USER/ADMIN/ENCARGADO  
    def get(self):
        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 10
        
        #no ejecuto el .all()
        productos = db.session.query(Producto_db)
        
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

        # Ordenar por nombre
        if request.args.get('sortby_nombre'):
            productos = productos.order_by(Producto_db.nombre.desc() if request.args.get('sortby_nombre') == 'desc' else Producto_db.nombre.asc())

        # Ordenar por precio
        if request.args.get('sortby_precio'):
            productos = productos.order_by(Producto_db.precio.desc() if request.args.get('sortby_precio') == 'desc' else Producto_db.precio.asc())

                
        #Obtener valor paginado
        productos = productos.paginate(page=page, per_page=per_page, error_out=False)
    
        return jsonify({'productos': [producto.to_json() for producto in productos],
                  'total': productos.total,
                  'pages': productos.pages,
                  'page': page
                })


    


# POST: crear un producto Rol: ADMIN
    def post(self):
        producto = Producto_db.from_json(request.get_json())
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 201
        


class Producto(Resource):

# GET: Obtener un producto. Rol: ADMIN  
    def get(self, id):
        producto = db.session.query(Producto_db).get_or_404(id) 
        return jsonify(producto.to_json()) 
    

# DELETE: Eliminar un producto (ocultar/descontinuar). Rol: ADMIN
   
    def delete(self, id):

        producto = db.session.query(Producto_db).get_or_404(id)
        setattr(producto, 'visible', False) 
        db.session.add(producto)
        db.session.commit()
        return {
            'message': 'Producto bloqueado con éxito',
            'producto': producto.to_json()
        }, 200  # con 204 flask no devuelve el mensaje


# PUT: Editar un producto. Rol: ADMIN/ENCARGADO  
    def put(self, id):
        producto = db.session.query(Producto_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(producto, key, value)
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 201
        