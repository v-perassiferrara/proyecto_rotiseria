from .. import db

class Productos(db.Model):
    __tablename__ = 'productos'
    
    id = db.Column(db.Integer, primary_key=True)
    
    nombre = db.Column(db.String(50), nullable=False)
    imagenUrl = db.Column(db.String(512), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    visible = db.Column(db.Boolean, nullable=False, default=True)
    
    # Clave foránea a la tabla categorias
    fk_id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id'))



    #Relacion uno a muchos con la tabla categoria (productos >─ categoria)
    categoria = db.relationship('Categorias', back_populates='productos')

    # Relacion uno a muchos con pedidos_productos (intermedia para productos >─< pedidos)
    pedidos_productos = db.relationship('Pedidos_Productos', back_populates='producto', cascade='all, delete-orphan')

    # Relacion uno a muchos con valoraciones (intermedia para productos >─< usuarios)
    valoraciones = db.relationship('Valoraciones', back_populates='producto', cascade="all, delete-orphan")



    def to_json(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'categoria': self.fk_id_categoria,
            'imagenUrl': self.imagenUrl,
            'precio': self.precio
        }
        return producto_json

    def to_json_complete(self):
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'categoria': self.fk_id_categoria,
            'imagenUrl': self.imagenUrl,
            'precio': self.precio,
            'visible' : self.visible
        }
        return producto_json

    @staticmethod
    def from_json(producto_json):
        id = producto_json.get("id")
        nombre = producto_json.get('nombre')
        precio = producto_json.get('precio')
        categoria = producto_json.get('fk_id_categoria')
        visible = producto_json.get('visible')
        return Productos(
            id=id,
            nombre=nombre,
            categoria=categoria,
            precio=precio,
            visible=visible
        )