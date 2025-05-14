import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {
  static properties = {
    name: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid #ccc;
    }
  `;

  constructor() {
    super();
    this.name = 'Otra cosa';
    console.log('constructor');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('disconnectedCallback');
  }

  shouldUpdate(changedProps) {
    console.log('shouldUpdate', changedProps);
    return true;
  }

  willUpdate(changedProps) {
    console.log('willUpdate', changedProps);
  }

  updated(changedProps) {
    console.log('updated', changedProps);
  }

  render() {
    console.log('render');
    return html`
      <h2>Hello, ${this.name}!</h2>
      <button @click=${this._changeName}>Change Name</button>
    `;
  }

  _changeName() {
    this.name = this.name === 'Otra cosa' ? 'Element' : 'Otra cosa';
  }
}

customElements.define('my-element', MyElement);

