import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './FutbolPartido';
import IFutbolPartido from './IFutbolPartido';


@customElement('futbol-listado-partido')
export class FutbolListadoPartido extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -30%);
      background: white;
      border: 1px solid #ccc;
      padding: 20px;
      z-index: 1000;
    }
    .overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.5);
    }
    .btns {
      margin-top: 10px;
    }
    button {
      margin: 5px;
    }
  `;

  @state() private partidos: IFutbolPartido[] = [
    {
      id: 1,
      equipo1: 'River',
      equipo2: 'Boca',
      resultado: '2-1',
      fecha: '2025-05-01',
      goles: ['Martínez', 'Gómez', 'Ramírez']
    },
    {
      id: 2,
      equipo1: 'Barcelona',
      equipo2: 'Madrid',
      resultado: '3-2',
      fecha: '2025-04-21',
      goles: ['Pedri', 'Vinícius', 'Lewandowski']
    },
    {
      id: 3,
      equipo1: 'Roma',
      equipo2: 'Gerona',
      resultado: '4-2',
      fecha: '2025-03-18',
      goles: ['Pedri', 'Vinícius', 'Lewandowski']
    }
  ];

  @state() private seleccionados = new Set<number>();
  @state() private mostrarModal = false;

  render() {
    return html`
      <h2>FUTBOL 2025</h2>
      ${this.mostrarModal ? html`
        <div class="overlay" @click=${this._cancelarModal}></div>
        <div class="modal">
          <p>¿Seguro que deseas eliminar los partidos seleccionados?</p>
          <div class="btns">
            <button @click=${this._confirmarEliminacion}>Sí</button>
            <button @click=${this._cancelarModal}>No</button>
          </div>
        </div>
      ` : ''}

      <div class="listado-partidos">
        ${this.partidos.map(p =>
          html`<futbol-partido
            .data=${p}
            .selected=${this.seleccionados.has(p.id)}
            @toggle-select=${this._toggleSeleccion}
          ></futbol-partido>`
        )}
      </div>

      <button @click=${this._abrirModal}>Eliminar seleccionados</button>
    `;
  }

  private _toggleSeleccion(e: CustomEvent<{ id: number; selected: boolean }>) {
    const { id, selected } = e.detail;
    if (selected) {
      this.seleccionados.add(id);
    } else {
      this.seleccionados.delete(id);
    }
    this.requestUpdate();
  }

  private _abrirModal() {
    if (this.seleccionados.size > 0) {
      this.mostrarModal = true;
    }
  }

  private _cancelarModal() {
    this.mostrarModal = false;
  }

  private _confirmarEliminacion() {
    this.partidos = this.partidos.filter(p => !this.seleccionados.has(p.id));
    this.seleccionados.clear();
    this.mostrarModal = false;
    this.requestUpdate();
  }
}

