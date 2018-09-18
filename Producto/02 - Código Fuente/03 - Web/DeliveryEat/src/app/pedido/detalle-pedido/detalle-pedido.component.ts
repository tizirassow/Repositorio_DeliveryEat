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
  fechaEntrega: Date = null;
  horaEntrega: Time = null;
  formaPago: '';
  numeroTarjeta: '';
  nombreTarjeta: '';
  fechaExp: ' ';
  codigoSeg: '';
  pagoCon: '';
  esFechaEspecifica: number = 0;
  isAccepted: number = 0;

  displayedColumns: string[] = ['item', 'cost'];
  pedidoHard: Pedido[] = [{
    item: 'Kilo de helado', cost: 250, notas: 'Sabores: Ferrero Rocher, Tramontana'
  }, {item: 'Bombón escocés - 6u', cost: 150, notas: ''}];

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) {

    // To initialize FormGroup
    this.regiForm = fb.group({
      'direccion': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'esFechaEspecifica': [null]
    });

    this.pagosForm = fb.group({
      'formaPago': [null, Validators.required],
      'pagoCon': [null, Validators.compose([Validators.min(400), Validators.nullValidator])],
      'numeroTarjeta': [null],
      'nombreTarjeta': [null],
      'fechaExp': [null],
      'codigoSeg': [null],
    });
    this.cardForm = fb.group({});
    this.confirmationForm = fb.group({
      stepConfirmacionCtrl: ['', Validators.required], 'isAccepted': [null]
    });
    this.fechaHoraForm = fb.group({});


  }

  // On Change event of Toggle Button
  onChanges(event: any) {
    if (event.checked === true) {
      this.isAccepted = 1;
    } else {
      this.isAccepted = 0;
    }
  }

  fechaHoraEspecifica(event: any) {
    if (event.checked === true) {
      this.esFechaEspecifica = 1;
      this.fechaHoraForm = this.fb.group({
        'fechaEntrega': [null, Validators.required],
        'horaEntrega': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      });
    } else {
      this.esFechaEspecifica = 0;
      this.fechaHoraForm = this.fb.group({
        'fechaEntrega': [null], 'horaEntrega': [null]
      });
    }
  }

  iniciarValidadoresTarjeta(event: any) {
    if (event === 'usaTarjeta') {
      this.cardForm = this.fb.group({
        'numeroTarjeta': [null, CreditCardValidator.validateCardNumber],
        'nombreTarjeta': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'fechaExp': ['', CreditCardValidator.validateCardExpiry],
        'codigoSeg': [null, CreditCardValidator.validateCardCvc],
      });
    }
    if (event) {
      this.formaPago = event;
    }
  }

  getTotalCost() {
    return this.pedidoHard.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
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
