from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Usuario_db

class Usuarios(Resource):

# GET: Obtener listado de usuarios. Rol: ADMIN  
    def get(self):
        usuarios = db.session.query(Usuario_db).all()
        return jsonify([usuario.to_json() for usuario in usuarios])


# POST: Crear un usuario. Rol: ADMIN
    def post(self):
        usuario = Usuario_db.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201




class Usuario(Resource):
# GET: Obtener un usuario. Rol: ADMIN
    def get(self, id):
        usuario = db.session.query(Usuario_db).get_or_404(id) 
        return jsonify(usuario.to_json()) 


# DELETE: Eliminar un usuario (cambiar de estado o suspender). Rol: ADMIN/ENCARGADO
    def delete(self, id):

        usuario = db.session.query(Usuario_db).get_or_404(id)
        setattr(usuario, 'estado', 'bloqueado') 
        db.session.add(usuario)
        db.session.commit()
        return {
            'message': 'Usuario bloqueado con éxito',
            'usuario': usuario.to_json()
        }, 200  # con 204 flask no devuelve el mensaje

# PUT: Editar un usuario. Rol: ADMIN  
    def put(self, id):

        usuario = db.session.query(Usuario_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
        
        