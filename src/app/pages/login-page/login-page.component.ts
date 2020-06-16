import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  user: User = new User();


  autenticado: boolean = false;

  constructor(private location: Location, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.fazLogin();
  }

  cancel() {
    this.location.back(); 
  }

  fazLogin() {
    this.auth.loginUser(this.user).subscribe(() => {
      localStorage.setItem('username', this.user.username);
      this.router.navigateByUrl('/main');
    });
  }
}
