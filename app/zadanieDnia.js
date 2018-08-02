const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(express.static('./public/zadanieDnia/'));

app.get('/', (req, res) => {
    fs.readFile('./public/zadanieDnia/', (err, data) => {
        if (!err){
            const shoppingList = JSON.parse(data);
            shoppingList.push('Lorem ipsum');
            const jsonToWrite = JSON.stringify(shoppingList);

            fs.writeFile('./public/zadanieDnia/', jsonToWrite, (err, data) => {//Zapisz plik
                if (!err) {
                    res.send('Dodano.');
                } else {
                    console.log('Błąd zapisu pliku', err);
                    res.send('Wystąpił błąd zapisu.');
                }
            });
        } else {
            console.log('Błąd odczytu pliku', err);
            res.send('Wystąpił błąd odczytu.');
        }
    });
});


app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});