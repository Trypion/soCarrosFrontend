import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../components/_alert';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private alertService: AlertService,
    private auth: AuthService,
    private router: Router
  ) {}

  options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.auth.loggedIn();

  }






   /* const isLoggedIn = this.auth.getIsAuth();

    if (!isLoggedIn) {
      this.alertService.warn(
        'Você precisa fazer o login para acessar essa pagina!',
        this.options
      );
      this.router.navigateByUrl('/login');
    }

    return isLoggedIn; */
  //}


}
