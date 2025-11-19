from .. import db
from datetime import datetime


class Notificaciones(db.Model):
    __tablename__ = "notificaciones"
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Clave foránea a la tabla usuarios
    fk_id_usuario = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)
    
    mensaje = db.Column(db.String(500), nullable=False)
    leida = db.Column(db.Boolean, default=False)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.now)


    # Relacion uno a muchos con la tabla usuarios
    usuarios = db.relationship(
        "Usuarios",
        back_populates="notificaciones",
        cascade="all, delete-orphan",
        single_parent=True,
    )

    def to_json(self):
        notificacion_json = {
            "id": self.id,
            "fk_id_usuario": self.fk_id_usuario,
            "mensaje": self.mensaje,
            "leida": self.leida,
            "fecha": self.fecha.strftime("%d-%m-%Y %H:%M:%S"),
        }
        return notificacion_json

    @staticmethod
    def from_json(notificacion_json):
        fk_id_usuario = notificacion_json.get("fk_id_usuario")
        mensaje = notificacion_json.get("mensaje")
        return Notificaciones(fk_id_usuario=fk_id_usuario, mensaje=mensaje)
