import {Component, OnInit, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, NgForm} from '@angular/forms';
import {CreditCardValidator} from 'ngx-credit-cards';


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent {

  regiForm: FormGroup;
  Direccion: '';
  FechaEentrega: Date = null;
  Blog: '';
  Email: '';
  NumeroTarjeta: '';
  NombreTarjeta: '';
  FechaExp: ' ';
  CodigoSeg: '';
  PagoCon: '';
  IsAccepted: number = 0;

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Kilo de helado', cost: 250, notas: 'Sabores: Ferrero Rocher, Tramontana'},
    {item: 'Bombón escocés - 6u', cost: 150, notas: ''}
  ];

  constructor(private fb: FormBuilder) {


    // To initialize FormGroup
    this.regiForm = fb.group({
      'Direccion': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'FechaEntrega': [null, Validators.required],
      'HoraEntrega': [null, Validators.required],
      'FormaPago': [null, Validators.required],
      'PagoCon': [null, Validators.min(0)],
      'NumeroTarjeta': [null, CreditCardValidator.validateCardNumber],
      'NombreTarjeta': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'FechaExp': ['', CreditCardValidator.validateCardExpiry],
      'CodigoSeg': [null, CreditCardValidator.validateCardCvc],
      'Email': [null, Validators.compose([Validators.required, Validators.email])],
      'IsAccepted': [null]
    });

  }

  // On Change event of Toggle Button
  OnChanges(event: any) {
    if (event.checked === true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }


}

export interface Transaction {
  item: string;
  cost: number;
  notas: string;
}
