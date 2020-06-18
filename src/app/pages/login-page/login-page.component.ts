import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/components/_alert';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  user: User = new User();

  autenticado: boolean = false;

  constructor(
    private alertService: AlertService,
    private location: Location,
    private auth: AuthService,
    private router: Router
  ) {}

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  ngOnInit(): void {}

  onSubmit(): void {
    this.fazLogin();
  }

  cancel() {
    this.location.back();
  }

  fazLogin() {
    this.auth.loginUser(this.user).subscribe(
      () => {
        sessionStorage.setItem('username', this.user.username);
        this.alertService.success(
          'Login realizado com sucesso!',
          this.alertOptions
        );
        this.router.navigateByUrl('/main');
      },
      (err) => {
        this.alertService.err(
          'Erro: ' + err.status + ' - ' + err.statusText,
          this.alertOptions
        );
      }
    );
  }
}
