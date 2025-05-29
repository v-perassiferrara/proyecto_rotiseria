from .. import db

class Valoraciones(db.Model):
    __tablename__ = 'valoraciones'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'))
    estrellas = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(500))

    usuario = db.relationship('Usuarios', back_populates='valoraciones')
    producto = db.relationship('Productos', back_populates='valoraciones')

    def to_json(self):
        return {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_producto': self.id_producto,
            'estrellas': self.estrellas,
            'comentario': self.comentario
        }

    @staticmethod
    def from_json(valoracion_json):
        id_usuario = valoracion_json.get('id_usuario')
        id_producto = valoracion_json.get('id_producto')
        estrellas = valoracion_json.get('estrellas')
        comentario = valoracion_json.get('comentario')
        return Valoraciones(
            id_usuario = id_usuario,
            id_producto = id_producto,
            estrellas = estrellas,
            comentario = comentario
        )
