import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Car } from '../../models/car';
import { AuthService } from '../../services/auth.service';

import { CarService } from '../../services/car.service';
import { AlertService } from 'src/app/components/_alert';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css'],
})
export class ShowPageComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  id: string;
  car: Car = new Car();

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

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

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(
      () => {
        this.alertService.success(
          'carro deletado com sucesso!',
          this.alertOptions
        );
        this.router.navigateByUrl('/main');
      },
      (err) => {
        this.alertService.err(
          'Erro: ' + err.status + ' - ' + err.statusText,
          this.alertOptions
        );
      }
    );
  }

  teste() {
    this.auth.teste().subscribe(() => {
      console.log('teste');
    });
  }
}
