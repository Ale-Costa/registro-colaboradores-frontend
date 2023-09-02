
export interface Colaborador {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  celular?: number;
  conhecimentos: string[];
  validado?: boolean
}
