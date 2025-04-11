from .. import db

class Pedidos(db.Model): 
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    fk_id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False) # Relacion con usuarios
    total = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)


    #Relacion con la tabla pedidos_productos (relacion muchos pedidos con muchos productos)
    productos = db.relationship('Productos', secondary ='Pedidos_Productos', back_populates='pedidos')

    #Conexion con la tabla usuarios (relacion un usuario a muchos pedidos)
    usuarios = db.relationship('Usuarios', back_populates='pedidos', uselist=False, single_parent=True)


    def to_json(self):
        pedido_json = {
            'id': self.id,
            'id_usuario': self.fk_id_usuario,
            'total': self.total,
            'estado': self.estado,
            'fecha': self.fecha
        }
        return pedido_json

    def from_json(pedido_json):
        id = pedido_json.get("id")
        fk_id_usuario = pedido_json.get('id_usuario')
        total = pedido_json.get('total')
        estado = pedido_json.get('estado')
        fecha = pedido_json.get('fecha')
        return Pedidos(
            id=id,
            fk_id_usuario=fk_id_usuario,
            total=total,
            estado=estado,
            fecha=fecha
        )


Pedidos_Productos = db.Table( 
    'pedidos_productos',
    db.Column('id_producto', db.Integer, db.ForeignKey('productos.id')),
    db.Column('id_pedido', db.Integer, db.ForeignKey('pedidos.id')),
    db.Column('cantidad', db.Integer, nullable=False) 
)


#def to_json(self):
#        productos_pedidos_json = {
#            'id_producto': self.id_producto,
#            'id_pedido': self.id_pedido,
#            'cantidad': self.cantidad
#        }
#        return productos_pedidos_json