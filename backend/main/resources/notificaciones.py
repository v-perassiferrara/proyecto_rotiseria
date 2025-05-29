from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required
from .. import db
from main.models import Notificacion_db

class Notificaciones(Resource):

    # GET: obtener una lista de las notificaciones Rol: USER/ADMIN/EMPLEADO  
    @jwt_required(optional=False)
    def get(self):
        page = 1 #Página inicial por defecto
        per_page = 10  #Cantidad de elementos por página por defecto

        claims = get_jwt()
        current_identity = int(get_jwt_identity())

        if claims.get("rol") == 'admin':
            # Al admin le devuelve todas las notificaciones
            notificaciones = db.session.query(Notificacion_db)
        else:
            # A los demás les devuelve solo sus notificaciones
            notificaciones = db.session.query(Notificacion_db).filter(Notificacion_db.fk_id_usuario == current_identity)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # ---FILTROS PARA NOTIFICACIONES---

        # Filtrar por leída/no leída
        if request.args.get('leida'):
            leida = request.args.get('leida').lower() == 'true'
            notificaciones = notificaciones.filter(Notificacion_db.leida == leida)

        # Filtrar por rango de fechas
        if request.args.get('fecha_inicio') and request.args.get('fecha_fin'):
            fecha_inicio = request.args.get('fecha_inicio')
            fecha_fin = request.args.get('fecha_fin')
            notificaciones = notificaciones.filter(Notificacion_db.fecha >= fecha_inicio, Notificacion_db.fecha <= fecha_fin)

        #Obtener valor paginado
        notificaciones = notificaciones.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'notificaciones': [notificacion.to_json() for notificacion in notificaciones],
            'total': notificaciones.total,
            'pages': notificaciones.pages,
            'page': page
        })
            

    # POST: Crear una notificacion. Rol: ADMIN
    @jwt_required(optional=False)
    @role_required(roles = ["admin", "empleado"])
    def post(self):
        notificacion = Notificacion_db.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201

class Notificacion(Resource):

    # GET: Obtener una notificacion. Rol: USUARIO/ADMIN/EMPLEADO
    @jwt_required(optional=False)
    def get(self, id):        
        claims = get_jwt()
        notificacion = db.session.query(Notificacion_db).get_or_404(id)
        current_identity = int(get_jwt_identity())
    
        if current_identity == notificacion.fk_id_usuario or claims.get("rol") == 'admin': 
            return notificacion.to_json(), 201
        
        else:
            return {
            'message': 'ERROR',
        }, 200


    # DELETE: Eliminar una notificacion. Rol: ADMIN   
    @jwt_required(optional=False)
    @role_required(roles = ["admin"])
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
    @jwt_required(optional=False)
    @role_required(roles = ["admin"])
    def put(self, id):
        notificacion = db.session.query(Notificacion_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(notificacion, key, value)
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201
