import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterModule,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  username: String;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public auth: AuthService
  ) {}

  _isAuthenticated: boolean;
  ngOnInit(): void {}

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  //logout do usuario
  logout() {
    this.auth.logoutUser().subscribe(() => {
      this.alertService.success('Logout realizado com sucesso!', this.options);
      sessionStorage.removeItem('username');
      this.router.navigateByUrl('/main');
    });
  }

  //checa se tem um nome de usuario no sessionStorage se tiver mostra o nome na navbar
  atualizaUser() {
    this.username = sessionStorage.getItem('username');
    return !(sessionStorage.getItem('username') === null);
  }

  //esconde os botoes de login/logout conforme o usuario esta logado ou nao
  mostrarMenu() {
    if(!(sessionStorage.getItem("isLoggedIn")) || sessionStorage.getItem("isLoggedIn") === 'false'){
      return false;
    }

    return true;
  }

  //esconde a navbar na rota
  checa() {
    return !(this.router.url === '/home');
  }
}
