import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services"

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    } else {
        return router.createUrlTree(['/login'])
    }
}
