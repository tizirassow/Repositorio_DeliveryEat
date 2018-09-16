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
  lat: number = 43.678418;
  lng: number = -79.809007;

  constructor(private fb: FormBuilder) {


    // To initialize FormGroup
    this.regiForm = fb.group({
      'Direccion': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'FechaEntrega': [null, Validators.required],
      'FormaPago': [null, Validators.required],
      'PagoCon': [null, Validators.min(0)],
      'NumeroTarjeta': [null, CreditCardValidator.validateCardNumber],
      'NombreTarjeta' : ['', Validators.compose([Validators.required, Validators.minLength(2)])],
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

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }


}
