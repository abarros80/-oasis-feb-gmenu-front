export class Conjunto {

  id?: number;
  nome: string = '';
  activo: boolean = true;
  ordem?: number;

  tipoConjunto_id?: number;
  tipoConjunto?: string = '';

  pai_id?: number;
  pai?: Conjunto;

  userCadastro_id?: number;
  userCadastro?: string = '';

  //Descrição
	descPt: string = '';
  descIng: string = '';
	descFr: string = '';


  //Path foto
  fotoPath?: string = '';

}
