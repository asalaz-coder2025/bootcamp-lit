class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const title = this.getAttribute('title') || 'Título predeterminado';
    const content = this.getAttribute('content') || 'Contenido predeterminado';

    shadow.innerHTML = `
        <style>
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 1rem;
            padding: 20px;
            background: yellow;
          }
          h2 {
            margin: 0;
            background: grey;
          }
          /* el host siempre esta expuesto solo un nivel mayor de espeficidad pueda sobreescribirlo*/
          :host{
            background: blue !important;
          }
        </style>
      <div class="card">
        <h2>${title}</h2>
        <span>${content}</span>
      </div>
    `;
  }
}
customElements.define('my-card', MyCard);
