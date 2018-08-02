const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/shopping_list', (req, res) => { //Kiedy otrzymamy zapytanie o /shopping_list...
    fs.readFile('./data/przykladOdczytZapis/db.json', (err, data) => { //...odczytujemy plik z danymi
        if (!err){ //Jeżeli nie ma błędu
            const shoppingList = JSON.parse(data); //Parsujemy informacje z pliku - ponieważ są tam zapisane w formacie JSON. Następnie je wyświetlami:
            res.send('Lista zakupów: ' + shoppingList.join(', '));
        } else { //Jeżeli był błąd to informujemy użytkownika i wyświetlamy w konsoli szczegóły błędu
            console.log('Błąd odczytu pliku', err);
            res.send('Wystąpił błąd odczytu.');
        }
    });
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});