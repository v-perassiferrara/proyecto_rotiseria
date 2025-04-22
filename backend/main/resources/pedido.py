from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Pedido_db


class Pedidos(Resource):
    # GET: Obtener listado de Pedidos. Rol: ADMIN  
    def get(self):
        pedidos = db.session.query(Pedido_db).all()
        return jsonify([pedido.to_json() for pedido in pedidos])

    # POST: Crear un pedido. Rol: ADMIN
    def post(self):
        pedido = Pedido_db.from_json(request.get_json())
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 201

class Pedido(Resource):
    # GET: Obtener un pedido. Rol: USER/ADMIN/ENCARGADO
    def get(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        return jsonify(pedido.to_json())

    # DELETE: Eliminar un pedido. Rol: ADMIN/ENCARGADO   
    def delete(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return 'pedido borrado con exito:', pedido.to_json(), 200

        pedido = db.session.query(Pedido_db).get_or_404(id)
        setattr(pedido, 'estado', 'cancelado') 
        db.session.add(pedido)
        db.session.commit()
        return {
            'message': 'Pedido cancelado con éxito',
            'pedido': pedido.to_json()
        }, 200  # con 204 flask no devuelve el mensaje

    # PUT: Editar un pedido. Rol: ADMIN  
    def put(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(pedido, key, value)
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 201
