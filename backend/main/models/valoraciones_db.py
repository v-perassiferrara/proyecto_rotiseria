from .. import db

class Valoracion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    estrellas = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(500), nullable=True)

    def to_json(self):
        valoracion_json = {
            'id': self.id,
            'estrellas': self.estrellas,
            'comentario': self.comentario
        }
        return valoracion_json