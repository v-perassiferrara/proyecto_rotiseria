import { Routes } from '@angular/router';

export const routes: Routes = [
    
    // Genericos
    {path:'start',     loadComponent: () => import('./pages/genericos/start/start').then(m => m.Start)},
    {path:'login',    loadComponent: () => import('./pages/genericos/login/login').then(m => m.Login)},
    {path:'register',    loadComponent: () => import('./pages/genericos/register/register').then(m => m.Register)},
    {path:'sesion',    loadComponent: () => import('./pages/genericos/sesion/sesion').then(m => m.Sesion)},
    {path:'datos-personales',    loadComponent: () => import('./pages/genericos/datos-personales/datos-personales').then(m => m.DatosPersonales)},
    {path:'usuario',    loadComponent: () => import('./pages/genericos/usuario/usuario').then(m => m.Usuario)},
    
    // Cliente
    {path:'home',     loadComponent: () => import('./pages/cliente/home/home').then(m => m.Home)},
    {path:'carrito',    loadComponent: () => import('./pages/cliente/carrito/carrito').then(m => m.Carrito)},
    {path:'notificaciones',    loadComponent: () => import('./pages/cliente/notificaciones/notificaciones').then(m => m.Notificaciones)},
    {path:'detalle-pedido',    loadComponent: () => import('./pages/cliente/detalle-pedido/detalle-pedido').then(m => m.DetallePedido)},
    {path:'detalle-producto',    loadComponent: () => import('./pages/cliente/detalle-producto/detalle-producto').then(m => m.DetalleProducto)},
    {path:'productos',    loadComponent: () => import('./pages/cliente/productos/productos').then(m => m.Productos)},
    {path:'pedidos',    loadComponent: () => import('./pages/cliente/pedidos/pedidos').then(m => m.Pedidos)},
    
    // Admin
    {path:'admin/home',     loadComponent: () => import('./pages/admin/home/home').then(m => m.Home)},
    {path:'admin/producto/:id',    loadComponent: () => import('./pages/admin/detalle-producto/detalle-producto').then(m => m.DetalleProducto)}, 
    {path:'admin/usuario/:id',    loadComponent: () => import('./pages/admin/detalle-usuario/detalle-usuario').then(m => m.DetalleUsuario)},
    {path:'admin/categoria/:id',    loadComponent: () => import('./pages/admin/detalle-categoria/detalle-categoria').then(m => m.DetalleCategoria)}, 
    {path:'admin/pedido/:id',    loadComponent: () => import('./pages/admin/detalle-pedido/detalle-pedido').then(m => m.DetallePedido)}, 
    {path:'admin/promociones',    loadComponent: () => import('./pages/admin/promociones/promociones').then(m => m.Promociones)},
    {path:'admin/productos',    loadComponent: () => import('./pages/admin/productos/productos').then(m => m.Productos)},
    {path:'admin/pedidos',    loadComponent: () => import('./pages/admin/pedidos/pedidos').then(m => m.Pedidos)},
    {path:'admin/usuarios',    loadComponent: () => import('./pages/admin/usuarios/usuarios').then(m => m.Usuarios)},
    
    
    // Errores
    {path:'error',    loadComponent: () => import('./pages/genericos/error-page/error-page').then(m => m.ErrorPage)},
    {path:'', redirectTo:'start', pathMatch:'full'},  // Por defecto siempre redirecciona a start (pantalla de inicio)
    {path:'**', redirectTo:'error'} // Comodin: Cualquier otra ruta redirecciona a error

];
