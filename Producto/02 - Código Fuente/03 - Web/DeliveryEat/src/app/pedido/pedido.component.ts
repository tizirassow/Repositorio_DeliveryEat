import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-pedido',
  templateUrl: 'pedido.component.html',
  styleUrls: ['pedido.component.css'],
})
export class PedidoComponent implements OnInit {

  isLinear = true;
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {

  }

}
