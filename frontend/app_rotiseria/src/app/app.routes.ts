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

    {path:'error',    loadComponent: () => import('./pages/genericos/error-page/error-page').then(m => m.ErrorPage)},
    {path:'', redirectTo:'home', pathMatch:'full'},  // Por defecto siempre redirecciona a home
    {path:'**', redirectTo:'error'} // Comodín: Cualquier otra ruta redirecciona a error
];
