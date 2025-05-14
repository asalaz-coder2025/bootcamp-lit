
//estructura de POO: Herencia de la Clase HTMLElement
export default class TestLifecycle extends HTMLElement {
  static css = ''; 

  
  //declaracion de atributos: estos atributos seran reconocido por los metodos setAttribute y getAttribute de Javascript
  static get observedAttributes() {
    return ['data-message', 'custom-bgcolor'];
  }

  //constructor: permite inicializar variables y acceder a los metodos de la clase padre con super y usar de forma apropiada this.
  constructor() {
    super();
    console.log('initializing the lifecycle component');
    this.myconnectedcolor = "yellow";
    this.mycomponentbg = "purple";
    this.button = null;

    this.setAttribute('data-message', 'initial-value');
    this.setAttribute('custom-bgcolor', this.mycomponentbg);

    // attachShadow es el metodo que nos permitira acceder al ShadowRoot o Nodo Raiz del ShadowDOM del Componente Web creado.
    this.attachShadow({ mode: 'open' });
  }

  // metodo del ciclo de vida del web component: se dispara al insertar el insertar el elemento personalizado dentro DOM
  async connectedCallback() {
    if (TestLifecycle.css === '') {
      TestLifecycle.css = await this.loadCSS();
    }
    this.render();
    console.log('DOM: The element has been connected');
    document.body.style.background = this.myconnectedcolor;
    console.log(this.getTotalConnected());
    this.button = this.shadowRoot.querySelector('#inner-link');

    if (this.button) {
      this.button.addEventListener('click', this.handleLinkClick);
    }
  }

  // metodo del ciclo de vida del web component : se dispara al remover el elemento web personalizado del DOM
  disconnectedCallback() {
    console.log('DOM: The component has been disconnected');
    document.body.style.background = 'red';

    if (this.button) {
      this.button.removeEventListener('click', this.handleLinkClick);
    }

    console.log(this.getTotalConnected());
  }

  //metodo de ciclo de vida del web component : e dispara al cambiar valores de los atributos del elemento web 
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`This attribute '${name}' changed to '${oldValue}' a '${newValue}'`);

    if (name === 'data-message' && this.button) {
      this.button.textContent = newValue;
    }
  }

  // carga asincrona de estilos externos (via url);
  async loadCSS() {
    try {
      const cssText = await fetch('./test-lifecycle.css').then(r => r.text());
      return `<style>${cssText}</style>`;
    } catch (error) {
      console.error('Error loading CSS:', error);
      return '';
    }
  }

  // metodo personalizado para la representacion visual del componente (no es parte del estandar web components)
  render() {
    
    this.shadowRoot.innerHTML = `
      ${TestLifecycle.css}
      <style>
      :host {
        background: ${this.getAttribute('custom-bgcolor')} !important  /*  getter de atributo */;
      }
      </style>
      <p>Welcome to my component</p>
      <button class="mylink" id="inner-link" data="${this._uniqueId}">${this.getAttribute('data-message')}</button>
    `;
  }

  generateAttributeValue() {
    return 'mensaje-' + Math.floor(Math.random() * 1000);
  }

  getTotalConnected() {
    return `Elements Lifecycle Total: ${document.querySelectorAll('test-lifecycle').length}`;
  }

  // metodo personalizado: asociado al evento click para forzar el cambio de valor en un atributo y por tanto disparar el attributeChangedCallback
  handleLinkClick = (e) => {
    e.preventDefault();
    console.log('Click inside my component: update event --> changing attribute and then text value');
    const newValue = this.generateAttributeValue();
    this.setAttribute('data-message', newValue); // setter de atributo
  }
}
