import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import { AgmCoreModule } from '@agm/core';
import { NgXCreditCardsModule } from 'ngx-credit-cards';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';

import {ComerciosService} from './shared/comercios.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ComercioComponent} from './comercios/comercio.component';
import {PagosComponent} from './pagos/pagos.component';
import {PedidoComponent} from './pedido/pedido.component';
import {ProductoComponent} from './productos/producto.component';
import {DetallePedidoComponent, PizzaPartyComponent} from './pedido/detalle-pedido/detalle-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    ComercioComponent,
    PagosComponent,
    PedidoComponent,
    ProductoComponent,
    DetallePedidoComponent,
    PizzaPartyComponent,
  ],
  imports: [
    // AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NgXCreditCardsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY',
      libraries: ['places']
    })
  ],
  providers: [ComerciosService],
  bootstrap: [AppComponent],
  entryComponents: [PedidoComponent, PizzaPartyComponent]

})
export class AppModule {
}
