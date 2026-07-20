import { Enemigo } from '../../enemigo/data/model';

export class Maestro {
  correo: string;
  password: string;
  enemigos: Enemigo[];

  constructor(correo: string, password: string, enemigos: Enemigo[] = []) {
    this.correo = correo;
    this.password = password;
    this.enemigos = enemigos;
  }
}