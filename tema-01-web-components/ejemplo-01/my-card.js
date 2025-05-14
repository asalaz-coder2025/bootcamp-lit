
// clase de Javascript: herencia de HTMLElement
class MyCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 1rem;
            padding: 20px;
            background: yellow;
          }

          span{
            border: 1px solid #000;
            background: #bbb040;
            width: 100%;
            display: flex;
            box-sizing: border-box;
            text-align: center;
            padding: 10px;
          }

          label{
            padding: 80px;
            text-decoration: none;
            font-weight: 900;
            width: 100%;
            display: flex;
            box-sizing: border-box;
            text-transform: uppercase;
          }

          /* corrigiendo la excepcion de forma interna: mediante una regla de mayor especificidad ( !important) */

          
        ::slotted(h2) {
          color: blue;
          font-size: 1.5rem;
          background: orange !important;
        }
        ::slotted(p) {
          color: gray;
          background: skyblue !important;
        }

          :host{
            background: blue;
            padding: 20px;
            width: 100%;
            height: auto;
            display: flex;
          }

        </style>
        <div class="card">
          <slot name="title">Título predeterminado</slot>
          <slot name="content">Contenido predeterminado</slot>
          <label>Texto de prueba</label>
          <span>Otro texto</span>
        </div>
      `;
    }
  }
  // elemento personalizado: registro de componente
  customElements.define('my-card', MyCard);
  