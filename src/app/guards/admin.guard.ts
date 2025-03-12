import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.getUserRole().pipe(
    map(role => {
      if (role === 'Admin') {
        return true; // Allow access
      } else {
        router.navigate(['/login']); // Redirect to login
        return false; // Block access
      }
    })
  );
};
