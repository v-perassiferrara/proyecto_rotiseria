from flask_restful import Resource
from flask import request



PRODUCTOS = {
    1: {"nombre": "Pollo con papas" , "cantidad" : 4 , "precio" : "$242" , "estado" : "visible"},
    2: {"nombre": "Arroz blanco" , "cantidad" : 5 , "precio" : "$600" , "estado" : "visible"},
    3: {"nombre": "Bife a la criolla" , "cantidad" : 8 , "precio" : "$125,38" , "estado" : "visible"},
    4: {"nombre": "Ensalada de frutas" , "cantidad" : 2 , "precio" : "$100" , "estado" : "visible"},
    5: {"nombre": "Pasta con salsa" , "cantidad" : 10 , "precio" : "$200" , "estado" : "oculto"},
    6: {"nombre": "Pizza de muzzarella" , "cantidad" : 3 , "precio" : "$150" , "estado" : "visible"},
}



class Productos(Resource):

# GET: obtener una lista de productos Rol: USER/ADMIN/ENCARGADO  
    def get(self):

        productos_visibles = {k: v for k, v in PRODUCTOS.items() if v["estado"] == "visible"}

        return productos_visibles


# POST: crear un producto Rol: ADMIN
    def post(self):

        producto = request.get_json()
        id = max(PRODUCTOS.keys())+1
        PRODUCTOS[id] = producto
        return "Producto creado con éxito", 201



class Producto(Resource):

# GET: Obtener un producto. Rol: ADMIN  
    def get(self, id):
        
        if id in PRODUCTOS:
            return PRODUCTOS[id]
            
        return "El id de producto es inexistente", 404

# DELETE: Eliminar un producto (ocultar/descontinuar). Rol: ADMIN
    def delete(self, id):

        if id in PRODUCTOS:
            PRODUCTOS[id]["estado"] = "oculto"
            return "Producto eliminado (ocultado) con éxito", 204

        return "El id de producto a eliminar es inexistente", 404

# PUT: Editar un producto. Rol: ADMIN/ENCARGADO  
    def put(self, id):

        if id in PRODUCTOS:
            producto = PRODUCTOS[id]
            data = request.get_json()
            producto.update(data)
            return "Producto modificado con éxito", 201

        return "El id de producto a modificar es inexistente", 404