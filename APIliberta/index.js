import express from 'express';
import cors from 'cors'; 
import { 
  retornaCampeonatos,
  retornaCampeonatosID,
  retornaCampeonatosAno,
  retornaCampeonatosTime
} from './servico/retornaCampeonatos_servico.js';
import { cadastraCampeonato } from './servico/cadastroCampeonato_servico.js';
import { atualizaCampeonato } from './servico/atualizaCampeonato.js';
const app = express();
app.use(cors());
app.use(express.json());


app.put('/campeonatos/:id', async (req,res) => {
  const{id} = req.params;
  const {campeao, vice, ano} = req.body;

  if (campeao == undefined ||  vice == undefined || ano == undefined) {
      res.status(400).send('Todos os campos devem ser preenchidos!')
  } else {
      const resultado = await atualizaCampeonato(id, campeao, vice, ano);
      if (resultado.affectedRows > 0) {
          res.status(202).send('Registro atualizado com sucesso!')
          
      } else {
          res.status(400).send('Registro não encontrado!')
          
      }

      
  }

})

app.post('/campeonatos', async (req,res) =>{
    const campeao= req.body.campeao;
    const vice = req.body.vice;
    const ano = req.body.ano;
    await cadastraCampeonato(campeao,vice,ano);
    res.status(204).send({"mensagem":"cadastro efetivado com sucesso!"})
})

app.get('/campeonatos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const campeonato = await retornaCampeonatosID(id);
  if (!campeonato || campeonato.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum campeonato encontrado" });
  }

  res.json(campeonato);
});

app.get('/campeonatos', async (req, res) => {
  const { ano, time } = req.query;
  let campeonatos;

  if (ano) {
    campeonatos = await retornaCampeonatosAno(ano);
  } else if (time) {
    campeonatos = await retornaCampeonatosTime(time);
  } else {
    campeonatos = await retornaCampeonatos();
  }

  if (!campeonatos || campeonatos.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum campeonato encontrado" });
  }

  res.json(campeonatos);
});

app.listen(9000, () => {
  console.log("Servidor node iniciado na porta 9000");
});