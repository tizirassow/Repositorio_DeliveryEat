import {ChangeDetectorRef, Component} from '@angular/core';
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
  esYa: number = 0;
  formaPago: '';
  numeroTarjeta: '';
  nombreTarjeta: '';
  fechaExp: ' ';
  codigoSeg: '';
  pagoCon: '';

  //Declaro array de pedido hardcodeado
  displayedColumns: string[] = ['item', 'cost'];
  pedidoHard: Pedido[] = [{
    item: 'Kilo de helado', cost: 250, notas: 'Sabores: Ferrero Rocher, Tramontana'
  }, {item: 'Bombón escocés - 6u', cost: 150, notas: ''}];

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar,private cd: ChangeDetectorRef) {

    // Incializo los formularios con sus respectivas validaciones iniciales
    this.regiForm = fb.group({
      'calle': ['', Validators.compose([Validators.required, Validators.maxLength(250),Validators.pattern('^\\D+\\s(\\D+\\s+)*\\d+$')])],
      // 'numeracion': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10),Validators.pattern('^[0-9_-]*')])],
      'pisoDpto': ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10)])],
      'fechaHoraForm':fb.group({
        'fechaEntrega': ['', Validators.compose([Validators.required, Validators.nullValidator])],
        'horaEntrega': ['', Validators.compose([Validators.required, Validators.nullValidator])]
      }),
      'esYa': [null]
    });
    this.pagosForm = fb.group({
      'formaPago': [null, Validators.required],
      'pagoCon': [null],
      'cardForm': fb.group({
        'numeroTarjeta': [null],
        'nombreTarjeta': [null],
        'fechaExp': [''],
        'codigoSeg': [null]})
    });
    this.confirmationForm = fb.group({});
  }

  ngAfterContentInit() {
    this.cd.detectChanges();
  }

  fechaHoraEspecifica(event: any) {

    if (event.checked === true) {

      //Si seleccionó "Lo antes posible", quito las validaciones de hora y fecha específica
      this.esYa = 1;
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['fechaEntrega'].clearValidators();
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['horaEntrega'].clearValidators();
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['fechaEntrega'].updateValueAndValidity();
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['horaEntrega'].updateValueAndValidity();
      this.regiForm.controls['fechaHoraForm'].updateValueAndValidity();
      this.regiForm.updateValueAndValidity();

    } else {

      //Si seleccionó "Fecha y hora específica", agrego las validaciones corespondientes
      this.esYa = 0;
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['fechaEntrega'].setValidators(Validators.compose([Validators.required, Validators.nullValidator]));
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['horaEntrega'].setValidators(Validators.compose([Validators.required, Validators.nullValidator]));
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['fechaEntrega'].updateValueAndValidity();
      (this.regiForm.controls['fechaHoraForm'] as FormGroup).controls['horaEntrega'].updateValueAndValidity();
      this.regiForm.controls['fechaHoraForm'].updateValueAndValidity();
      this.regiForm.updateValueAndValidity();

    }
  }
  iniciarValidadoresTarjeta(event: any) {
    if (event) {
      this.formaPago = event;
      this.cd.detectChanges();

    }
    if (event === 'usaTarjeta') {
      //Si seleccionó forma de pago "Tarjeta de crédito", agrego las validaciones de tarjeta de crédito
      this.pagosForm.controls['pagoCon'].clearValidators();
      this.pagosForm.controls['pagoCon'].updateValueAndValidity();

      (this.pagosForm.controls['cardForm'] as FormGroup).controls['numeroTarjeta'].setValidators(Validators.compose([CreditCardValidator.validateCardNumber, Validators.pattern('^4[0-9_-]*')]));
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['nombreTarjeta'].setValidators(Validators.compose([Validators.required, Validators.minLength(2)]));
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['fechaExp'].setValidators(CreditCardValidator.validateCardExpiry);
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['codigoSeg'].setValidators(CreditCardValidator.validateCardCvc);

      (this.pagosForm.controls['cardForm'] as FormGroup).controls['numeroTarjeta'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['nombreTarjeta'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['fechaExp'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['codigoSeg'].updateValueAndValidity();
      this.pagosForm.controls['cardForm'].updateValueAndValidity();
      this.pagosForm.updateValueAndValidity();

      this.cd.detectChanges();
    }
    else {
      //Si seleccionó forma de pago "Efectivo", agrego las validaciones correspondientes
      this.pagosForm.controls['pagoCon'].setValidators(Validators.compose([Validators.min(400),Validators.required]));
      this.pagosForm.controls['pagoCon'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['numeroTarjeta'].clearValidators();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['nombreTarjeta'].clearValidators();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['fechaExp'].clearValidators();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['codigoSeg'].clearValidators();
      this.pagosForm.controls['cardForm'].clearValidators();

      (this.pagosForm.controls['cardForm'] as FormGroup).controls['numeroTarjeta'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['nombreTarjeta'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['fechaExp'].updateValueAndValidity();
      (this.pagosForm.controls['cardForm'] as FormGroup).controls['codigoSeg'].updateValueAndValidity();
      this.pagosForm.controls['cardForm'].updateValueAndValidity();

      this.pagosForm.updateValueAndValidity();
      this.cd.detectChanges();

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
