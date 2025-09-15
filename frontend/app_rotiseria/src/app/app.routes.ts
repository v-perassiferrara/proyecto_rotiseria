import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ErrorPage } from './pages/error-page/error-page';

export const routes: Routes = [
    {path:'home', component: Home},
    {path:'error', component: ErrorPage},
    {path:'', redirectTo:'home', pathMatch:'full'},  // Por defecto siempre redirecciona a home
    {path:'**', redirectTo:'error'} // Cualquier otra ruta redirecciona a error
];
