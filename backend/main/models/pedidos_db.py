from .. import db

class Pedidos(db.Model): 
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.dni'), nullable=False)
    total = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    
    usuario = db.relationship('Usuarios', back_populates='pedidos', backref='pedidos')
    def to_json(self):
        pedido_json = {
            'id': self.id,
            'dni': self.dni,
            'fecha': self.fecha,
            'total': self.total,
            'estado': self.estado
        }
        return pedido_json