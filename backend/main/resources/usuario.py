from flask_restful import Resource
from flask import request, jsonify
from .. import db
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required
from main.models import Usuario_db

class Usuarios(Resource):

# GET: obtener una lista de usuarios Rol: ADMIN/EMPLEADO
    # @role_required(roles = ["admin","empleado"])  
    def get(self):
        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 10
        
        #no ejecuto el .all()
        usuarios = db.session.query(Usuario_db)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))


        # ---FILTROS PARA USUARIOS---

        # Filtrar por nombre (búsqueda parcial)
        if request.args.get('nombre'):
            usuarios = usuarios.filter(Usuario_db.nombre.ilike(f"%{request.args.get('nombre')}%"))

        # Filtrar por email (búsqueda parcial)
        if request.args.get('email'):
            usuarios = usuarios.filter(Usuario_db.email.ilike(f"%{request.args.get('email')}%"))

        # # Filtrar por rol
        # if request.args.get('rol'):
        #     usuarios = usuarios.filter(Usuario_db.rol == request.args.get('rol'))

        # Filtrar por estado
        if request.args.get('estado'):
            usuarios = usuarios.filter(Usuario_db.estado == request.args.get('estado'))

        # Ordenar por nombre
        if request.args.get('sortby_nombre'):
            usuarios = usuarios.order_by(Usuario_db.nombre.desc() if request.args.get('sortby_nombre') == 'desc' else Usuario_db.nombre.asc())

        # Ordenar por email
        if request.args.get('sortby_email'):
            usuarios = usuarios.order_by(Usuario_db.email.desc() if request.args.get('sortby_email') == 'desc' else Usuario_db.email.asc())
 

        #Obtener valor paginado
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=False)
    
        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                  'total': usuarios.total,
                  'pages': usuarios.pages,
                  'page': page
                })
            


# POST: Crear un usuario. Rol: USUARIO/ADMIN/ENCARGADO
    def post(self):
        usuario = Usuario_db.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201




class Usuario(Resource):

# GET: Obtener un usuario. Rol: USUARIO/ADMIN/EMPLEADO
    @jwt_required(optional=True)
    def get(self, id):        
        usuario = db.session.query(Usuario_db).get_or_404(id) 
        current_identity = int(get_jwt_identity())
        if current_identity == usuario.id:
            return usuario.to_json_complete()
        else:
            return usuario.to_json()


# DELETE: Eliminar un usuario (cambiar de estado o suspender). Rol: ADMIN/EMPLEADO

    @jwt_required(optional=True)
    @role_required(roles = ["admin","empleado"]) 
    def delete(self, id):

        usuario = db.session.query(Usuario_db).get_or_404(id)
        setattr(usuario, 'estado', 'bloqueado') 
        db.session.add(usuario)
        db.session.commit()
        return {
            'message': 'Usuario bloqueado con éxito',
            'usuario': usuario.to_json()
        }, 200  # con 204 flask no devuelve el mensaje

# PUT: Editar un usuario. Rol: ADMIN, USUA
    @jwt_required(optional=True)
    def put(self, id):

        usuario = db.session.query(Usuario_db).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201