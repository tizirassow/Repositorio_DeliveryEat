import {Injectable} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ComerciosService {

  constructor() {
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nombre: new FormControl(''),
    fecha: new FormControl('')
  });

}
