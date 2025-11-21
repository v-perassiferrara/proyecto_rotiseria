from .. import jwt, db
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps
from main.models import Usuario_db



# Define que atributos se guardarán dentro del token
@jwt.additional_claims_loader
def add_claims_to_access_token(usuario_id):
    
    # Buscar el usuario en la base de datos usando el ID
    # Esto es crucial para obtener los atributos del objeto Usuario_db
    usuario = db.session.query(Usuario_db).get(usuario_id)
    
    if not usuario:
        # Si el usuario no se encuentra (por ejemplo, si fue eliminado),
        # se devuelven claims vacíos.
        return {}
    
    claims = {
        'rol': usuario.rol,
        'id': usuario.id,
        'email': usuario.email
    }
    return claims



# Define el atributo que se utilizará para identificar el usuario
@jwt.user_identity_loader
def user_identity_lookup(usuario_id):
    # Definir ID como atributo identificatorio
    return usuario_id






# Decorador para restringir el acceso a usuarios por rol
def role_required(roles):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            # Verificar que el JWT es correcto
            verify_jwt_in_request()
            
            # Obtener claims del JWT
            claims = get_jwt()
            
            # Verificar que el rol sea uno de los permitidos por la ruta
            if claims['rol'] in roles :
                # Ejecutar función
                return fn(*args, **kwargs)
            
            else:
                return 'Rol sin permisos de acceso al recurso', 403
        
        return wrapper
    return decorator



# Decorador para restringir el acceso a usuarios por estado
def activity_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        
        # Verificar que el JWT es correcto
        verify_jwt_in_request()
        
        # Obtener claims del JWT
        claims = get_jwt()
        
        # Obtener el id del usuario del token
        usuario_id = claims['id']
        
        # Consultar la base de datos para obtener el usuario completo
        usuario = db.session.query(Usuario_db).get(usuario_id)
        
        # Verificar que el estado del usuario sea 'activo'
        if usuario and usuario.estado == 'activo':
            # Ejecutar función
            return fn(*args, **kwargs)
        
        else:
            # Devolver error si el usuario no está activo
            return 'El usuario no se encuentra activo para realizar esta acción', 403
        
    return wrapper