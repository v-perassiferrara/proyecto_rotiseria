from .. import db
from datetime import datetime

class Pedidos(db.Model): 
    __tablename__ = 'pedidos'
    
    id = db.Column(db.Integer, primary_key=True)
    
    total = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(50), nullable=False, default='pendiente')
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.now)


    # Clave foránea a la tabla usuarios
    fk_id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)


    # Relación con tabla usuarios (pedidos >─ usuario)
    usuarios = db.relationship('Usuarios', back_populates='pedidos', uselist=False, single_parent=True)

    # Relacion uno a muchos con pedidos_productos (intermedia para pedidos >─< productos)
    pedidos_productos = db.relationship('Pedidos_Productos', back_populates='pedido', cascade='all, delete-orphan')





    def to_json(self):
        pedido_json = {
            'id': self.id,
            'id_usuario': self.fk_id_usuario,
            'total': self.total,
            'estado': self.estado,
            'fecha': self.fecha.strftime("%d-%m-%Y %H:%M:%S")
        }
        return pedido_json
   
    
    
    def to_json_completo(self):
        
        productos_en_pedido = []
        for item in self.pedidos_productos:
            productos_en_pedido.append({
                'id': item.producto.id,
                'nombre': item.producto.nombre,
                'precio': item.producto.precio,
                'cantidad': item.cantidad,
                'imagenUrl': item.producto.imagenUrl
            })
            
        pedido_json = {
            'id': self.id,
            'id_usuario': self.fk_id_usuario,
            'total': self.total,
            'estado': self.estado,
            'fecha': self.fecha.strftime("%d-%m-%Y %H:%M:%S"),
            'productos': productos_en_pedido
        }
        return pedido_json

    @staticmethod
    def from_json(pedido_json):
        id = pedido_json.get("id")
        fk_id_usuario = pedido_json.get('fk_id_usuario')
        total = pedido_json.get('total')
        estado = pedido_json.get('estado')
        fecha = pedido_json.get('fecha')
        
        
        return Pedidos(
            id=id,
            fk_id_usuario=fk_id_usuario,
            total=total,
            estado=estado,
            fecha=fecha
        )

        