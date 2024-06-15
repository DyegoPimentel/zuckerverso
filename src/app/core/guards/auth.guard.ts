import { CanActivateFn, Router } from '@angular/router';
import { MetamaskService } from '../../services/authentication/metamask.service';
import { inject } from '@angular/core';
import { from, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const metamaskService = inject(MetamaskService);
  const router = inject(Router);

  return from(metamaskService.isConnected()).pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        return router.createUrlTree(['/']);
      }
      return true;
    })
  );
};
