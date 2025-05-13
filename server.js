const express = require('express');
const { registerLog } = require('./script');
const app = express();

app.use(express.json());

app.post('/logs', async (req, res) => {
    try {
        const { studentName } = req.body;
        if (!studentName) {
            return res.status(400).json({ error: 'Nome do aluno é obrigatório' });
        }

        const id = await registerLog(studentName);
        res.status(201).json({ 
            message: 'Log registrado com sucesso',
            id
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar log' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});