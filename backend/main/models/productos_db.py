from .. import db

class producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)

    def to_json(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'cantidad': self.cantidad
        }
        return producto_json