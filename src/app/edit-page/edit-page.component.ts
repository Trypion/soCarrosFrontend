import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CarService } from './../services/car.service';
import { Car } from './../models/car';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private carService: CarService) { }

  id: string;

  car: Car = new Car();

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getCarById();
  }

  getCarById(){
    this.carService.getCarById(this.id).subscribe((carAux: Car) =>{
      this.car = carAux;
    });
  }

  updateCar(form: NgForm){
    this.carService.updateCar(this.car).subscribe(() => {
      this.router.navigateByUrl("/show/"+this.id);
    });
  }

}
