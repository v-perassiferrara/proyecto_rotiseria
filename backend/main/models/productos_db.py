from .. import db

class Productos(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    visible = db.Column(db.Boolean, nullable=False, default=True)

    # Relación con la tabla productos_pedidos (Relacion muchos a muchos) deberia estar ok
    pedidos = db.relationship('Pedidos', secondary ='pedidos_productos', back_populates='productos')
    
    #Relacion con la tabla Valoraciones (relacion muchos usuarios con muchos productos)
    usuarios = db.relationship('Usuarios', secondary ='valoraciones', back_populates='productos') 

    def to_json(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'stock': self.stock,
            'visible' : self.visible
        }
        return producto_json

    def from_json(producto_json):
        id = producto_json.get("id")
        nombre = producto_json.get('nombre')
        precio = producto_json.get('precio')
        stock = producto_json.get('stock')
        return Productos(
            id=id,
            nombre=nombre,
            precio=precio,
            stock=stock
        )



    Valoraciones = db.Table( 
    'valoraciones',
    db.Column('id_usuario', db.Integer, db.ForeignKey('usuarios.id')),
    db.Column('id_producto', db.Integer, db.ForeignKey('productos.id')),
    db.Column('id', db.Integer, primary_key=True),
    db.Column('estrellas', db.Integer, nullable=False), 
    db.Column('comentario', db.String(500), nullable=True) 

)