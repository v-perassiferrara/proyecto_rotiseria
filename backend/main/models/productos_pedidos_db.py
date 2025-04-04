from .. import db

class Productos_pedidos(db.Model):
    __tablename__ = 'productos_pedidos'
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), primary_key=True) # Clave primaria compuesta
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id'), primary_key=True) # Clave primaria compuesta
    cantidad = db.Column(db.Integer, nullable=False)

    def to_json(self):
        productos_pedidos_json = {
            'id_producto': self.id_producto,
            'id_pedido': self.id_pedido,
            'cantidad': self.cantidad
        }
        return productos_pedidos_json