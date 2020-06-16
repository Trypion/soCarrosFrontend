import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private carService: CarService) { }

  car: Car = new Car();

  ngOnInit(): void {
  }

  saveCar(form: NgForm){
    this.carService.saveCar(this.car).subscribe(() => {
      this.router.navigateByUrl("/main");
    });
  }

}
