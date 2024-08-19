const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { key, value } = req.body;

    // Chemin vers le fichier JS
    const filePath = path.join(__dirname, 'data.js');

    // Contenu à ajouter au fichier JS
    const content = `const data = { "${key}": "${value}" };\n`;

    // Écrire le contenu dans le fichier JS
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.error('Erreur d\'écriture dans le fichier:', err);
            return res.status(500).send('Erreur d\'écriture dans le fichier.');
        }
        res.send('Données enregistrées avec succès.');
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
