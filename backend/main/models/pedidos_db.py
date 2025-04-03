from .. import db
from datetime import datetime

class Pedido(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    total = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    
    def to_json(self):
        pedido_json = {
            'id': self.id,
            'dni': self.dni,
            'fecha': self.fecha,
            'total': self.total,
            'estado': self.estado
        }
        return pedido_json