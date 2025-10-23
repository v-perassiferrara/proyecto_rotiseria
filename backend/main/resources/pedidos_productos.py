from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Pedidos_Productos_db


class Pedidos_Productos(Resource):
    # GET: Obtener listado de Pedidos_Productos / Registros de todos los pedidos. Rol: ADMIN  
    def get(self):
        pedidos_productos = db.session.query(Pedidos_Productos_db).all()
        return jsonify([linea.to_json() for linea in pedidos_productos])

    # GET: obtener una lista de usuarios Rol: USER/ADMIN/EMPLEADO  
    def get(self):
        page = 1 #Página inicial por defecto
        per_page = 10  #Cantidad de elementos por página por defecto
        
        #no ejecuto el .all()
        pedidos_productos = db.session.query(Pedidos_Productos_db)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        #Obtener valor paginado
        pedidos_productos = pedidos_productos.paginate(page=page, per_page=per_page, error_out=False)
    
        return jsonify({'pedidos-productos': [linea.to_json() for linea in pedidos_productos],
                  'total': pedidos_productos.total,
                  'pages': pedidos_productos.pages,
                  'page': page
                })
    
    # POST: Agregar una linea (producto) a un pedido. Rol: ADMIN
    def post(self):
        linea = Pedidos_Productos_db.from_json(request.get_json())
        db.session.add(linea)
        db.session.commit()
        return linea.to_json(), 201

    
class Pedido_Producto(Resource):
    # GET: Obtener una línea específica por su id. Rol: USER/ADMIN/EMPLEADO 
    def get(self, id):
        linea = db.session.query(Pedidos_Productos_db).get_or_404(id)
        return jsonify(linea.to_json())
    

    # DELETE: Eliminar una linea. Rol: ADMIN/EMPLEADO   
    def delete(self, id):
        linea = db.session.query(Pedidos_Productos_db).get_or_404(id)
        db.session.delete(linea)
        db.session.commit()
        return {
            'message': 'Línea eliminada con éxito',
            'linea': linea.to_json()
        }, 200
    
    # PUT: Editar una línea. Rol: ADMIN  
    def put(self, id):
        linea = db.session.query(Pedidos_Productos_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(linea, key, value)
        db.session.add(linea)
        db.session.commit()
        return linea.to_json(), 201
