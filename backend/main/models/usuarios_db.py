from .. import db

class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    contrasena = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)

    def to_json(self):
        usuario_json = {
            'dni': self.dni,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'telefono': self.telefono
        }
        return usuario_json