from flask import request, jsonify, Blueprint
from .. import db
from main.models import Usuario_db
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

#Blueprint para acceder a los métodos de autenticación
auth = Blueprint('auth', __name__, url_prefix='/auth')

#Método de logueo
@auth.route('/login', methods=['POST'])
def login():
    
    #Busca al usuario en la db por mail
    usuario = db.session.query(Usuario_db).filter(Usuario_db.email == request.get_json().get("email")).first()
    
    ## Devuelvo error si no existe el usuario o si la contraseña no coincide
    if (usuario is None) or not (usuario.validate_pass(request.get_json().get("contrasena"))):
        return 'Usuario o contraseña invalida', 401 
    
    #Genera un nuevo token, pasando el objeto usuario como identidad
    access_token = create_access_token(identity=usuario)
    #Devolver valores y token
    data = {
        'id': usuario.id,
        'email': usuario.email,
        'access_token': access_token
    }

    return data, 200

#Método de registro
@auth.route('/register', methods=['POST'])
def register():
    #Obtener usuario
    usuario = Usuario_db.from_json(request.get_json())
    #Verificar si el mail ya existe en la db, scalar() para saber la cantidad de ese email
    exists = db.session.query(Usuario_db).filter(Usuario_db.email == usuario.email).scalar() is not None
    if exists:
        return 'Duplicated mail', 409
    else:
        try:
            #Agregar usuario a DB
            db.session.add(usuario)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return usuario.to_json() , 201