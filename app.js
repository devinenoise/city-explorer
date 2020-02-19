const express = require('express');
const request = require('superagent');
const app = express();
const darkSky = require('./data/darksky.json');
const port = process.env.PORT || 3000;
const geoData = require('./data/geo.json');

app.get('/weather/', (request, respond) => {
    const weatherData = darkSky.currently;

    respond.json({
        forecast: weatherData.summary,
        time: weatherData.time

    });
});

app.get('/location/', (request, respond) => {
    const cityData = geoData.results[0];

    respond.json(
        {
            formatted_query: cityData.formatted_address,
            latitude: cityData.geometry.location.lat,
            longitude: cityData.geometry.location.lng
        });
});



// has to go into it's own index.js file for testing later
app.listen(port, () => {
    console.log('running.....');

});

app.get('*', (req, res) => res.send('404!!!!!!'));


// module.exports = {
//     app,
//     toLocation,
//     getLatLng
// };
