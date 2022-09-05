import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
export interface IRestaurante {
  id: number;
  nome: string;
  telefone: string;
  numeroInterno: string;
  horario: string;
  imagemCapa: string;
  activo: boolean;

  log: ILog;
  _links: {
    self: { href: string };
    restaurante: { href: string };
    hotel: { href: string };
    restauranteCardapio: { href: string };
  };
}
