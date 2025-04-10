from flask_restful import Resource
from flask import request
from .. import db
from main.models import Usuaurio_db

USUARIOS = {
    1: {"nombre": "Pepe Rodriguez" , "email": "pep34@gmail.com", "contrasena": "123" , "telefono": "261785478" , "rol": "admin" , "estado" : "activo" },
    2: {"nombre": "Jorge Messi" , "email": "messi@gmail.com" ,"contrasena": "111", "telefono": "261785478" , "rol": "empleado" , "estado" : "pendiente" },
    3: {"nombre": "Pepe Guardiola" , "email": "guardiolita@gmail.com" , "contrasena": "222", "telefono": "261785478" , "rol": "cliente" , "estado" : "bloqueado" }
}



class Usuarios(Resource):

# GET: Obtener listado de usuarios. Rol: ADMIN  
    def get(self):
        usuarios = db.session.query(Usuaurio_db).all()
        return jsonify([usuario.to_json() for usuario in usuarios])


# POST: Crear un usuario. Rol: ADMIN
    def post(self):
        usuario = Usuaurio_db.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201




class Usuario(Resource):
# GET: Obtener un usuario. Rol: ADMIN
    def get(self, id):
       usuario = db.session.query(Usuaurio_db).get_or_404(id) 
       return jsonify(usuario.to_json()) 


# DELETE: Eliminar un usuario (cambiar de estado o suspender). Rol: ADMIN/ENCARGADO
    def delete(self, id):

        usuario = db.session.query(Usuaurio_db).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return 'usuario borrado con exito:', usuario.to_json(), 200  # con 204 flask no devuelve el mensaje


# PUT: Editar un usuario. Rol: ADMIN  
    def put(self, id):

        usuario = db.session.query(Usuaurio_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
        
        