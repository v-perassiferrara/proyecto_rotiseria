from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Notificacion_db

class Notificaciones(Resource):
  
    # GET: obtener una lista de las notificaciones Rol: USER/ADMIN/EMPLEADO  
    def get(self):
        page = 1 #Página inicial por defecto
        per_page = 10  #Cantidad de elementos por página por defecto
        
        #no ejecuto el .all()
        notificaciones = db.session.query(Notificacion_db)
        
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
    
        return jsonify({'notificaciones': [notificacion.to_json() for notificacion in notificaciones],
                  'total': notificaciones.total,
                  'pages': notificaciones.pages,
                  'page': page
                })



    # POST: Crear una notificacion. Rol: ADMIN
    def post(self):
        notificacion = Notificacion_db.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201

class Notificacion(Resource):
    # GET: Obtener una notificacion. Rol: USER/ADMIN/EMPLEADO
    def get(self, id):
        notificacion = db.session.query(Notificacion_db).get_or_404(id)
        return jsonify(notificacion.to_json())

    # DELETE: Eliminar una notificacion. Rol: ADMIN/EMPLEADO   
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
