from .. import db

class Pedidos_Productos(db.Model):
    __tablename__ = 'pedidos_productos'
    id = db.Column(db.Integer, primary_key=True)
    fk_id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id', ondelete='CASCADE'))
    fk_id_producto = db.Column(db.Integer, db.ForeignKey('productos.id', ondelete='CASCADE'))
    cantidad = db.Column(db.Integer, nullable=False, default = 1)

    pedido = db.relationship('Pedidos', back_populates='pedidos_productos')
    
    producto = db.relationship('Productos', back_populates='pedidos_productos')

    def to_json(self):
        return {
            'id' : self.id,
            'fk_id_pedido': self.fk_id_pedido,
            'fk_id_producto': self.fk_id_producto,
            'cantidad': self.cantidad
        }

    @staticmethod
    def from_json(data):
        return Pedidos_Productos(
            fk_id_pedido=data.get('fk_id_pedido'),
            fk_id_producto=data.get('fk_id_producto'),
            cantidad=data.get('cantidad', 1)
        )