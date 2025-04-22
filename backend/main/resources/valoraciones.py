from flask_restful import Resource
from flask import request, jsonify
from .. import db
# from main.models.productos_db import Valoraciones     CONSULTAR


# VALORACIONES = {
#     1: {"id_usuario": 1 , "id_producto": 1 , "estrellas": 3 , "comentario" : "Muy bueno!" },
#     2: {"id_usuario": 2 , "id_producto": 2 , "estrellas": 2 , "comentario" : "Maso menos!" },
#     3: {"id_usuario": 3 , "id_producto": 3, "estrellas": 5,"comentario" : "Excelente!" }
# }

class Valoraciones(Resource):
    pass
# # GET: Obtener una valoracion. Rol: ADMIN  
#     def get(self):
#         valoraciones = db.session.query(Valoraciones).all()
#         return jsonify([valoracion.to_json() for valoracion in valoraciones])


# # POST: Agregar una valoracion. Rol: USUARIO
#     def post(self):
#         valoracion = Valoraciones.from_json(request.get_json())
#         db.session.add(valoracion)
#         db.session.commit()
#         return valoracion.to_json(), 201

