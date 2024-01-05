const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;  
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let horarios = ['07:00', '08:00', '09:00', '10:00'];
const selecoesFilePath = 'selecoes.json';

app.get('/api/horarios', (req, res) => {
  res.json(horarios);
});

app.post('/api/salvarSelecao', async (req, res) => {
  try {
    const { nome, selectedCard, otherData, horario } = req.body;

    if (!nome || !selectedCard || !horario) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const data = {
      nome,
      selectedCard,
      otherData,
      horario,
    };

    await fs.writeFile(selecoesFilePath, JSON.stringify(data));
    console.log('Seleção salva com sucesso!');
    res.json({ message: 'Seleção salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar seleção:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao salvar seleção' });
  }
});

app.post('/api/alterarHorarios', (req, res) => {
  try {
    const { novosHorarios } = req.body;

    if (!novosHorarios || !Array.isArray(novosHorarios)) {
      return res.status(400).json({ error: 'Dados inválidos para alteração de horários' });
    }

    horarios = novosHorarios;

    res.json({ message: 'Horários alterados com sucesso!' });
  } catch (error) {
    console.error('Erro ao alterar horários:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao alterar horários' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
