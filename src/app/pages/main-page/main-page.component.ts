import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  car: Car = new Car();
  cars: Car[];

  constructor(private carService: CarService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getCars();
    this.auth.loggedIn().subscribe(() =>{
      
    });
  }

  getCars(){
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

}
