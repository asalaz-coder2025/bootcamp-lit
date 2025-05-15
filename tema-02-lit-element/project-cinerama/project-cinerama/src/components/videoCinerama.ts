
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('video-cinerama')
export default class videoCinerama extends LitElement {
    someOther: number;
    @property({ type: String, attribute: 'src-image' }) imageSrc: any;
    @property({ type: Boolean, attribute: 'show-preview'}) showPreviewFlag: Boolean = false;

    static styles = css`
    :host {
        background: #000;
        position: relative;
        width: 100%;
        max-width: 405px;
        display: flex;
        transition: 0.5s all ease;
        border: 2px solid #05050500;
    }

    :host:hover{
        border: 0px soiid #000;
    }

    .buttons-container{
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 24px;
        flex-direction: row;
        padding: 20px;
    }

    @media screen and (max-width: 768px){
       .buttons-container{ flex-direction: column; gap: 16px; justify-content: center}
    }

    .layer{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        background: #05050500;
        transition: 0.5s all ease;
    }

    .layer:hover{
      background: #05050566;
    }
    button-component{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    article{
        display: flex;
        position: relative;
    }
  `;

    renderImage() {
        return html`<image-cover-component image-source=${this.imageSrc}></image-cover-component>`
    }

    _showCover(){

    }
    _showPreview(){

    }

    render() {
        return html`
    <article>
        <div class="layer">
            <div class="buttons-container">
                <button-component type-button="primary" text-content="Comprar"></button-component>
                <button-component type-button="secondary" text-content="Ver Detalles"></button-component>                
            </div>
        </div>
        ${this.showPreviewFlag ? this._showPreview(): this._showCover()}
        ${this.renderImage()}
    </article>
    `;
    }
}