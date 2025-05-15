 export default interface IReceta {
  id: number;
  vista: String;
  nombre: string;
  ingredientes: string[];
  dificultad: 'Fácil' | 'Media' | 'Difícil';
}
