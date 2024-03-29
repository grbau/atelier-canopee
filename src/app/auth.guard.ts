import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
                private router: Router,
                private userService: UserService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const routeUrl: string = state.url;
        return this.isLogin(routeUrl);
    }
    isLogin(routeUrl: string) {
        if (this.userService.isLoggedIn()) {
            return true;
        }
        this.userService.redirectUrl = routeUrl;
        this.router.navigate(['/login'], {queryParams: { returnUrl: routeUrl }} );
    }
}
