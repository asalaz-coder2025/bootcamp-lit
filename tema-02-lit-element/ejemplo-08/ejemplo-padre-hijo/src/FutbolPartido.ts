import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('futbol-partido')
export class FutbolPartido extends LitElement {
  static styles = css`
    .partido {
      border: 1px solid #ccc;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
    }
    label {
      margin-right: 10px;
    }
  `;

  @property({ type: Object }) data!: {
    id: number;
    equipo1: string;
    equipo2: string;
    resultado: string;
    fecha: string;
    goles: string[];
  };

  @property({ type: Boolean }) selected = false;

  render() {
    const { equipo1, equipo2, resultado, fecha, goles } = this.data;
    return html`
      <div class="partido">
        <label>
          <input type="checkbox" .checked=${this.selected} @change=${this._onCheck}>
          Seleccionar
        </label>
        <div><strong>${equipo1}</strong> vs <strong>${equipo2}</strong></div>
        <div>Resultado: ${resultado}</div>
        <div>Fecha: ${fecha}</div>
        <div>
          Goles:
          <ul>
            ${goles.map(j => html`<li>${j}</li>`)}
          </ul>
        </div>
      </div>
    `;
  }

  private _onCheck(e: Event) {
    const input = e.target as HTMLInputElement;
    this.dispatchEvent(new CustomEvent('toggle-select', {
      detail: { id: this.data.id, selected: input.checked },
      bubbles: true,
      composed: true
    }));
  }
}
