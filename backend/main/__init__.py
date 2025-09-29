from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import os
from flask_cors import CORS

#importar sqlalchemy
from flask_sqlalchemy import SQLAlchemy

#Importar Flask JWT
from flask_jwt_extended import JWTManager

# Importar Flask Mail
from flask_mail import Mail

# Inicializar restful
api = Api()

# Inicializar la base de datos
db = SQLAlchemy()

#Inicializar JWT
jwt = JWTManager()

# Inicializar mail
mailsender = Mail()

def create_app():
    
    # Inicializar flask
    app = Flask(__name__)

    # Cargar variables de entorno
    load_dotenv()
    
    CORS(app)   # Permite CORS para todos los origenes y rutas

    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    # Cargar los recursos
    import main.resources as resources
    api.add_resource(resources.NotificacionesResource, "/notificaciones")
    api.add_resource(resources.NotificacionResource, "/notificacion/<int:id>")

    api.add_resource(resources.PedidosResource, "/pedidos")
    api.add_resource(resources.PedidoResource, "/pedido/<int:id>")

    api.add_resource(resources.ProductosResource, "/productos")
    api.add_resource(resources.ProductoResource, "/producto/<int:id>")

    api.add_resource(resources.Pedidos_ProductosResource, "/pedidos_productos")
    api.add_resource(resources.Pedido_ProductoResource, "/pedido_producto/<int:id>")

    api.add_resource(resources.UsuariosResource, "/usuarios")
    api.add_resource(resources.UsuarioResource, "/usuario/<int:id>")

    api.add_resource(resources.ValoracionesResource, "/valoraciones")
    api.add_resource(resources.ValoracionResource, "/valoracion/<int:id>")
    
    
 #Cargar la aplicacion en la API de Flask Restful
    #es para que la aplicacion de flask funcione como API
    api.init_app(app)
    
    #Cargar clave secreta
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config["JWT_BLACKLIST_ENABLED"] = True
    app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"] # Aplica la lista negra a tokens de acceso y refresco
    
    
    #Cargar tiempo de expiración de los tokens
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    from main.auth import routes
    #Importar blueprint
    app.register_blueprint(routes.auth)
    
    #Configuración de mail
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')

      #Inicializar en app
    mailsender.init_app(app)
    
    #Por ultimo retornamos la aplicacion iniializada
    return app
