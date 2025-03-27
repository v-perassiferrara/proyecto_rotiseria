from flask_restful import Resource
from flask import request

ANIMALES = {
    1:{"nombre":"Roman" , "raza":"Labrador"},
    2:{"nombre":"Jorge" , "raza":"Caniche"}
}

# Definir el recurso Animal

class Animal(Resource):

    def get(self, id):
        if id in ANIMALES:
            return ANIMALES[id]
        
        return "El id es inexistente", 404


    def delete(self, id):
        if id in ANIMALES:
            del ANIMALES[id]
            return "Eliminado con éxito", 204

        return "El id a eliminar es inexistente", 404


    def put(self, id):
        if id in ANIMALES:
            animal = ANIMALES[id]
            data = request.get_json()
            animal.update(data)
            return "Animal modificado con éxito", 201

        return "El id a modificar es inexistente", 404


# Definir Animales

class Animales(Resource):

    def get(self):
        return ANIMALES


    def post(self):
        animal = request.get_json()
        id = max(ANIMALES.keys())+1
        ANIMALES[id] = animal
        return "Animal creado con éxito", 201
    
    
