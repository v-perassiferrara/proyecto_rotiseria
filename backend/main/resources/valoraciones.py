from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import Valoracion_db
from main.models import Producto_db
from main.models import Usuario_db

class Valoraciones(Resource):
    def get(self):
        valoraciones = db.session.query(Valoracion_db).all()
        return jsonify([v.to_json() for v in valoraciones])

    # GET: obtener una lista de valoraciones
    def get(self):
        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 10
        
        #no ejecuto el .all()
        valoraciones = db.session.query(Valoracion_db)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))


        # ---FILTROS PARA VALORACIONES---

        # Filtrar por usuario (búsqueda parcial)
        if request.args.get('email'):
            valoraciones = valoraciones.join(Usuario_db, Valoracion_db.id_usuario== Usuario_db.id).filter(
                Usuario_db.email == request.args.get('email')
                )
            if request.args.get('sortby_usuario_email'):
                valoraciones = valoraciones.order_by(Usuario_db.nombre.desc() if request.args.get('sortby_usuario_email') == 'desc' else Usuario_db.nombre.asc())


        # Filtrar por nombre de producto (búsqueda parcial)
        if request.args.get('producto'):
            valoraciones = valoraciones.join(Producto_db, Valoracion_db.id_producto == Producto_db.id).filter(
                Producto_db.nombre.ilike(f"%{request.args.get('producto')}%")
            )
            if request.args.get('sortby_producto_nombre'):
                valoraciones = valoraciones.order_by(Producto_db.nombre.desc() if request.args.get('sortby_producto_nombre') == 'desc' else Producto_db.nombre.asc())


        # Filtrar por estrellas
        if request.args.get('estrellas'):
            valoraciones = valoraciones.filter(Valoracion_db.estrellas == int(request.args.get('estrellas')))
    

        # Ordenar por email
        if request.args.get('sortby_email'):
            valoraciones = valoraciones.join(Usuario_db, Valoracion_db.id_usuario == Usuario_db.id, isouter=True).order_by(
                Usuario_db.email.desc() if request.args.get('sortby_email') == 'desc' else Usuario_db.email.asc()
            )

        # Ordenar por nombre de producto
        if request.args.get('sortby_producto'):
            valoraciones = valoraciones.join(Producto_db, Valoracion_db.id_producto == Producto_db.id, isouter=True).order_by(
                Producto_db.nombre.desc() if request.args.get('sortby_producto') == 'desc' else Producto_db.nombre.asc()
            )
            



        #Obtener valor paginado
        valoraciones = valoraciones.paginate(page=page, per_page=per_page, error_out=False)
    
        return jsonify({'valoraciones': [valoracion.to_json() for valoracion in valoraciones],
                  'total': valoraciones.total,
                  'pages': valoraciones.pages,
                  'page': page
                })

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
