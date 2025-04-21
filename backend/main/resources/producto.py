from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Producto_db


# PRODUCTOS = {
#     1: {"nombre": "Pollo con papas" , "cantidad" : 4 , "precio" : "$242" , "estado" : "visible"},
#     2: {"nombre": "Arroz blanco" , "cantidad" : 5 , "precio" : "$600" , "estado" : "visible"},
#     3: {"nombre": "Bife a la criolla" , "cantidad" : 8 , "precio" : "$125,38" , "estado" : "visible"},
#     4: {"nombre": "Ensalada de frutas" , "cantidad" : 2 , "precio" : "$100" , "estado" : "visible"},
#     5: {"nombre": "Pasta con salsa" , "cantidad" : 10 , "precio" : "$200" , "estado" : "oculto"},
#     6: {"nombre": "Pizza de muzzarella" , "cantidad" : 3 , "precio" : "$150" , "estado" : "visible"},
# }


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
        db.session.delete(producto)
        db.session.commit()
        return 'producto borrado con exito:', producto.to_json(), 200 

# PUT: Editar un producto. Rol: ADMIN/ENCARGADO  
    def put(self, id):
        producto = db.session.query(Producto_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(producto, key, value)
        db.session.add(producto)
        db.session.commit()
        return producto.to_json(), 201
        