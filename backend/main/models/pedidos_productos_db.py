from .. import db

class Pedidos_Productos(db.Model):
    __tablename__ = 'pedidos_productos'
    
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id', ondelete='CASCADE'), primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id', ondelete='CASCADE'), primary_key=True)
    cantidad = db.Column(db.Integer, nullable=False, default = 1)

    pedido = db.relationship('Pedidos', back_populates='pedidos_productos')
    
    producto = db.relationship('Productos', back_populates='pedidos_productos')

    def to_json(self):
        return {
            'id_pedido': self.id_pedido,
            'id_producto': self.id_producto,
            'cantidad': self.cantidad
        }
