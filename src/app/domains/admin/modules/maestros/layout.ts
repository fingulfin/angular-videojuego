import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { environment } from '@/environments/environment';

@Component({
  selector: 'maestros-layout',
  templateUrl: './layout.html',
  imports: [
    MatTabGroup,
    MatTab,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormField,
  ],
})
export default class MaestrosLayout {
  private http = inject(HttpClient);

  protected maestroFormModel = signal({
    correo: '',
    password: '',
  });

  protected maestroForm = form(this.maestroFormModel, (form) => {
    required(form.correo, { message: 'El correo es obligatorio' });
    required(form.password, { message: 'La contraseña es obligatoria' });
  });

  protected enemigos = signal<{ nombre: string; agresividad: string }[]>([]);

  protected guardarError = signal<string>('');
  protected guardarExito = signal<boolean>(false);

  agregarEnemigo() {
    this.enemigos.update((list) => [...list, { nombre: '', agresividad: '' }]);
  }

  eliminarEnemigo(index: number) {
    this.enemigos.update((list) => list.filter((_, i) => i !== index));
  }

  onEnemigoInput(
    index: number,
    campo: 'nombre' | 'agresividad',
    valor: string
  ) {
    this.enemigos.update((list) =>
      list.map((e, i) => (i === index ? { ...e, [campo]: valor } : e))
    );
  }

  guardar(event: Event) {
    event.preventDefault();

    this.guardarError.set('');
    this.guardarExito.set(false);

    submit(this.maestroForm, async () => {
      const body = {
        correo: this.maestroFormModel().correo,
        password: this.maestroFormModel().password,
        enemigos: this.enemigos(),
      };

      this.http
        .post(`${environment.apiUrl}/api/mongo/maestros`, body)
        .subscribe({
          next: () => {
            this.guardarExito.set(true);
            this.maestroFormModel.set({ correo: '', password: '' });
            this.enemigos.set([]);
          },
          error: (err) => {
            this.guardarError.set('No se pudo guardar el maestro');
            console.error('Error al guardar', err);
          },
        });
    });
  }
}
