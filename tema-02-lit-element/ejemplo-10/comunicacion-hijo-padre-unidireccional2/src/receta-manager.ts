import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './receta-card';

interface IReceta {
  id: number;
  vista: string;
  nombre: string;
  ingredientes: string[];
  dificultad: 'Fácil' | 'Media' | 'Difícil';
}

@customElement('receta-manager')
export class RecetaManager extends LitElement {
  static styles = css``;

  @state() private recetas: IReceta[] = [
   { id: 1, vista: 'https://www.recetasnestle.com.pe/sites/default/files/styles/cropped_recipe_card_new/public/srh_recipes/02d772e59776b9b3566382bbf306f795.jpg.webp?itok=enoy-P6p', nombre: 'Estofado de Pollo', ingredientes: ['huevo', 'patata', 'cebolla'], dificultad: 'Media' },
    { id: 2, vista: 'https://www.recetasnestle.com.pe/sites/default/files/styles/cropped_recipe_card_new/public/srh_recipes/81769e73a80e0a1625b9fad624c5a595.jpg.webp?itok=eXNEJe6Y', nombre: 'Arroz con Pollo', ingredientes: ['lechuga', 'pollo', 'queso'], dificultad: 'Fácil' },
    { id: 3, vista: 'https://www.recetasnestle.com.pe/sites/default/files/styles/cropped_recipe_card_new/public/srh_recipes/535186920a8b142c9d521f8e9390fedd.jpg.webp?itok=VaXl1HYp' ,nombre: 'Ají de Gallina', ingredientes: ['arroz', 'mariscos', 'azafrán'], dificultad: 'Difícil' }
  ];


    
    // delegacion de eventos: solo se afecta a boton data-receta-id
    private onClick(e: Event) {
    const target = e.composedPath()[0] as HTMLElement;
    if (target.tagName === 'BUTTON' && target.hasAttribute('data-receta-id')) {
        const id = Number(target.getAttribute('data-receta-id'));
        this.recetas = this.recetas.filter(r => r.id !== id);
    }
    }

  render() {
    return html`
      <h2>Recetas de cocina</h2>
      <div>
        ${this.recetas.map(receta => html`
            <receta-card .receta=${receta} @click=${this.onClick}></receta-card>
            
        `)}
      </div>
    `;
  }
}
