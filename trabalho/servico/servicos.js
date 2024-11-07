import  historicoInflacao  from '../Dados/dados.js';
//retorna toda a coleção
export const buscaHist = () => {
    return historicoInflacao;}

 //A segunda rota da API deve retornar um histórico de dados da coleção, referente a um ano específico.
 export const buscarPorAno = (ano) => {
    return historicoInflacao.filter(item => item.ano === ano);
};
export const buscarPorId = (id) => {
    const idHT = parseInt(id);
    return historicoInflacao.find(item => item.id === idHT);
  };