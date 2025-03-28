from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api

import main.resources as resources

# Inicializar restful
api = Api()

def create_app():
    
    # Inicializar flask
    app = Flask(__name__)

    # Cargar variables de entorno
    load_dotenv()


    # Cargar los recursos
    api.add_resource(resources.NotificacionesResource, "/notificaciones")

    api.add_resource(resources.PedidosResource, "/pedidos")
    api.add_resource(resources.PedidoResource, "/pedido/<int:id>")

    api.add_resource(resources.ProductosResource, "/productos")
    api.add_resource(resources.ProductoResource, "/producto/<int:id>")

    api.add_resource(resources.UsuariosResource, "/usuarios")
    api.add_resource(resources.UsuarioResource, "/usuario/<int:id>")

    api.add_resource(resources.ValoracionesResource, "/valoraciones")

    api.init_app(app)

    return app