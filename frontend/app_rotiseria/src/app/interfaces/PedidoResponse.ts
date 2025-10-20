interface PedidoResponse {
    id: number;
    id_usuario: number;
    estado: string;
    fecha: string;
    productos: any[];
    total: number;
}