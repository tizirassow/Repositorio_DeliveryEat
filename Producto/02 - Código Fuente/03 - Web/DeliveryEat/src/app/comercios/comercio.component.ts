import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {
  comercios: Comercio[];
  @Input() stock: number;
  @Input() productId: number;
  @Output() seleccionComercio = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.comercios = this.getComercios();
  }

  seleccionarComercio(comercioSeleccionado) {
    this.seleccionComercio.emit(comercioSeleccionado);

  }

  getComercios() {
    return [
      {
        id: 1,
        nombre: 'Caseratto',
        categoria: 'Helados',
        descripcion: 'Heladería artesanal',
        imagenPath: 'src/app/img/caseratto.jpg'
      },
      {
        id: 2,
        nombre: 'Strega',
        categoria: 'Cocina rápida',
        descripcion: 'Pizzas, lomitos y empanadas',
        imagenPath: 'https://negozona.com/uploads/picture/image/590/strega_logo.png'
      }
    ];
  }
}

export interface Comercio {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagenPath: string;
}

