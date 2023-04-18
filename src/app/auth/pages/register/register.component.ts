import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    mail: ['Test4@gmail.com', [Validators.required, Validators.email]],
    name: ['Test 4', [Validators.required]],
    pass: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder) {}

  registro() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }
}
