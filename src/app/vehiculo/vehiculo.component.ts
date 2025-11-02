import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
  standalone: false
})
export class VehiculoComponent implements OnInit {
  vehiculos: Array<Vehiculo> = [];
  conteoMarcas: { [marca: string]: number } = {};

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.getVehiculos();
  }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
      this.calcularConteoMarcas();
    });
  }

  calcularConteoMarcas(): void {
    this.conteoMarcas = {};
    
    this.vehiculos.forEach(vehiculo => {
      if (this.conteoMarcas[vehiculo.marca]) {
        this.conteoMarcas[vehiculo.marca]++;
      } else {
        this.conteoMarcas[vehiculo.marca] = 1;
      }
    });
  }

  getMarcas(): string[] {
    return Object.keys(this.conteoMarcas);
  }
}
