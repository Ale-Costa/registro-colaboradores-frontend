export namespace TransformarParametro{
 export function transformarNomeParaParametroRota(input: string): string {
    const parametroSemEspacos = input.replace(/\s+/g, '-');
    return parametroSemEspacos;
  }

  //Transforma parametro da rota para nome do colaborador
  export function transformarParaNomeLegivel(input: string): string {
    const nomeComHifen = input.split('-');
    const primeiraLetraMaiuscula = nomeComHifen.map((nome)=> nome.charAt(0).toUpperCase() + nome.slice(1));
    const nomeCompleto = primeiraLetraMaiuscula.join(' ');

    return nomeCompleto;
  }
}
