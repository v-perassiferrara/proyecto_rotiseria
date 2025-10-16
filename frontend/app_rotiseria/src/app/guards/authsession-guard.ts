import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';


export const authsessionGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);

  if (localStorage.getItem('token')) {
    const roles = ['admin', 'empleado', 'cliente'];
    const role = authService.getRole();

    if (role !== null && roles.includes(role)) {
      return true;
    }
    return false;
  }
  return false;
};