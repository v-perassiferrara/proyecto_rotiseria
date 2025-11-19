from datetime import datetime
from .. import db

class Promociones(db.Model):
    __tablename__ = 'promociones'
    
    id = db.Column(db.Integer, primary_key=True)
    
    nombre = db.Column(db.String(50), nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False, default=datetime.now)
    fecha_fin = db.Column(db.DateTime, nullable=False)
    descripcion = db.Column(db.String(500), nullable=False)
    imagenUrl = db.Column(db.String(512), nullable=True)



    def to_json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'fecha_inicio': self.fecha_inicio.strftime("%d-%m-%Y %H:%M:%S"),
            'fecha_fin': self.fecha_fin.strftime("%d-%m-%Y %H:%M:%S"),
            'descripcion': self.descripcion,
            'imagenUrl': self.imagenUrl
        }

    @staticmethod
    def from_json(promocion_json):
        id = promocion_json.get('id')
        nombre = promocion_json.get('nombre')
        fecha_inicio_str = promocion_json.get('fecha_inicio')
        fecha_fin_str = promocion_json.get('fecha_fin')
        descripcion = promocion_json.get('descripcion')
        imagenUrl = promocion_json.get('imagenUrl')

        fecha_inicio = None
        if fecha_inicio_str:
            try:
                fecha_inicio = datetime.strptime(fecha_inicio_str, "%d-%m-%Y %H:%M:%S")
            except ValueError:
                fecha_inicio = datetime.strptime(fecha_inicio_str, "%d-%m-%Y")

        fecha_fin = None
        if fecha_fin_str:
            try:
                fecha_fin = datetime.strptime(fecha_fin_str, "%d-%m-%Y %H:%M:%S")
            except ValueError:
                fecha_fin = datetime.strptime(fecha_fin_str, "%d-%m-%Y")

        return Promociones(
            id=id,
            nombre=nombre,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            descripcion=descripcion,
            imagenUrl=imagenUrl
        )
