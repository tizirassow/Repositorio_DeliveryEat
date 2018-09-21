import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {Comercio} from '../comercios/comercio.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnChanges {
  productos: Producto[];
  @Input() comercioId: any;
  @Output() seleccionProducto = new EventEmitter();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (this.comercioId) {
      this.productos = this.getProductos();

    }
  }

  ngOnInit() {
    if (this.comercioId) {
      this.productos = this.getProductos();

    }


  }

  seleccionarProducto(producto) {
    this.seleccionProducto.emit(producto);

  }

  getProductos() {
    if (this.comercioId.comercioSeleccionado.id === 1) {
      return [
        {
          nombre: 'Kilo de helado',
          categoria: 'Helados',
          descripcion: 'Un kili de helado',
          imagenPath: 'src/app/img/caseratto.jpg'
        }
      ];
    }
    if (this.comercioId.comercioSeleccionado.id === 2) {
      return [
        {
          nombre: 'Pizza',
          categoria: 'Cocina rápida',
          descripcion: 'Pizzas',
          imagenPath: 'https://negozona.com/uploads/picture/image/590/strega_logo.png'
        }
      ];
    }

  }

}

export interface Producto {
  nombre: string;
  categoria: string;
  descripcion: string;
  imagenPath: string;
}
