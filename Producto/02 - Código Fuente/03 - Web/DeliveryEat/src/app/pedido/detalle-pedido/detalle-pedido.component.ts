import {Component, OnInit, OnChanges, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CreditCardValidator} from 'ngx-credit-cards';
import {Time} from '@angular/common';


@Component({
  selector: 'app-detalle-pedido', templateUrl: './detalle-pedido.component.html', styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent {

  regiForm: FormGroup;
  fechaHoraForm: FormGroup;
  pagosForm: FormGroup;
  cardForm: FormGroup;
  confirmationForm: FormGroup;
  Direccion: '';
  FechaEntrega: Date = null;
  HoraEntrega: Time = null;
  FormaPago: '';
  NumeroTarjeta: '';
  NombreTarjeta: '';
  FechaExp: ' ';
  CodigoSeg: '';
  PagoCon: '';
  EsFechaEspecifica: number = 0;
  IsAccepted: number = 0;

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [{
    item: 'Kilo de helado', cost: 250, notas: 'Sabores: Ferrero Rocher, Tramontana'
  }, {item: 'Bombón escocés - 6u', cost: 150, notas: ''}];

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) {

    // To initialize FormGroup
    this.regiForm = fb.group({
      'Direccion': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'EsFechaEspecifica': [null]
    });

    this.pagosForm = fb.group({
      'FormaPago': [null, Validators.required],
      'PagoCon': [null, Validators.compose([Validators.min(400), Validators.nullValidator])],
      'NumeroTarjeta': [null],
      'NombreTarjeta': [null],
      'FechaExp': [null],
      'CodigoSeg': [null],
    });
    this.cardForm = fb.group({});
    this.confirmationForm = fb.group({
      stepConfirmacionCtrl: ['', Validators.required], 'IsAccepted': [null]
    });
    this.fechaHoraForm = fb.group({});


  }

  // On Change event of Toggle Button
  OnChanges(event: any) {
    if (event.checked === true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  FechaHoraEspecifica(event: any) {
    if (event.checked === true) {
      this.EsFechaEspecifica = 1;
      this.fechaHoraForm = this.fb.group({
        'FechaEntrega': [null, Validators.required],
        'HoraEntrega': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      });
    } else {
      this.EsFechaEspecifica = 0;
      this.fechaHoraForm = this.fb.group({
        'FechaEntrega': [null], 'HoraEntrega': [null]
      });
    }
  }

  iniciarValidadoresTarjeta(event: any) {
    if (event === 'usaTarjeta') {
      this.cardForm = this.fb.group({
        'NumeroTarjeta': [null, CreditCardValidator.validateCardNumber],
        'NombreTarjeta': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'FechaExp': ['', CreditCardValidator.validateCardExpiry],
        'CodigoSeg': [null, CreditCardValidator.validateCardCvc],
      });
    }
    if (event) {
      this.FormaPago = event;
    }
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 10000,
    });
  }

}

export interface Transaction {
  item: string;
  cost: number;
  notas: string;
}

@Component({
  selector: 'confirmacion-dp', templateUrl: 'confirmacion.html'
})
export class PizzaPartyComponent {
}
