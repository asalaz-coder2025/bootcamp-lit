
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import IImageCoverComponent from '../interfaces/IImageCoverComponent';

@customElement('image-cover-component')
export default class ImageCoverComponent extends LitElement implements IImageCoverComponent {
  @property({ type: String }) imageDescription = '';
  @property({ type: String, attribute: 'image-source' }) imageSrc = '';
  @property({ type: Number }) imageHeight = 0;
  @property({ type: Number }) imageWidth = 0;


  constructor() {
    super();
    this.imageHeight = 720;
    this.imageWidth = 405;
  }

  static styles = css`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    figure{
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
        height: auto;
    }
  `;


  private renderCover() {
    return html`
      <img alt=${this.imageDescription} src=${this.imageSrc} />`;
  }


  render() {
    return html`
      <figure>
        ${this.renderCover()}
      </figure>
    `;
  }
}