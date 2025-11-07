from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required, activity_required
from .. import db
from main.models import Pedido_db
from main.models import Usuario_db
from main.models import Producto_db
from main.models import Pedidos_Productos_db
from main.mail.functions import sendMail


class Pedidos(Resource):
    # GET: obtener una lista de Pedidos
    @jwt_required(optional=True)
    def get(self):
        page = 1  # Página inicial por defecto
        per_page = 10  # Cantidad de elementos por página por defecto

        claims = get_jwt()

        if claims.get("rol") in ["admin", "empleado"]:
            # Al admin y al empleado les devuelve todos los pedidos
            pedidos = db.session.query(Pedido_db)
        else:
            # A los demás (clientes) les devuelve solo sus pedidos
            current_identity = int(get_jwt_identity())
            pedidos = db.session.query(Pedido_db).filter(
                Pedido_db.fk_id_usuario == current_identity
            )

        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))

        # ---FILTROS PARA PEDIDOS---

        # Filtrar por email de usuario (búsqueda parcial)
        if request.args.get("email"):
            pedidos = pedidos.join(
                Usuario_db, Pedido_db.fk_id_usuario == Usuario_db.id
            ).filter(Usuario_db.email.ilike(f"%{request.args.get('email')}%"))
        
        if request.args.get("numeroPedido"):
            pedidos = pedidos.filter(Pedido_db.id == int(request.args.get("numeroPedido")))

        # Filtrar por nombre de producto (búsqueda parcial)
        if request.args.get("producto"):
            pedidos = (
                pedidos.join(
                    Pedidos_Productos_db,
                    Pedido_db.id == Pedidos_Productos_db.fk_id_pedido,
                )
                .join(
                    Producto_db, Pedidos_Productos_db.fk_id_producto == Producto_db.id
                )
                .filter(Producto_db.nombre.ilike(f"%{request.args.get('producto')}%"))
            )


        # Filtrar por estado de pedido
        if request.args.get("estado"):
            pedidos = pedidos.filter(Pedido_db.estado == request.args.get("estado"))
            if request.args.get("sortby_pedido_estado"):
                pedidos = pedidos.order_by(
                    Pedido_db.estado.desc()
                    if request.args.get("sortby-estado") == "desc"
                    else Pedido_db.estado.asc()
                )

        # Ordenar por fecha
        if request.args.get("sortby-fecha"):
            pedidos = pedidos.order_by(
                Pedido_db.fecha.desc()
                if request.args.get("sortby-fecha") == "desc"
                else Pedido_db.fecha.asc()
            )

        # Ordenar por estado
        if request.args.get("sortby-estado"):
            pedidos = pedidos.order_by(
                Pedido_db.estado.desc()
                if request.args.get("sortby-estado") == "desc"
                else Pedido_db.estado.asc()
            )

        # Traer solo los estados y contar cuantos hay
        
        if request.args.get("countEstado"):
            # Contamos los pedidos por estado
            count_by_estado = db.session.query(Pedido_db.estado, db.func.count(Pedido_db.id))
            count_by_estado = count_by_estado.group_by(Pedido_db.estado).all()
            count_by_estado = dict(count_by_estado)
            
            return jsonify(count_by_estado)

        # Obtener valor paginado
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify(
            {
                "pedidos": [pedido.to_json() for pedido in pedidos.items],
                "total": pedidos.total,
                "pages": pedidos.pages,
                "page": page,
            }
        )

    # POST: Crear un pedido
    @jwt_required(optional=False)
    @activity_required
    def post(self):
        pedido = Pedido_db.from_json(request.get_json())
        db.session.add(pedido)
        db.session.commit()
        # Obtener el usuario para enviar el correo
        usuario = db.session.query(Usuario_db).get(pedido.fk_id_usuario)
        if usuario:
            sendMail([usuario.email],"Confirmación de tu pedido",'new_order', pedido = pedido, usuario = usuario)
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
    @role_required(roles=["admin", "empleado"])
    @activity_required
    def delete(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        setattr(pedido, "estado", "cancelado")
        db.session.add(pedido)
        db.session.commit()
        usuario = db.session.query(Usuario_db).get(pedido.fk_id_usuario)
        if usuario:
            sendMail([usuario.email],f"Tu pedido ha sido cancelado",'order_status_change', pedido = pedido, usuario = usuario)
        return {
            "message": "Pedido cancelado con éxito",
            "pedido": pedido.to_json(),
        }, 200  # con 204 flask no devuelve el mensaje

    # PUT: Editar un pedido. Rol: ADMIN
    @jwt_required(optional=True)
    @role_required(roles=["admin", "empleado"])
    @activity_required
    def put(self, id):
        pedido = db.session.query(Pedido_db).get_or_404(id)
        original_estado = pedido.estado # Guardar el estado original
        data = request.get_json().items()
        for key, value in data:
            setattr(pedido, key, value)
        db.session.add(pedido)
        db.session.commit()
        # Si el estado ha cambiado, enviar un correo electrónico
        if original_estado != pedido.estado:
            usuario = db.session.query(Usuario_db).get(pedido.fk_id_usuario)
            if usuario:
                sendMail([usuario.email],f"Cambio en el estado de tu pedido: {pedido.estado}",'order_status_change', pedido = pedido, usuario = usuario)
        return pedido.to_json(), 201
