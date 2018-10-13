import {Component,Inject} from '@angular/core';
import {Time} from '@angular/common';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import {CreditCardValidator} from 'ngx-credit-cards';


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent {

  regiForm: FormGroup;
  fechaHoraForm: FormGroup;
  pagosForm: FormGroup;
  cardForm: FormGroup;
  confirmationForm: FormGroup;
  direccion: '';
  today =  new Date();
  fechaEntrega: Date = null;
  horaEntrega: Time = null;
  formaPago: '';
  numeroTarjeta: '';
  nombreTarjeta: '';
  fechaExp: ' ';
  codigoSeg: '';
  pagoCon: '';
  esYa: number = 0;

  displayedColumns: string[] = ['item', 'cost'];
  pedidoHard: Pedido[] = [{
    item: 'Kilo de helado', cost: 250, notas: 'Sabores: Ferrero Rocher, Tramontana'
  }, {item: 'Bombón escocés - 6u', cost: 150, notas: ''}];

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) {

    // Incializo los formularios con sus respectivas validaciones iniciales
    this.regiForm = fb.group({
      'calle': ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      'numeracion': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10),Validators.pattern('^[0-9_-]*')])],
      'piso': ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4),Validators.pattern('^[0-9_-]*')])],
      'dpto': ['', Validators.compose([Validators.minLength(1), Validators.maxLength(2),Validators.pattern('^[a-zA-Z_-]*')])],
      'esYa': [null]
    });
    this.pagosForm = fb.group({
      'formaPago': [null, Validators.required],
      'pagoCon': [null],
      'cardForm': fb.group({
        'numeroTarjeta': [null],
        'nombreTarjeta': [null],
        'fechaExp': [null],
        'codigoSeg': [null]})
    });
    this.confirmationForm = fb.group({});
    this.fechaHoraForm = fb.group({
      'fechaEntrega': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'horaEntrega': [null, Validators.compose([Validators.required, Validators.nullValidator])]
    });
  }

  fechaHoraEspecifica(event: any) {

    if (event.checked === true) {

      //Si seleccionó "Lo antes posible", quito las validaciones de hora y fecha específica
      this.esYa = 1;
      this.fechaHoraForm.controls['fechaEntrega'].clearValidators();
      this.fechaHoraForm.controls['horaEntrega'].clearValidators();
      this.fechaHoraForm.controls['fechaEntrega'].updateValueAndValidity();
      this.fechaHoraForm.controls['horaEntrega'].updateValueAndValidity();
      this.fechaHoraForm.updateValueAndValidity();

    } else {

      //Si seleccionó "Fecha y hora específica", agrego las validaciones corespondientes
      this.esYa = 0;
      this.fechaHoraForm.controls['fechaEntrega'].setValidators(Validators.compose([Validators.required, Validators.nullValidator]));
      this.fechaHoraForm.controls['horaEntrega'].setValidators(Validators.compose([Validators.required, Validators.nullValidator]));
      this.fechaHoraForm.controls['fechaEntrega'].updateValueAndValidity();
      this.fechaHoraForm.controls['horaEntrega'].updateValueAndValidity();
      this.fechaHoraForm.updateValueAndValidity();

    }
  }
  iniciarValidadoresTarjeta(event: any) {
    if (event) {
      this.formaPago = event;
    }
    if (event === 'usaTarjeta') {
      //Si seleccionó forma de pago "Tarjeta de crédito", agrego las validaciones de tarjeta de crédito
      this.pagosForm.controls['pagoCon'].clearValidators();
      this.pagosForm.controls['pagoCon'].updateValueAndValidity();

      (this.pagosForm.controls['cardForm'] as FormGroup).controls['numeroTarjeta'].setValidators(Validators.compose([CreditCardValidator.validateCardNumber, Validators.pattern('^4[0-9_-]*')]));
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['nombreTarjeta'].setValidators(Validators.compose([Validators.required, Validators.minLength(2)]));
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['fechaExp'].setValidators(CreditCardValidator.validateCardExpiry);
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['codigoSeg'].setValidators(CreditCardValidator.validateCardCvc);
      this.pagosForm.controls['cardForm'].updateValueAndValidity();

    }
    else {
      //Si seleccionó forma de pago "Efectivo", agrego las validaciones correspondientes
      this.pagosForm.controls['pagoCon'].setValidators(Validators.compose([Validators.min(400),Validators.required]));
      this.pagosForm.controls['pagoCon'].updateValueAndValidity();
      this.pagosForm.controls['cardForm'].clearValidators();
      this.pagosForm.controls.cardForm = this.fb.group({
          'numeroTarjeta': [null],
          'nombreTarjeta': [null],
          'fechaExp': [null],
          'codigoSeg': [null],
      });
      this.pagosForm.controls['cardForm'].updateValueAndValidity();
      this.pagosForm.updateValueAndValidity();

    }
  }

  getTotalCost() {
    //Devuelvo el monto total del pedido
    return this.pedidoHard.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  onFormSubmit(form1: NgForm,form2: NgForm,form3: NgForm) {
    //muestro por consola el contenido con el que quedó cada formulario
    var detallePedido = {form1,form2,form3};
    console.log(detallePedido);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(ConfirmacionComponent, {
      duration: 10000,
    });
  }

}

export interface Pedido {
  item: string;
  cost: number;
  notas: string;
}

@Component({
  selector: 'app-confirmacion', 
  templateUrl: '/detalle-pedido-confirmacion.html'
})
export class ConfirmacionComponent {
}
