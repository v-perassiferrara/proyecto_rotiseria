from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Valoracion_db  # Asegurate que esté bien importado

class Valoraciones(Resource):
    def get(self):
        valoraciones = db.session.query(Valoracion_db).all()
        return jsonify([v.to_json() for v in valoraciones])

    def post(self):
        data = request.get_json()
        nueva_valoracion = Valoracion_db.from_json(data)
        db.session.add(nueva_valoracion)
        db.session.commit()
        return nueva_valoracion.to_json(), 201

class Valoracion(Resource):
    # GET: Obtener una valoración por ID
    def get(self, id):
        valoracion = db.session.query(Valoracion_db).get_or_404(id)
        return jsonify(valoracion.to_json())

    # PUT: Editar una valoración por ID
    def put(self, id):
        valoracion = db.session.query(Valoracion_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(valoracion, key, value)
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201
