from flask_restful import Resource
from flask import request


PEDIDOS = {
    1: {
        "id_usuario": 2,
        "producto": "Hamburguesa, pancho",
        "total": 200,
        "estado": "preparacion"
    },

    2: {
        "id_usuario": 2,
        "producto": "Empanadas ",
        "total": 200,
        "estado": "confirmado"
    },

    3: {
        "id_usuario": 3,
        "producto": "Lomopizza",
        "total": 200,
        "estado": "cancelado"
    }
}



class Pedidos(Resource):

# GET: Obtener listado de Pedidos. Rol: ADMIN  
    def get(self):
        return PEDIDOS


# POST: Crear un usuario. Rol: ADMIN
    def post(self):

        pedido = request.get_json()
        id = max(PEDIDOS.keys())+1
        PEDIDOS[id] = pedido
        return "Pedido creado con éxito", 201
    


class Pedido(Resource):

# GET: Obtener un pedido. Rol: USER/ADMIN/ENCARGADO 
    def get(self, id):
        
        if id in PEDIDOS:
            return PEDIDOS[id]
        
        return "El id es inexistente", 404


# DELETE: Eliminar un pedido. Rol: ADMIN/ENCARGADO
    def delete(self, id):

        if id in PEDIDOS:
            del PEDIDOS[id]
            return "Cancelado con éxito", 204  

        return "El id del pedido a cancelar es inexistente", 404


# PUT: Editar un usuario. Rol: ADMIN  
    def put(self, id):

        if id in PEDIDOS:
            pedido = PEDIDOS[id]
            data = request.get_json()
            pedido.update(data)
            return "Pedido modificado con éxito", 201

        return "El id a modificar es inexistente", 404