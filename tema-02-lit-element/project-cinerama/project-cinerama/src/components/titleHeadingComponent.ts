
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('title-heading-component')
export default class TitleHeadingComponent extends LitElement {
    @property({ type: String, attribute: 'text-content'}) titleHeadingText: String= 'Awesome Ttile!';


    constructor() {
        super();
    }


    static styles = css`
    :host {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .generic-title{
    color: #D6D7DA;
    font: 900 60px / 1.0666 "Montserrat", sans-serif;
    }


    @media screen and (max-width: 768px){
        .generic-title{ max-width: 160px}
    }
  `;


    render() {
        return html`
      <h2 class='generic-title'>${this.titleHeadingText}</h2>`;
    }
}
   
   
  