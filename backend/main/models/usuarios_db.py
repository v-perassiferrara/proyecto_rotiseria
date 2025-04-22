from .. import db

class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    contrasena = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
<<<<<<< Updated upstream
=======
    estado = db.Column(db.String(20), nullable=False, default='pendiente')
    
    # Relacion con el resto de tablas
    #Relacion muchos a muchos con la tabla valoracion
    productos = db.relationship('Productos', secondary='valoraciones', back_populates='usuarios')

    #Relacion uno a muchos con la tabla pedidos
    pedidos = db.relationship('Pedidos', back_populates='usuarios', cascade='all, delete-orphan') 


    '''
    Relacion uno a muchos con la tabla Notificaciones, comentada para que no se rompa
    notificaciones = db.relationship('Notificaciones', back_populates='usuarios', cascade='all, delete-orphan') 
    '''


>>>>>>> Stashed changes

    def to_json(self):
        usuario_json = {
            'dni': self.dni,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'telefono': self.telefono,
            'estado': self.estado
        }
<<<<<<< Updated upstream
        return usuario_json
=======
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
>>>>>>> Stashed changes
