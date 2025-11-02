import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VehiculoComponent } from './vehiculo.component';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo';

describe('VehiculoComponent', () => {
  let component: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VehiculoComponent],
      providers: [VehiculoService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with three rows plus header', () => {
    // Arrange: Crear un listado de 3 vehículos
    const vehiculosPrueba: Vehiculo[] = [
      new Vehiculo(1, 'Renault', 'Kangoo', 'VU Express', 2017, 93272, 'Blanco', 'https://example.com/imagen1.jpg'),
      new Vehiculo(2, 'Chevrolet', 'Spark', 'Life', 2018, 55926, 'Plata', 'https://example.com/imagen2.jpg'),
      new Vehiculo(3, 'Nissan', 'March', 'Active Plus', 2019, 31298, 'Rojo', 'https://example.com/imagen3.jpg')
    ];

    // Act: Asignar los vehículos al componente
    component.vehiculos = vehiculosPrueba;
    component.calcularConteoMarcas();
    fixture.detectChanges();

    // Assert: Verificar que la tabla se creó correctamente
    const table = compiled.query(By.css('table'));
    expect(table).toBeTruthy();

    // Verificar el encabezado (thead)
    const thead = compiled.query(By.css('thead'));
    expect(thead).toBeTruthy();
    
    const headerRows = compiled.queryAll(By.css('thead tr'));
    expect(headerRows.length).toBe(1);

    const headerCells = compiled.queryAll(By.css('thead th'));
    expect(headerCells.length).toBe(4); // #, Marca, Línea, Modelo

    // Verificar las filas de datos (tbody)
    const tbody = compiled.query(By.css('tbody'));
    expect(tbody).toBeTruthy();

    const dataRows = compiled.queryAll(By.css('tbody tr'));
    expect(dataRows.length).toBe(3); // Tres filas de datos

    // Verificar el contenido de la primera fila
    const firstRowCells = dataRows[0].queryAll(By.css('td, th'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Renault');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('Kangoo');
    expect(firstRowCells[3].nativeElement.textContent.trim()).toBe('2017');

    // Verificar el contenido de la segunda fila
    const secondRowCells = dataRows[1].queryAll(By.css('td, th'));
    expect(secondRowCells[0].nativeElement.textContent.trim()).toBe('2');
    expect(secondRowCells[1].nativeElement.textContent.trim()).toBe('Chevrolet');
    expect(secondRowCells[2].nativeElement.textContent.trim()).toBe('Spark');
    expect(secondRowCells[3].nativeElement.textContent.trim()).toBe('2018');

    // Verificar el contenido de la tercera fila
    const thirdRowCells = dataRows[2].queryAll(By.css('td, th'));
    expect(thirdRowCells[0].nativeElement.textContent.trim()).toBe('3');
    expect(thirdRowCells[1].nativeElement.textContent.trim()).toBe('Nissan');
    expect(thirdRowCells[2].nativeElement.textContent.trim()).toBe('March');
    expect(thirdRowCells[3].nativeElement.textContent.trim()).toBe('2019');
  });

  it('should calculate marca count correctly', () => {
    // Arrange: Crear un listado con marcas repetidas
    const vehiculosPrueba: Vehiculo[] = [
      new Vehiculo(1, 'Renault', 'Kangoo', 'VU Express', 2017, 93272, 'Blanco', 'https://example.com/imagen1.jpg'),
      new Vehiculo(2, 'Chevrolet', 'Spark', 'Life', 2018, 55926, 'Plata', 'https://example.com/imagen2.jpg'),
      new Vehiculo(3, 'Renault', 'Sandero', 'Authentique', 2020, 25629, 'Rojo', 'https://example.com/imagen3.jpg')
    ];

    // Act: Asignar vehículos y calcular conteo
    component.vehiculos = vehiculosPrueba;
    component.calcularConteoMarcas();

    // Assert: Verificar el conteo
    expect(component.conteoMarcas['Renault']).toBe(2);
    expect(component.conteoMarcas['Chevrolet']).toBe(1);
  });

  it('should display marca count in the view', () => {
    // Arrange: Crear vehículos de prueba
    const vehiculosPrueba: Vehiculo[] = [
      new Vehiculo(1, 'Renault', 'Kangoo', 'VU Express', 2017, 93272, 'Blanco', 'https://example.com/imagen1.jpg'),
      new Vehiculo(2, 'Chevrolet', 'Spark', 'Life', 2018, 55926, 'Plata', 'https://example.com/imagen2.jpg'),
      new Vehiculo(3, 'Renault', 'Sandero', 'Authentique', 2020, 25629, 'Rojo', 'https://example.com/imagen3.jpg')
    ];

    // Act: Asignar vehículos y detectar cambios
    component.vehiculos = vehiculosPrueba;
    component.calcularConteoMarcas();
    fixture.detectChanges();

    // Assert: Verificar que el conteo se muestra en la vista
    const conteoSection = compiled.query(By.css('.conteo-marcas'));
    expect(conteoSection).toBeTruthy();

    const marcaCounts = compiled.queryAll(By.css('.marca-count'));
    expect(marcaCounts.length).toBe(2); // Renault y Chevrolet

    // Verificar el texto del conteo
    const conteoTexts = marcaCounts.map(mc => mc.nativeElement.textContent.trim());
    expect(conteoTexts).toContain('Total Renault: 2');
    expect(conteoTexts).toContain('Total Chevrolet: 1');
  });
});