import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Route } from 'react-router-dom';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  return true;
};