from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required
from .. import db
from main.models import Promocion_db

class Promociones(Resource):

    # GET: obtener una lista de las promociones Rol: USER/ADMIN/EMPLEADO  
    @jwt_required(optional=False)
    def get(self):
        page = 1 #Página inicial por defecto
        per_page = 10  #Cantidad de elementos por página por defecto


        promociones = db.session.query(Promocion_db)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # ---FILTROS PARA promociones---

        # Filtrar por rango de fechas
        if request.args.get('fecha_inicio') and request.args.get('fecha_fin'):
            fecha_inicio = request.args.get('fecha_inicio')
            fecha_fin = request.args.get('fecha_fin')
            promociones = promociones.filter(Promocion_db.fecha >= fecha_inicio, Promocion_db.fecha <= fecha_fin)

        #Obtener valor paginado
        promociones = promociones.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'promociones': [promocion.to_json() for promocion in promociones],
            'total': promociones.total,
            'pages': promociones.pages,
            'page': page
        })
            

    # POST: Crear una promoción. Rol: ADMIN
    @jwt_required(optional=False)
    @role_required(roles = ["admin", "empleado"])
    def post(self):
        promocion = Promocion_db.from_json(request.get_json())
        db.session.add(promocion)
        db.session.commit()
        return promocion.to_json(), 201

class Promocion(Resource):

    # GET: Obtener una promocion. Rol: USUARIO/ADMIN/EMPLEADO
    @jwt_required(optional=False)
    def get(self, id):        
        promocion = db.session.query(Promocion_db).get_or_404(id)
        return promocion.to_json(), 201


    # DELETE: Eliminar una promocion. Rol: ADMIN   
    @jwt_required(optional=False)
    @role_required(roles = ["admin"])
    def delete(self, id):
        return {
            'message': 'No se puede eliminar una promocion',
        }, 200  # con 204 flask no devuelve el mensaje

    # PUT: Editar una promocion. Rol: ADMIN  
    @jwt_required(optional=False)
    @role_required(roles = ["admin"])
    def put(self, id):
        promocion = db.session.query(Promocion_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(promocion, key, value)
        db.session.add(promocion)
        db.session.commit()
        return promocion.to_json(), 201
