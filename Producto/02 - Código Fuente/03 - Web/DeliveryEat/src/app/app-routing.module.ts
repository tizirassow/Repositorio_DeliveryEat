import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ComercioComponent} from './comercios/comercio.component';
import {ProductoComponent} from './productos/producto.component';
import {PagosComponent} from './pagos/pagos.component';

const routes: Routes = [{path: 'comercios', component: ComercioComponent},
  {path: 'productos', component: ProductoComponent},
  {path: 'pagos', component: PagosComponent}];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponentes = [ComercioComponent, ProductoComponent, PagosComponent];
