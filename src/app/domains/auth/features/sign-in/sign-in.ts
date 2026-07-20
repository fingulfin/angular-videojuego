import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  required,
  submit,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.html',
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormField,
    MatDivider,
  ],
})
export default class AuthSignIn {
  // Dependencies
  private router = inject(Router);
  private http = inject(HttpClient);

  // State
  protected signInFormModel = signal({
    email: '',
    password: '',
  });
  protected signInForm = form(this.signInFormModel, (form) => {
    required(form.email, { message: 'You must enter an email address' });
   // email(form.email, { message: 'You must enter a valid email address' });

    required(form.password, { message: 'You must enter a password' });
  });
  protected signInError = signal<string>('');

  signIn(event: Event) {
    event.preventDefault();

    this.signInError.set('');

    submit(this.signInForm, async () => {
      const body = {
        correo: this.signInFormModel().email,
        password: this.signInFormModel().password,
      };

      this.http.post('http://localhost:3000/api/mongo/maestros/login', body).subscribe({
next: () => {
            this.router.navigateByUrl('/admin/maestros');
          },
        error: (err) => {
          this.signInError.set('Invalid email or password');
          console.error('Login failed', err);
        },
      });
    });
  }
}
