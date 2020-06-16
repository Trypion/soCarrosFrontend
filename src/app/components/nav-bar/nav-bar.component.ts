import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username: String;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
      
  }

  //logout do usuario
  logout(){
    this.auth.logoutUser().subscribe((success: boolean) => {
      //usuario logout
      localStorage.removeItem("username");

      if(success) this.router.navigateByUrl('/main');
    });
  }

  //checa se tem um nome de usuario no localstorage se tiver mostra o nome na navbar
  atualizaUser(){
   this.username = localStorage.getItem("username");
   return !(localStorage.getItem("username") === null);
  }

  //esconde os botoes de login/logout conforme o usuario esta logado ou nao
  mostraMenu(){
    return this.auth.getIsAuth();    
  }

  //esconde a navbar na rota
  checa(){        
    return !(this.router.url === '/home');
  }

}
