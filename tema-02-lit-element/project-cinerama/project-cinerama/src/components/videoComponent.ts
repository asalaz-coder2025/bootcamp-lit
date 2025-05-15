
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import IVideoComponent, { VideoSourceType } from '../interfaces/IVideoComponent';

@customElement('video-preview')
export default class VideoPreview extends LitElement implements IVideoComponent {
  @property({ type: String }) videoName = '';
  @property({ type: String }) videoDescription = '';
  @property({ type: String }) videoDuration = '';
  @property({ type: String }) videoSrc = '';
  @property({ type: String }) videoType: VideoSourceType = 'mp4';

  static styles = css`
    :host {
      display: flex;
      padding: 0;
      border-radius: 1rem;
      position: relative;
    }

    h3 {
      margin: 0 0 0.5rem;
    }

    iframe, video {
      max-width: 100%;
      height: 100%;
      display: flex;
      width: 100%;
      position: absolute;
      z-index: 2;
    }

  `;

  private renderVideo() {
    if (this.videoType === 'youtube') {
      const youtubeUrl = this.transformYouTubeUrl(this.videoSrc);
      return html`<iframe
        width="100%"
        height="100%"
        src=${youtubeUrl}
        frameborder="0"
        allowfullscreen
      ></iframe>`;
    }

    return html`<video controls>
      <source src=${this.videoSrc} type="video/mp4" />
      Tu navegador no soporta videos HTML5.
    </video>`;
  }

  private transformYouTubeUrl(url: string): string {
    
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  }

  render() {
    return html`
      <section>
        <h3>${this.videoName}</h3>
        <p>${this.videoDescription}</p>
        <p>Duración: ${this.videoDuration}</p>
        ${this.renderVideo()}
      </section>
    `;
  }
}
