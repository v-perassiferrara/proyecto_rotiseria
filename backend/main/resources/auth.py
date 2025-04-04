from flask_restful import Resource
from flask import request
from usuario import USUARIOS



class Login(Resource):
    
    def post(self):
        # Obtener los datos del JSON enviado en la solicitud
        data = request.get_json()

        # Validar que el JSON contenga los campos necesarios
        if not data or 'email' not in data or 'contrasena' not in data:
            return {"mensaje": "Faltan campos obligatorios: email y/o contraseña"}, 400

        email = data['email']
        contrasena = data['contrasena']

        # Buscar el usuario por emailif usuario:, recibe un diccionario
        usuario = next((u for u in USUARIOS.values() if u['email'] == email), None)

        if usuario:
            # Verificar la contraseña y el usuario
            if usuario['contrasena'] == contrasena:
                return "Login correcto", 200
            
                # Falta tener lo de los tokens
            
            else:
                return "Contraseña incorrecta", 401
        else:
            return "El usuario indicado no existe", 404

class Logout(Resource):
    # Falta tener lo de los tokens
    
    def post(self):
        return "Sesion cerrada correctamente!", 200