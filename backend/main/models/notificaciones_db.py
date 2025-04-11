from .. import db

class Notificaciones(db.Model):
    __tablename__ = 'notificaciones'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.dni'), nullable=False)
    # Relación con la tabla Usuarios
    usuario = db.relationship('Usuarios', back_populates= 'Notificaciones',backref='notificaciones')
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