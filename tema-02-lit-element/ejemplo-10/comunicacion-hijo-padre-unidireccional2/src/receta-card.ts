import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface IReceta {
  id: number;
  vista: string;
  nombre: string;
  ingredientes: string[];
  dificultad: 'Fácil' | 'Media' | 'Difícil';
}


@customElement('receta-card')
export class RecetaCard extends LitElement {
  static styles = css`
    .card {
      border: 1px solid #ccc;
      margin: 8px;
      padding: 10px;
      border-radius: 5px;
    }
    button {
      margin-top: 8px;
    }
  `;

  @property({ type: Object }) receta!: IReceta;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    console.log('receta eliminada');
    alert('receta eliminada');
  }


  render() {
    return html`
      <div class="card">
        <h3>${this.receta.nombre}</h3>
        <p>Dificultad: ${this.receta.dificultad}</p>
        <p>Ingredientes: ${this.receta.ingredientes.join(', ')}</p>
        <button
          data-receta-id="${this.receta.id}"
        >
          Eliminar
        </button>
        <button>Otro boton</button>

       
      </div>
    `;
  }
}
