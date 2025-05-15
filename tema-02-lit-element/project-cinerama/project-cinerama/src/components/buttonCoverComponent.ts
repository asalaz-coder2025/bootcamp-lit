
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import IButtonComponent, { buttonModel } from '../interfaces/IButtonComponent';

@customElement('button-component')
export default class ButtonComponent extends LitElement implements IButtonComponent {
    @property({ type: String, attribute: 'type-button' }) buttonType: buttonModel = 'primary';
    @property({ type: String, attribute: 'text-content'}) buttonText: String= 'Awesome Button!';

    constructor() {
        super();
    }


    static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .red-button {
        background: #E50246;
    }

    .blue-button {
        background-color: #0050B2;
    }

    .generic-button{
        border-radius: 999px;
        padding: 0.3125em;
        appearance: none;
        border: none;
        width: 100%;
        min-width: 160px;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        min-height: 33px;
        font-size: 12px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        cursor: pointer;
        transition: 0.5s all ease;
    }

    .red-button:hover{
        background: #f03f74;
    }

    .blue-button:hover{
        background: #2b7ada;
    }

    @media screen and (max-width: 768px){
        .generic-button{ max-width: 160px}
    }
  `;

    _doSomethig() {
        alert('interactive UI button!');
    }

    render() {
        return html`
      <button class='generic-button ${this.buttonType === 'primary' ? 'red-button' : 'blue-button'}' @click=${this._doSomethig}>${this.buttonText}</button>`;
    }
}