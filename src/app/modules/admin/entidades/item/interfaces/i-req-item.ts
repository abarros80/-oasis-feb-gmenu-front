import { UnidadeMedidaEnum } from '../enums/unidade-medida-enum';
export interface IReqItem {
  id: number,
  nomePt: string,
  nomeIng: string,
  nomeFr: string,
  activo: boolean,
  fotoPath: string,
  descPt: string,
  descFr: string,
  descIng: string,
  preco: number
  quantidade: number
  unidadeMedidaEnum: UnidadeMedidaEnum,
  idUser: number,
  tipoItem: string,
  hotel: string,
}
