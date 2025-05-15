from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import os 

#importar sqlalchemy
from flask_sqlalchemy import SQLAlchemy

#Importar Flask JWT
from flask_jwt_extended import JWTManager

# Inicializar restful
api = Api()

# Inicializar la base de datos
db = SQLAlchemy()

#Inicializar JWT
jwt = JWTManager()

def create_app():
    
    # Inicializar flask
    app = Flask(__name__)

    # Cargar variables de entorno
    load_dotenv()

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
    # Algoritmo de Hash
    app.config["JWT_ALGORITHM"] = os.getenv('JWT_ALGORITHM')
    #Cargar tiempo de expiración de los tokens
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    from main.auth import routes
    #Importar blueprint
    app.register_blueprint(routes.auth)
    
    #Por ultimo retornamos la aplicacion iniializada
    return app