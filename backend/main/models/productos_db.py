from .. import db

class Productos(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    visible = db.Column(db.Boolean, nullable=False, default=True)


    # Relación con intermedia pedidos_productos (muchos productos con muchos pedidos)
    pedidos_productos = db.relationship('Pedidos_Productos', back_populates='producto', cascade='all, delete-orphan')



    #Relacion con intermedia valoraciones (muchos usuarios con muchos productos) 
    valoraciones = db.relationship('Valoraciones', back_populates='producto', cascade="all, delete-orphan")



    def to_json(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio
        }
        return producto_json

    def to_json_complete(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'visible' : self.visible
        }
        return producto_json

    @staticmethod
    def from_json(producto_json):
        id = producto_json.get("id")
        nombre = producto_json.get('nombre')
        precio = producto_json.get('precio')
        visible = producto_json.get('visible')
        return Productos(
            id=id,
            nombre=nombre,
            precio=precio,
            visible=visible
        )
        
        
        