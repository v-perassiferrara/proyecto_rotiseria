import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';


export const authsessionGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    const roles = ['admin', 'empleado', 'cliente'];
    const role = authService.getRole();

    if (route.url.toString().startsWith('admin') && role === 'cliente') {
      router.navigate(['/start']);
      return false;
    }

    if (role !== null && roles.includes(role)) {
      return true;
    }

    router.navigate(['/start']);
    return false;
  }
  router.navigate(['/start']);
  return false;
};