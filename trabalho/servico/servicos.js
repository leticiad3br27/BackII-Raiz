import historicoInflacao from '../dados/dados.js';

export function obterHistoricoCompleto() {
    return historicoInflacao;
}

export function filtrarPorAno(ano) {
    if (!ano || isNaN(ano)) {
        throw new Error('Ano inválido.');
    }
    return historicoInflacao.filter(dado => dado.ano === ano);
}

export function calcularMediaAnual(ano) {
    const dadosAno = filtrarPorAno(ano);
    if (dadosAno.length === 0) {
        throw new Error('Nenhum dado encontrado para o ano especificado.');
    }
    const soma = dadosAno.reduce((acc, dado) => acc + dado.ipca, 0);
    return (soma / dadosAno.length).toFixed(2);
}

export function calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal, dados) {
    if (!valor || isNaN(valor) || valor <= 0) {
        throw new Error('Valor inválido.');
    }
    if (!mesInicial || !anoInicial || !mesFinal || !anoFinal) {
        throw new Error('Parâmetros de data insuficientes.');
    }

    const ipcaInicial = dados.find(dado => dado.ano === anoInicial && dado.mes === mesInicial);
    const ipcaFinal = dados.find(dado => dado.ano === anoFinal && dado.mes === mesFinal);

    if (!ipcaInicial || !ipcaFinal) {
        throw new Error('Dados de IPCA não encontrados para as datas especificadas.');
    }

    const ipcaTotal = dados
        .filter(dado => 
            (dado.ano > anoInicial || (dado.ano === anoInicial && dado.mes >= mesInicial)) &&
            (dado.ano < anoFinal || (dado.ano === anoFinal && dado.mes <= mesFinal))
        )
        .reduce((acc, dado) => acc + dado.ipca, 0);

    const valorReajustado = valor * (1 + ipcaTotal / 100);
    return valorReajustado.toFixed(2);
}
