from .. import db

# Funciones de hash para la contraseña
from werkzeug.security import generate_password_hash, check_password_hash


class Usuarios(db.Model):
    __tablename__ = "usuarios"
    
    id = db.Column(db.Integer, primary_key=True)
    
    dni = db.Column(db.Integer, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    
    # Email debe ser único
    email = db.Column(db.String(50), nullable=False, unique=True)
    
    contrasena = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    estado = db.Column(db.String(20), nullable=False, default="pendiente")
    rol = db.Column(db.String(20), nullable=False, default="cliente")  # Los roles son: admin/cliente/empleado



    # Relacion con pedidos (usuario ─< pedidos)
    pedidos = db.relationship("Pedidos", back_populates="usuario", cascade="all, delete-orphan")

    # Relacion uno a muchos con valoraciones (intermedia para usuarios >─< productos)
    valoraciones = db.relationship("Valoraciones", back_populates="usuario", cascade="all, delete-orphan")

    # Relacion con notificaciones (usuario ─< notificaciones)
    notificaciones = db.relationship("Notificaciones", back_populates="usuarios", cascade="all, delete-orphan")




    # Getter de la contraseña plana, no permite leerla
    @property
    def contrasena_plana(self):
        raise AttributeError("Contrasena no puede ser leida.")

    # Setter de la contraseña toma un valor en texto plano, calcula el hash y lo guarda en el atributo contrasena
    @contrasena_plana.setter
    def contrasena_plana(self, contrasena):
        self.contrasena = generate_password_hash(contrasena)

    # Método que compara una contraseña en texto plano con el hash guardado en la db
    def validate_pass(self, contrasena):
        return check_password_hash(self.contrasena, contrasena)





    # Datos "públicos"
    def to_json(self):
        usuario_json = {
            "id": self.id,
            "dni": self.dni,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "telefono": self.telefono,
            "estado": self.estado,
            "rol": self.rol,
        }
        return usuario_json



    # Datos completos con pedidos, notificaciones y valoraciones
    def to_json_complete(self):
        pedidos = [pedido.to_json() for pedido in self.pedidos]
        notificaciones = [
            notificacion.to_json() for notificacion in self.notificaciones
        ]
        valoraciones = [valoracion.to_json() for valoracion in self.valoraciones]
        usuario_json = {
            "id": self.id,
            "dni": self.dni,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "contrasena": self.contrasena,
            "telefono": self.telefono,
            "estado": self.estado,
            "rol": self.rol,
            "pedidos": pedidos,
            "notificaciones": notificaciones,
            "valoraciones": valoraciones,
        }
        return usuario_json





    @staticmethod
    def from_json(usuario_json):
        id = usuario_json.get("id")
        dni = usuario_json.get("dni")
        nombre = usuario_json.get("nombre")
        apellido = usuario_json.get("apellido")
        email = usuario_json.get("email")
        contrasena = usuario_json.get("contrasena")
        telefono = usuario_json.get("telefono")
        usuario = Usuarios(
            id=id,
            dni=dni,
            nombre=nombre,
            apellido=apellido,
            email=email,
            telefono=telefono,
        )
        if contrasena:
            usuario.contrasena_plana = contrasena  # Esto sí hashea correctamente
        return usuario