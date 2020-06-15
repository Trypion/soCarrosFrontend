import { Component, OnInit } from '@angular/core';
import { CarService } from './../services/car.service';
import { Car } from './../models/car';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  car: Car = new Car();
  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

}
