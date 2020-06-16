import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router'
import { Car } from '../../models/car';
import { AuthService } from '../../services/auth.service';

import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private carService: CarService) { }

  id: string;
  car: Car = new Car();

  ngOnInit(): void {
  
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    });

    this.getCarById();

  }

  getCarById(){
    this.carService.getCarById(this.id).subscribe((carAux: Car) =>{
      this.car = carAux;      
    });
  }

  deleteCar(car: Car){
    this.carService.deleteCar(car).subscribe(() =>{
      this.router.navigateByUrl("/main");
    })
  }

  teste(){
    this.auth.teste().subscribe(()=>{
      console.log('teste');
    })
  }

}
