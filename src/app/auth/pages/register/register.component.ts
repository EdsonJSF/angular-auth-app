import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registro() {
    const { name, mail, pass } = this.miFormulario.value;
    this.authService.registro(name, mail, pass).subscribe((valido) => {
      if (valido === true) {
        this.router.navigateByUrl('dashboard');
      } else {
        Swal.fire('Error', valido, 'error');
      }
    });
  }
}
