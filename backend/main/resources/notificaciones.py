from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Notificacion_db

class Notificaciones(Resource):
  
    # GET: Obtener listado de Notificaciones. Rol: ADMIN  
    def get(self):
        notificaciones = db.session.query(Notificacion_db).all()
        return jsonify([notificacion.to_json() for notificacion in notificaciones])

    # POST: Crear una notificacion. Rol: ADMIN
    def post(self):
        notificacion = Notificacion_db.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201

class Notificacion(Resource):
    # GET: Obtener una notificacion. Rol: USER/ADMIN/ENCARGADO
    def get(self, id):
        notificacion = db.session.query(Notificacion_db).get_or_404(id)
        return jsonify(notificacion.to_json())

    # DELETE: Eliminar una notificacion. Rol: ADMIN/ENCARGADO   
    def delete(self, id):
        notificacion = db.session.query(Notificacion_db).get_or_404(id)
        setattr(notificacion, 'leida', True) 
        db.session.add(notificacion)
        db.session.commit()
        return {
            'message': 'Notificacion marcada como leída',
            'notificacion': notificacion.to_json()
        }, 200  # con 204 flask no devuelve el mensaje

    # PUT: Editar una notificacion. Rol: ADMIN  
    def put(self, id):
        notificacion = db.session.query(Notificacion_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(notificacion, key, value)
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201
