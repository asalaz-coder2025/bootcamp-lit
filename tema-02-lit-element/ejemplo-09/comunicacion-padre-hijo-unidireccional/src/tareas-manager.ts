import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './empleado-card';

interface Empleado {
  id: number;
  nombre: string;
  departamento: string;
  foto: string;
}

interface Tarea {
  titulo: string;
  estado: 'pendiente' | 'en progreso' | 'completada';
}

@customElement('tareas-manager')
export class TareasManager extends LitElement {
  static styles = css`
    select {
      margin-bottom: 15px;
      padding: 5px;
    }
  `;

  @state() private empleados: Empleado[] = [
    { id: 1, nombre: 'Ana Gómez', departamento: 'Marketing', foto: 'https://agencia-fotografia.com/wp-content/uploads/2014/11/Fotograf%C3%ADa-retrato.jpg' },
    { id: 2, nombre: 'Luis Pérez', departamento: 'Desarrollo', foto: 'https://agencia-fotografia.com/wp-content/uploads/2014/11/Fot%C3%B3grafo-redes-sociales.jpg' },
    { id: 3, nombre: 'Marco López', departamento: 'Desarrollo', foto: 'https://agencia-fotografia.com/wp-content/uploads/2014/11/Fotograf%C3%ADa-para-curriculum.jpg'},
  ];

  @state() private tareasPorEmpleado: Record<number, Tarea[]> = {
    1: [
      { titulo: 'Diseñar campaña A', estado: 'pendiente' },
      { titulo: 'Presentar resultados', estado: 'completada' },
    ],
    2: [
      { titulo: 'Implementar login', estado: 'en progreso' },
      { titulo: 'Escribir tests', estado: 'pendiente' },
    ],
    3: [
      { titulo: 'Refactorizar módulo X', estado: 'pendiente' },
    ],
  };

  @state() private filtroDepartamento: string = 'Todos';

  render() {
    const empleadosFiltrados = this.filtroDepartamento === 'Todos'
      ? this.empleados
      : this.empleados.filter(e => e.departamento === this.filtroDepartamento);

    return html`
      <h2>Gestión de Tareas</h2>
      <label>Filtrar por departamento:
        <select @change=${this._cambiarFiltro}>
          <option>Todos</option>
          <option>Marketing</option>
          <option>Desarrollo</option>
        </select>
      </label>

      ${empleadosFiltrados.map(e =>
        html`<empleado-card
          .empleado=${e}
          .tareas=${this.tareasPorEmpleado[e.id] ?? []}
        ></empleado-card>`
      )}
    `;
  }

  private _cambiarFiltro(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.filtroDepartamento = select.value;
  }
}
