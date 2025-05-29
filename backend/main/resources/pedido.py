from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required
from .. import db
from main.models import Pedido_db
from main.models import Usuario_db
from main.models import Producto_db
from main.models import Pedidos_Productos_db


class Pedidos(Resource):

    # GET: obtener una lista de Pedidos Rol: ADMIN  
    @jwt_required(optional=True)
    @role_required(roles = ["admin"])
    def get(self):
        page = 1 #Página inicial por defecto
        per_page = 10  #Cantidad de elementos por página por defecto
        
        #no ejecuto el .all()
        pedidos = db.session.query(Pedido_db)
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        
        # ---FILTROS PARA PEDIDOS---

        # Filtrar por email de usuario (búsqueda parcial)
        if request.args.get('email'):
            pedidos = pedidos.join(Usuario_db, Pedido_db.fk_id_usuario == Usuario_db.id).filter(
                Usuario_db.email.ilike(f"%{request.args.get('email')}%")
            )

        # Filtrar por nombre de producto (búsqueda parcial)
        if request.args.get('producto'):
            pedidos = pedidos.join(Pedidos_Productos_db, Pedido_db.id == Pedidos_Productos_db.fk_id_pedido).join(
            Producto_db, Pedidos_Productos_db.fk_id_producto == Producto_db.id).filter(
            Producto_db.nombre.ilike(f"%{request.args.get('producto')}%")
            )
        
        # Filtrar por estado de pedido
        if request.args.get('estado'):
            pedidos = pedidos.filter(Pedido_db.estado == request.args.get('estado'))
            if request.args.get('sortby_pedido_estado'):
                pedidos = pedidos.order_by(Pedido_db.estado.desc() if request.args.get('sortby_estado') == 'desc' else Pedido_db.estado.asc())

        
        # Filtrar por rango de fechas
        if request.args.get('fecha_inicio') and request.args.get('fecha_fin'):
            fecha_inicio = request.args.get('fecha_inicio')
            fecha_fin = request.args.get('fecha_fin')
            notificaciones = notificaciones.filter(Pedido_db.fecha >= fecha_inicio, Pedido_db.fecha <= fecha_fin)   
            if request.args.get('sortby_pedido_fecha'):
                notificaciones = notificaciones.order_by(Pedido_db.fecha.desc() if request.args.get('sortby_pedido_fecha') == 'desc' else Pedido_db.fecha.asc())

        
        # Ordenar por fecha
        if request.args.get('sortby_fecha'):
            pedidos = pedidos.order_by(Pedido_db.fecha.desc() if request.args.get('sortby_fecha') == 'desc' else Pedido_db.fecha.asc())

        # Ordenar por estado
        if request.args.get('sortby_estado'):
            pedidos = pedidos.order_by(Pedido_db.estado.desc() if request.args.get('sortby_estado') == 'desc' else Pedido_db.estado.asc())

        
        
        #Obtener valor paginado
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=False)
    
        return jsonify({'pedidos': [pedido.to_json() for pedido in pedidos],
                  'total': pedidos.total,
                  'pages': pedidos.pages,
                  'page': page
                })

    # POST: Crear un pedido
    @jwt_required(optional=False)
    def post(self):
        pedido = Pedido_db.from_json(request.get_json())
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 201 

class Pedido(Resource):
    # GET: Obtener un pedido. Rol: USER/ADMIN/EMPLEADO
    @jwt_required(optional=True)
    def get(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        return jsonify(pedido.to_json_completo())
    

    # DELETE: Eliminar un pedido. Rol: ADMIN/EMPLEADO   
    # Ver permisos por rol. Ej: Cliente debe poder borrar solo sus pedidos. Admin borrar cualquiera. Usar JWT Payload para verificar el rol
    @jwt_required(optional=True)
    @role_required(roles = ["admin", "empleado"])
    def delete(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        setattr(pedido, 'estado', 'cancelado') 
        db.session.add(pedido)
        db.session.commit()
        return {
            'message': 'Pedido cancelado con éxito',
            'pedido': pedido.to_json()
        }, 200  # con 204 flask no devuelve el mensaje

    # PUT: Editar un pedido. Rol: ADMIN  
    @jwt_required(optional=True)
    @role_required(roles = ["admin"])
    def put(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(pedido, key, value)
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(), 201
