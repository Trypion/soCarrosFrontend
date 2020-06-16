import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { AlertService } from 'src/app/components/_alert';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  car: Car = new Car();

  ngOnInit(): void {}

  saveCar(form: NgForm) {
    this.carService.saveCar(this.car).subscribe((carro) => {
      this.alertService.success('Carro adicionado com sucesso', this.alertOptions);
      this.router.navigateByUrl('/show/' + carro.id);
    }, (err) => {
      this.alertService.err("Erro: " + err.status + ' - '+ err.statusText, this.alertOptions);
    });
  }
}
