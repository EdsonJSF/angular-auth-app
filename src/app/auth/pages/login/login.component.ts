import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    mail: ['Test1@gmail.com', [Validators.required, Validators.email]],
    pass: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    const { mail, pass } = this.miFormulario.value;

    this.authService.login(mail, pass).subscribe((valido) => {
      if (valido === true) {
        this.router.navigateByUrl('dashboard');
      } else {
        Swal.fire('Error', valido, 'error');
      }
    });
  }
}
