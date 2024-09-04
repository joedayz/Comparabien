import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Prospecto } from '../../../../models/prospecto';
import { ProspectoService } from '../../../../services/prospecto.service';
import Swal from 'sweetalert2';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-solicitud-prestamo',
  templateUrl: './solicitud-prestamo.component.html',
  styleUrls: ['./solicitud-prestamo.component.css']
})
export class SolicitudPrestamoComponent implements OnInit {

  form: FormGroup;
  id: number;

  constructor(private readonly prospectoService: ProspectoService,
              private readonly departamentoService: DepartamentoService,
              private readonly fb: FormBuilder,
              private readonly router: Router) { }

  departamento: SelectItem[];
  tipoDocumento: SelectItem[];

  ngOnInit(): void {
    this.createForm();
    this.loadDepartamento();
    this.loadDocumento();
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['',  Validators.required],
      apellido: ['',  Validators.required],
      tipoDocumentoId: [],
      numeroDocumento: ['',  Validators.required],
      email: ['',  Validators.required],
      celular: ['',  Validators.required],
      departamentoId: []
    });
  }

  get nombreNoValido(){
    return this.validar('nombre');
  }

  get apellidoNoValido(){
    return this.validar('apellido');
  }

  get numeroDocumentoNoValido(){
    return this.validar('numeroDocumento');
  }

  get emailNoValido(){
    return this.validar('email');
  }

  get celularNoValido(){
    return this.validar('celular');
  }

  private validar(nombreCampo: string){
    return this.form.get(nombreCampo).invalid && this.form.get(nombreCampo).touched;
  }

  guardar() {
    if (this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const data = new Prospecto();
    data.nombres = this.form.value.nombre;
    data.apellidos = this.form.value.apellido;
    data.tipoDocumentoId = this.form.value.tipoDocumentoId;
    data.departamentoId = this.form.value.departamentoId;
    data.email = this.form.value.email;
    data.numeroDocumento = this.form.value.numeroDocumento;
    data.numeroCelular =  this.form.value.celular;
    this.prospectoService.save(data).subscribe( () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su informacion fue enviada',
        text: 'Por favor espere a que le contactemos, gracias.',
        showConfirmButton: true
      }).then((result) => {
        this.router.navigate(['/home']);
      });
    });
  }

  loadDocumento(){
    this.tipoDocumento = [
      {label: 'Seleccione..', value: null},
      {label: 'DNI', value: 1},
      {label: 'Carnet Extranjeria', value: 2 }
    ];
  }

  loadDepartamento(){
    this.departamento = [{label: "Seleccione..", value: null}];
    this.departamentoService.listar().subscribe((data: SelectItem[])=> {
      data.forEach((element: SelectItem) => {
        this.departamento.push(element);
      });
    });
  }
}
