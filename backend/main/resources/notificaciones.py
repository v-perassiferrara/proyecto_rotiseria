from flask_restful import Resource
from flask import request


NOTIFICACIONES = {
    1: {"id_emisor": 1 , "id_receptor": 3 , "mensaje": "Tiene un descuento!"},
    2: {"id_emisor": 2 , "id_receptor": 1 , "mensaje": "Su pedido esta listo"},
    3: {"id_emisor": 3 , "id_receptor": 2 , "mensaje" : "Envio cancelado!"}
}

class Notificaciones(Resource):

# POST: Crear/enviar un notificacion. Rol: ADMIN
    def post(self):

        notificacion = request.get_json()
        id = max(NOTIFICACIONES.keys())+1
        NOTIFICACIONES[id] = notificacion
        return "Notificacion creada y enviada con éxito", 201