import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoComponent } from './vehiculo.component';
import { VehiculoService } from './vehiculo.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VehiculoComponent],
  providers: [VehiculoService],
  exports: [VehiculoComponent]
})
export class VehiculoModule { }
