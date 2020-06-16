import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user: User = new User();
  passwdConfirm;
  
  constructor(private location: Location, private auth: AuthService, private router: Router) { }

  onSubmit(): void {
    this.auth.registerUser(this.user).subscribe(()=>{
      localStorage.setItem('username', this.user.username);
      this.router.navigateByUrl("/main");
    });
  }

  //volta pra ultima pagina
  cancel() {
    this.location.back(); 
  }

  ngOnInit(): void {
  }

}
