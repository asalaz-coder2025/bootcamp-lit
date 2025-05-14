class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
 <style>
        :host {
          display: block;
          border: 2px solid black;
          padding: 10px;
          margin: 10px;
          background: lightgray;
        }

        p{
        background: yellow;
        }
      </style>
      <div>
        <p>Componente interno</p>
      </div>
    `;
  }
}
customElements.define('my-card', MyCard);

