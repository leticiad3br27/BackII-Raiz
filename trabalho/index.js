import express from 'express';
import { obterHistoricoCompleto, filtrarPorAno, calcularMediaAnual, calcularReajuste } from './servico/servicos.js';

const app = express();
const port = 8080;

app.get('/historicoIPCA', (req, res) => {
  try {
    const dados = obterHistoricoCompleto();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/historicoIPCA/:ano', (req, res) => {
  try {
    const ano = parseInt(req.params.ano, 10);
    const resultado = filtrarPorAno(ano);
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/mediaAnual/:ano', (req, res) => {
  try {
    const ano = parseInt(req.params.ano, 10);
    const media = calcularMediaAnual(ano);
    res.json({ ano, media });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/calcularReajuste', (req, res) => {
  try {
    const { valor, mesInicial, anoInicial, mesFinal, anoFinal } = req.query;
    const valorInicial = parseFloat(valor);
    const dados = obterHistoricoCompleto();
    const valorReajustado = calcularReajuste(valorInicial, mesInicial, anoInicial, mesFinal, anoFinal, dados);
    res.json({
      valorInicial: valorInicial.toFixed(2),
      valorReajustado,
      periodo: `${mesInicial}/${anoInicial} a ${mesFinal}/${anoFinal}`
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
