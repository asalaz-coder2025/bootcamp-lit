import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class TestLifecycleJS extends LitElement {
  static properties = {
    dataMessage: { type: String, attribute: 'data-message' },
    counter: { type: Number },
    _internalFlag: { type: Boolean, attribute: false },
    skipUpdate: { type: Boolean },
    newMessageInput: { type: String },
  };

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
    this.dataMessage = 'Mensaje inicial';
    this.counter = 0;
    this._internalFlag = false;
    this.skipUpdate = false;
    this.newMessageInput = '';
    console.log('[constructor - JS]');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('[connectedCallback - JS]');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('[disconnectedCallback - JS]');
  }

  shouldUpdate(changedProps) {
    console.log('[shouldUpdate - JS]', changedProps);
    return !this.skipUpdate;
  }

  willUpdate(changedProps) {
    console.log('[willUpdate - JS]', changedProps);
  }

  update(changedProps) {
    console.log('[update - JS]', changedProps);
    super.update(changedProps);
  }

  updated(changedProps) {
    console.log('[updated - JS]', changedProps);
  }

  firstUpdated() {
    // requestUpdate
    this.shadowRoot.getElementById('btn-request-update')?.addEventListener('click', () => {
      console.log('[event] requestUpdate');
      if (!this.skipUpdate) {
        this.applyNewMessage();
      }
     // this.resetValues();
      this.requestUpdate();
    });

    // Control de cambios
    this.shadowRoot.getElementById('toggle-skip-update')?.addEventListener('change', (e) => {
      this.skipUpdate = !e.target.checked;
      console.log(`[event] skipUpdate = ${this.skipUpdate}`);
    });

    //mensaje personalizado
this.shadowRoot.getElementById('btn-set-message')?.addEventListener('click', () => {
  if (this.skipUpdate) {
    console.log('[event] Actualización deshabilitada');
    return;  // 
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
  @change=${(e) => {
    this.skipUpdate = !e.target.checked;
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
        @input="${(e) => (this.newMessageInput = e.target.value)}"
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

customElements.define('test-lifecycle-js', TestLifecycleJS);
