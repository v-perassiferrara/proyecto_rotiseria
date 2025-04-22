from flask_restful import Resource
from flask import request
from .. import db
from main.models import Usaurio_db

USUARIOS = {
    1: {"nombre": "Pepe Rodriguez" , "email": "pep34@gmail.com", "contrasena": "123" , "telefono": "261785478" , "rol": "admin" , "estado" : "activo" },
    2: {"nombre": "Jorge Messi" , "email": "messi@gmail.com" ,"contrasena": "111", "telefono": "261785478" , "rol": "empleado" , "estado" : "pendiente" },
    3: {"nombre": "Pepe Guardiola" , "email": "guardiolita@gmail.com" , "contrasena": "222", "telefono": "261785478" , "rol": "cliente" , "estado" : "bloqueado" }
}



class Usuarios(Resource):

# GET: Obtener listado de usuarios. Rol: ADMIN  
    def get(self):

        return USUARIOS


# POST: Crear un usuario. Rol: ADMIN
    def post(self):

        usuario = request.get_json()
        id = max(USUARIOS.keys())+1
        USUARIOS[id] = usuario
        return "Usuario creado con éxito", 201




class Usuario(Resource):
# GET: Obtener un usuario. Rol: ADMIN
    def get(self, id):
        
        if id in USUARIOS:
            return USUARIOS[id]
        
        return "El id es inexistente", 404


# DELETE: Eliminar un usuario (cambiar de estado o suspender). Rol: ADMIN/ENCARGADO
    def delete(self, id):

<<<<<<< Updated upstream
        if id in USUARIOS:
            USUARIOS[id]["estado"] = "bloqueado"
            return "Bloqueado con éxito", 204

        return "El id a bloquear es inexistente", 404
=======
        usuario = db.session.query(Usuario_db).get_or_404(id)
        usuario_a_borrar = usuario.to_json()
        setattr(usuario, 'estado', 'bloqueado') 
        db.session.add(usuario)
        db.session.commit()
        return {
            'message': 'Usuario bloqueado con éxito',
            'usuario': usuario.to_json()
        }, 200  # con 204 flask no devuelve el mensaje
>>>>>>> Stashed changes


# PUT: Editar un usuario. Rol: ADMIN  
    def put(self, id):

        if id in USUARIOS:
            usuario = USUARIOS[id]
            data = request.get_json()
            usuario.update(data)
            return "Usuario modificado con éxito", 201

        return "El id a modificar es inexistente", 404