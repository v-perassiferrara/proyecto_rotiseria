
# PREGUNTAR AL PROFESOR


# from .. import db

# class Notificaciones(db.Model):
#     __tablename__ = 'notificaciones'
#     id = db.Column(db.Integer, primary_key=True)
#     fk_id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
#     mensaje = db.Column(db.String(500), nullable=False)
#     leida = db.Column(db.Boolean, default=False)
#     fecha = db.Column(db.DateTime, nullable=False)

#     #Relacion uno a muchos con la tabla pedidos
#     usuarios = db.relationship('Usuarios', back_populates='notificaciones', cascade='all, delete-orphan') 
    

#     def to_json(self):
#         notificacion_json = {
#             'id': self.id,
#             'fk_id_usuario': self.fk_id_usuario,
#             'mensaje': self.mensaje,
#             'leida': self.leida,
#             'fecha': self.fecha
#         }
#         return notificacion_json


#     def from_json(notificacion_json):
#         id = notificacion_json.get("id")
#         fk_id_usuario = notificacion_json.get('fk_id_usuario')
#         mensaje = notificacion_json.get('mensaje')
#         leida = notificacion_json.get('leida')
#         fecha = notificacion_json.get('fecha')
#         return Notificaciones(
#             id=id,
#             fk_id_usuario=fk_id_usuario,
#             mensaje=mensaje,
#             leida=leida,
#             fecha=fecha
#         )