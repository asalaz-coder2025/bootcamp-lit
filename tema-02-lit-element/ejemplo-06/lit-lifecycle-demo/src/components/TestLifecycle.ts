import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('test-lifecycle-ts')

export default class TestLifecycleTS extends LitElement {
  @property({ type: String, attribute: 'data-message' })
  dataMessage: string = 'Mensaje inicial';

  @property({ type: Number })
  counter: number = 0;

  @property({ type: Boolean, attribute: false })
  _internalFlag: boolean = false;

  @property({ type: Boolean })
  skipUpdate: boolean = false;

  @property({ type: String })
  newMessageInput: string = '';

  static styles = css`
    button {
      padding: 8px 16px;
      border: none;
      margin: 4px 0;
      cursor: pointer;
      font-weight: bold;
    }

    #btn-request-update.skip {
      background-color: #006400;
      color: white;
    }

    #btn-request-update.allow {
      background-color: #90ee90;
      color: black;
    }

    .orange-btn {
      background-color: #ffcc80;
      color: black;
    }

    input[type="text"] {
      padding: 6px;
      margin: 6px 0;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  constructor() {
    super();
    console.log('[constructor - TypeScript]');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('[connectedCallback - TypeScript]');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('[disconnectedCallback - TypeScript]');
  }

  shouldUpdate(changedProps: Map<string | number | symbol, unknown>): boolean {
    console.log('[shouldUpdate - TypeScript]', changedProps);
    return !this.skipUpdate;
  }

  willUpdate(changedProps: Map<string | number | symbol, unknown>) {
    console.log('[willUpdate - TypeScript]', changedProps);
  }

  update(changedProps: Map<string | number | symbol, unknown>) {
    console.log('[update - TypeScript]', changedProps);
    super.update(changedProps);
  }

  updated(changedProps: Map<string | number | symbol, unknown>) {
    console.log('[updated - TypeScript]', changedProps);
  }

  firstUpdated() {
    // requestUpdate
    this.shadowRoot?.getElementById('btn-request-update')?.addEventListener('click', () => {
      console.log('[event] requestUpdate');
      if (!this.skipUpdate) {
        this.applyNewMessage();
      }
      this.requestUpdate();
    });

    // Control de cambios
    this.shadowRoot?.getElementById('toggle-skip-update')?.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.skipUpdate = !target.checked;
      console.log(`[event] skipUpdate = ${this.skipUpdate}`);
    });

    // mensaje personalizado
    this.shadowRoot?.getElementById('btn-set-message')?.addEventListener('click', () => {
      if (this.skipUpdate) {
        console.log('[event] Actualización deshabilitada');
        return; // Evita que el mensaje se cambie si `skipUpdate` está activado.
      }

      const nuevo = 'Mensaje-' + Math.floor(Math.random() * 1000);
      this.dataMessage = nuevo;
      console.log(`[event] Cambio dataMessage = ${nuevo}`);
      this.updateComplete.then(() => {
        console.log('[updateComplete] : actualización terminada');
        alert("Actualización realizada con éxito");
      });
    });
  }

  resetValues() {
    this.counter = 0;
    this._internalFlag = false;
  }

  applyNewMessage() {
    if (this.newMessageInput.trim()) {
      this.dataMessage = this.newMessageInput.trim();
      console.log(`[event] dataMessage actualizado a: "${this.dataMessage}" desde input`);
    }
  }

  incrementar() {
    this.counter++;
    this._internalFlag = !this._internalFlag;
  }

  render() {
    return html`
      <p>Mensaje: ${this.dataMessage}</p>
      <p>Contador: ${this.counter}</p>
      <p>Interno: ${this._internalFlag ? 'Sí' : 'No'}</p>

      <label>
        <input
          type="checkbox"
          .checked=${!this.skipUpdate}
          @change=${(e: Event) => {
            const target = e.target as HTMLInputElement;
            this.skipUpdate = !target.checked;
            console.log(`[event] skipUpdate = ${this.skipUpdate}`);
          }}
        />
        Permitir actualización (shouldUpdate = true)
      </label>
      <br />

      <input
        type="text"
        placeholder="Escribe nuevo mensaje aquí"
        .value="${this.newMessageInput}"
        @input="${(e: Event) => {
          const target = e.target as HTMLInputElement;
          this.newMessageInput = target.value;
        }}"
      />

      <button id="btn-request-update" class="${this.skipUpdate ? 'skip' : 'allow'}">
        Solicitar actualizacion de datos desde Input (Request Update)
      </button>
      <br />

      <button id="btn-set-message" class="orange-btn">Actualizar mi dato personalizado (Autogenerar datos)</button>
      <br />

      <button class="orange-btn" @click="${() => this.incrementar()}">Incrementar contador</button>
    `;
  }
}

customElements.define('test-lifecycle-ts', TestLifecycleTS);

