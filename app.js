const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/salvarSelecao', (req, res) => {
  try {
    const { selectedCard, otherData } = req.body;

    const data = {
      selectedCard,
      otherData,
    };

    fs.writeFile('selecoes.json', JSON.stringify(data), (error) => {
      if (error) {
        console.error('Erro ao salvar seleção:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao salvar seleção' });
      } else {
        res.json({ message: 'Seleção salva com sucesso!' });
      }
    });
  } catch (error) {
    console.error('Erro ao salvar seleção:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao salvar seleção' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
