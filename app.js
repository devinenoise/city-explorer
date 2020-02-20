require('dotenv').config();
const express = require('express');
const request = require('superagent');
const app = express();

const cors = require('cors');
app.use(cors());

let lat;
let lng;

// location route
app.get('/location', async (req, res) => {
    try {

        const location = req.query.search;
        const URL = (`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}=${location}&format=json`);
        const cityData = await request.get(URL);

        const firstResult = cityData.body[0];

        // update the state of the lat and long
        lat = firstResult.lat;
        lng = firstResult.lon;

        res.json(
            {
                formatted_query: firstResult.display_name,
                latitude: lat,
                longitude: lng
            });
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

// weather route
app.get('/weather', async (req, res) => {
    try {

        const portlandWeather = await getWeatherData(lat, lng);

        res.json(portlandWeather);

    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/reviews', async (req, res) => {
    try {

        const yelp = await request
            .get(`https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lng}`)
            .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);

        const yelpStuff = yelp.body.businesses.map(business => {
            return {
                name: business.name,
                image: business.image_url,
                price: business.price,
                rating: business.rating,
                url: business.url,
            };
        });

        res.json(yelpStuff);

    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/events', async (req, res) => {
    try {

        const eventful = await request
            .get(`http://api.eventful.com/json/events/search?app_key=${process.env.EVENTBRITE_API_KEY}&where=${lat},${lng}&within=25`);

        const body = JSON.parse(eventful.text);
        const eventStuff = body.events.event.map(event => {
            return {
                link: event.url,
                name: event.title,
                date: event.start_time,
                summary: event.description,
            };
        });

        res.json(eventStuff);

    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/trails', async (req, res) => {
    try {

        const trails = await request
            .get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${process.env.TRAIL_API_KEY}`);


        // const body = JSON.parse(eventful.text);
        const trailStuff = trails.body.trails.map(trail => {
            return {
                name: trail.name,
                location: trail.location,
                length: trail.length,
                stars: trail.stars,
                star_votes: trail.starVotes,
                summary: trail.summary,
                trail_url: trail.url,
                conditions: trail.conditionStatus,
                condition_date: trail.conditionDate.substring(0, 10),
                condition_time: trail.conditionDate.substring(10),
            };
        });
        console.log(trails);
        res.json(trailStuff);

    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});



// function to map through the weather data based on latitude and longitude coordinates
const getWeatherData = async (lat, lng) => {
    const URL = (`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`);
    const weather = await request.get(URL);

    return weather.body.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000)
        };
    });
};


// 404 catch all
app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));


module.exports = {
    app, };
