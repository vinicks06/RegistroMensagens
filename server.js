const express = require('express');
const { registerLog, findLogById } = require('./script');
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

app.get('/logs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const logEntry = await findLogById(id);
        
        if (!logEntry) {
            return res.status(404).json({ error: 'Log não encontrado' });
        }

        res.json({ log: logEntry });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar log' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});