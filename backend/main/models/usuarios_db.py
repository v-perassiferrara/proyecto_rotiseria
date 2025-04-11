from .. import db

class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.Integer, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    contrasena = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    # Relacion con el resto de tablas
    pedidos = db.relationship('Pedidos', back_populates='usuario', cascade='all, delete-orphan')
    valoraciones = db.relationship('Valoraciones', back_populates='usuario', cascade='all, delete-orphan')
    notificaciones = db.relationship('Notificaciones', back_populates='usuario', cascade='all, delete-orphan')


    #Relacion uno a muchos con la tabla pedidos
    pedidos = db.relationship('Pedidos', back_populates='usuarios', cascade='all, delete-orphan') 
    
    #Relacion uno a muchos con la tabla valoracion
    valoraciones = db.relationship('Valoraciones', back_populates='usuarios', cascade='all, delete-orphan') 


    '''
    Relacion uno a muchos con la tabla Notificaciones, comentada para que no se rompa
    notificaciones = db.relationship('Notificaciones', back_populates='usuarios', cascade='all, delete-orphan') 
    '''



    def to_json(self):
        usuario_json = {
            'id': self.id,
            'contrasena': self.contrasena,
            'dni': self.dni,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'telefono': self.telefono
        }
        return usuario_json
    
    def from_json(usuario_json):
        id = usuario_json.get("id")
        dni = usuario_json.get('dni')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        email = usuario_json.get('email')
        contrasena = usuario_json.get('contrasena')
        telefono = usuario_json.get('telefono')
        return Usuarios(
            id=id,
            dni=dni,
            nombre=nombre,
            apellido=apellido,
            email=email,
            contrasena=contrasena,
            telefono=telefono    
        )