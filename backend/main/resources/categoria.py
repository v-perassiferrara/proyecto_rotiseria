from flask_restful import Resource
from flask import request, jsonify
from .. import db
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required
from main.models import Categoria_db, Producto_db


class Categorias(Resource):
    
# GET: obtener una lista de categorias Rol: USER/ADMIN/EMPLEADO
    @jwt_required(optional=True)
    def get(self):

        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 10
        
        categorias = db.session.query(Categoria_db)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
            

        # ---FILTROS PARA CATEGORIAS---

        # Filtrar por nombre (búsqueda parcial)
        if request.args.get('nombre'):
            categorias = categorias.filter(Categoria_db.nombre.ilike(f"%{request.args.get('nombre')}%"))

                
        #Obtener valor paginado
        categorias = categorias.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
        'categorias': [categoria.to_json() for categoria in categorias.items],
                'total': categorias.total,
                'pages': categorias.pages,
                'page': page
            })


# POST: crear una categoria Rol: ADMIN, EMPLEADO
    @jwt_required(optional=False)
    @role_required(roles = ["admin" , "empleado"]) 
    def post(self):
        categoria = Categoria_db.from_json(request.get_json())
        db.session.add(categoria)
        db.session.commit()
        return categoria.to_json(), 201
        


class Categoria(Resource):

# GET: Obtener una categoria. Rol: ADMIN/EMPLEADO/USER  
    @jwt_required(optional=False)
    def get(self, id):
        categoria = db.session.query(Categoria_db).get_or_404(id)     
        return jsonify(categoria.to_json_complete())


# DELETE: Eliminar una categoria (eliminar toda la categoria con sus productos). Rol: ADMIN
    @jwt_required(optional=False)
    @role_required(roles = ["admin"]) 
    def delete(self, id):
        categoria = db.session.query(Categoria_db).get_or_404(id)


        """ setattr(categoria, 'visible', False)

        for producto in categoria.productos:
            setattr(producto, 'visible', False) """

        db.session.delete(categoria)
        db.session.commit()
        return {
            'message': 'Categoria borrada con éxito',
            'categoria': categoria.to_json_complete()
        }, 200  # con 204 flask no devuelve el mensaje


# PUT: Editar un categoria. Rol: ADMIN/EMPLEADO  
    @jwt_required(optional=False)
    @role_required(roles = ["admin", "empleado"]) 
    def put(self, id):
        categoria = db.session.query(Categoria_db).get_or_404(id)
        data = request.get_json()

        if 'visible' in data:
            for producto in categoria.productos:
                setattr(producto, 'visible', data['visible'])

        for key, value in data.items():
            setattr(categoria, key, value)
            
        db.session.add(categoria)
        db.session.commit()
        return categoria.to_json_complete(), 201