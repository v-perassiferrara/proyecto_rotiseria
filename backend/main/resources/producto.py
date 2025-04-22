from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Producto_db


class Productos(Resource):

# GET: obtener una lista de productos Rol: USER/ADMIN/ENCARGADO  
    def get(self):
        productos = db.session.query(Producto_db).all()
        productos_visibles = [producto.to_json() for producto in productos]
        return jsonify(productos_visibles)


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
        