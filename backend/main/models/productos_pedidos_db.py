from .. import db

class productos_pedidos:
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)

    def to_json(self):
        productos_pedidos_json = {
            'id_producto': self.id_producto,
            'id_pedido': self.id_pedido,
            'cantidad': self.cantidad
        }
        return productos_pedidos_json