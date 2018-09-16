import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as Material from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatCardModule,
    Material.MatSelectModule,
    Material.MatButtonModule,
    Material.MatSidenavModule,
    Material.MatIconModule,
    Material.MatListModule,
    Material.MatStepperModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatGridListModule,
    Material.MatSlideToggleModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,

  ],
  declarations: [],
  exports: [Material.MatToolbarModule,
    Material.MatCardModule,
    Material.MatSelectModule,
    Material.MatButtonModule,
    Material.MatSidenavModule,
    Material.MatIconModule,
    Material.MatListModule,
    Material.MatStepperModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatGridListModule,
    Material.MatSlideToggleModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,

  ]
})
export class MaterialModule {
}
