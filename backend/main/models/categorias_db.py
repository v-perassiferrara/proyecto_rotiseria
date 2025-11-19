from .. import db

class Categorias(db.Model):
    __tablename__ = 'categorias'
    
    id = db.Column(db.Integer, primary_key=True)
    
    nombre = db.Column(db.String(50), nullable=False)
    imagenUrl = db.Column(db.String(512), nullable=False)
    visible = db.Column(db.Boolean, nullable=False, default=True)



    # Relación uno a muchos con la tabla productos (productos de una categoria)
    productos = db.relationship('Productos', back_populates='categoria', cascade='all, delete-orphan')



    def to_json(self):
        categoria_json = {
            'id': self.id,
            'nombre': self.nombre,
            'imagenUrl': self.imagenUrl,
            'visible' : self.visible
        }
        return categoria_json

    def to_json_complete(self):
        categoria_json = {
            'id': self.id,
            'nombre': self.nombre,
            'imagenUrl': self.imagenUrl,
            'productos': [producto.to_json() for producto in self.productos],
            'visible' : self.visible
        }
        return categoria_json

    @staticmethod
    def from_json(categoria_json):
        id = categoria_json.get("id")
        nombre = categoria_json.get('nombre')
        imagenUrl = categoria_json.get('imagenUrl')
        visible = categoria_json.get('visible')
        return Categorias(
            id=id,
            nombre=nombre,
            imagenUrl=imagenUrl,
            visible=visible
        )
        
        