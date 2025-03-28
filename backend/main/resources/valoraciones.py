from flask_restful import Resource
from flask import request


VALORACIONES = {
    1: {"id_usuario": 1 , "id_producto": 1 , "estrellas": 3 , "comentario" : "Muy bueno!" },
    2: {"id_usuario": 2 , "id_producto": 2 , "estrellas": 2 , "comentario" : "Maso menos!" },
    3: {"id_usuario": 3 , "id_producto": 3, "estrellas": 5,"comentario" : "Excelente!" }
}

class Valoraciones(Resource):

# GET: Obtener una valoracion. Rol: ADMIN  
    def get(self):

        return VALORACIONES


# POST: Agregar una valoracion. Rol: USUARIO
    def post(self):
        
        valoracion = request.get_json() 
        id = max(VALORACIONES.keys())+1 
        VALORACIONES[id] = valoracion 
        return "Valoracion creada con éxito", 201