const { app } = require('./app.js');
const port = process.env.PORT || 3000;

// has to go into it's own index.js file for testing later
app.listen(port, () => {
    console.log('<-----------blast off!---------------->');

});
