from .. import db

class Notificaciones(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mensaje = db.Column(db.String(500), nullable=False)
    leida = db.Column(db.Boolean, default=False)
    fecha = db.Column(db.DateTime, nullable=False)

    def to_json(self):
        notificacion_json = {
            'id': self.id,
            'mensaje': self.mensaje,
            'leida': self.leida,
            'fecha': self.fecha
        }
        return notificacion_json