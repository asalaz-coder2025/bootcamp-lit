import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Tarea {
  titulo: string;
  estado: 'pendiente' | 'en progreso' | 'completada';
}

interface Empleado {
  id: number;
  nombre: string;
  departamento: string;
  foto: string;
}

@customElement('empleado-card')
export class EmpleadoCard extends LitElement {
  static styles = css`
    .card {
      border: 1px solid #ccc;
      padding: 12px;
      margin-bottom: 10px;
      border-radius: 6px;
      width: 100%;
      max-width: 200px;
      border-radius: 16px;
      overflow: hidden;
    }
    .tarea {
      margin-left: 12px;
    }
    .estado {
      font-size: 0.85em;
      color: gray;
    }
    img{
        display: flex;
        width: 100%;
        object-fit: cover;
    }
  `;

  @property({ type: Object }) empleado!: Empleado;
  @property({ type: Array }) tareas: Tarea[] = [];

  render() {
    return html`
      <div class="card">
        <h3>${this.empleado.nombre}</h3>
        <img .src=${this.empleado.foto} .alt=${this.empleado.nombre}>
        <p>Departamento: ${this.empleado.departamento}</p>
        <h4>Tareas:</h4>
        <ul>
          ${this.tareas.map(t => html`
            <li class="tarea">
              ${t.titulo} <span class="estado">(${t.estado})</span>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
}
