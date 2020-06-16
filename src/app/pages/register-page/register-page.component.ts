import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/_alert';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  user: User = new User();
  passwdConfirm;

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

  onSubmit(): void {
    this.auth.registerUser(this.user).subscribe(
      () => {
        localStorage.setItem('username', this.user.username);
        this.alertService.success(
          'Registrado com sucesso, Bem vindo!',
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

  //volta pra ultima pagina
  cancel() {
    this.location.back();
  }

  ngOnInit(): void {}
}
