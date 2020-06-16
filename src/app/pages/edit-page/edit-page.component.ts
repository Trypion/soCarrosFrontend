import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { AlertService } from 'src/app/components/_alert';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
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

  id: string;

  car: Car = new Car();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getCarById();
  }

  getCarById() {
    this.carService.getCarById(this.id).subscribe((carAux: Car) => {
      this.car = carAux;
    });
  }

  updateCar(form: NgForm) {
    this.carService.updateCar(this.car).subscribe(
      () => {
        this.alertService.success(
          'editado com sucesso!',
          this.alertOptions
        );
        this.router.navigateByUrl('/show/' + this.id);
      },
      (err) => {
        this.alertService.err(
          'Erro: ' + err.status + ' - ' + err.statusText,
          this.alertOptions
        );
      }
    );
  }
}
