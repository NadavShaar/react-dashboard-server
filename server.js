
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const { v1: uuidv1 } = require('uuid');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    app.use(cors());
}

app.use(bodyParser.json());

app.post('/getWidgetData', (req, res) => {
    res.status(200).send(dataPoints);
});

let dataPoints = [
    { label: "WhatsApp Messenger", y: 6828},
    { label: "Facebook Messenger", y: 5589},
    { label: "SHAREit", y: 757},
    { label: "UC Browser", y: 1744},
    { label: "MX Player", y: 638},
    { label: "Hotstar", y: 481},
    { label: "Truecaller", y: 763}
];

let widgets = [
    {
        id: 'dashboard',
        data: null
    }
];


app.post('/getWidgets', (req, res) => {
    const { route } = req.body;

    let widgetsData = widgets.find(wl => wl.id === route);
    return res.send(widgetsData.data);
});

app.post('/setWidgets', (req, res) => {
    const { route, data } = req.body;

    let index = widgets.findIndex(wl => wl.id === route);
    widgets[index].data = data;
    res.sendStatus(200);
});

app.listen( process.env.PORT || 3000 );