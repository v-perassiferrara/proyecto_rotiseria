from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Pedidos_Productos_db

class Pedidos_Productos(Resource):
    def post(self):
        pedidos_id = request.get_json().get('pedidos')
        producto = ProductoModel.from_json(request.get_json())
        
        if exhibiciones_ids:
            # Obtener las instancias de Exhibicion basadas en las ids recibidas
            exhibiciones = ExhibicionesModel.query.filter(ExhibicionesModel.id.in_(exhibiciones_ids)).all()
            # Agregar las instancias de Exhibicion a la lista de exhibiciones del Animal
            animal.exhibiciones.extend(exhibiciones)
            
        db.session.add(animal)
        db.session.commit()
        return animal.to_json(), 201