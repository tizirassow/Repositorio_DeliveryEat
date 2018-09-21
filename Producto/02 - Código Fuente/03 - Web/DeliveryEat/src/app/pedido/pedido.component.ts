import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comercio} from '../comercios/comercio.component';
import {Producto} from '../productos/producto.component';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-pedido',
  templateUrl: 'pedido.component.html',
  styleUrls: ['pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  comercioSeleccionado: Comercio;
  productoeleccionado: Producto;

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

  seleccionComercio(comercio) {
    this.comercioSeleccionado = comercio;
  }

  seleccionProducto(producto) {
    this.productoeleccionado = producto;
  }
}
