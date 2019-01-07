    const express = require('express');
    const hbs = require('hbs');
    const fs = require('fs');
    const port = process.env.PORT || 3000;
    let app = express();
    app.set('view engine', 'hbs');
    hbs.registerPartials(__dirname + '/partials');
    app.use(express.static(__dirname + '/public'));

    app.use((req, res, next) => {
        let now = new Date().toString();
        let log = `${now}: ${req.method} ${req.url}`;
        fs.appendFile('server.log', log + '\n', (err) => {
            if(err) {
                console.log('Unable to append to server.log');
            }
        });
        next();
    });

    // app.use((req, res, next) => {
    //     res.render('maintenance.hbs');
    // });

    hbs.registerHelper('getCurrentYear', () => {
        return new Date().getFullYear();
    });

    hbs.registerHelper('screamIt', (text) => {
        return text.toUpperCase();
    });

    app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: 'Home Page',
            welcomeMessage: 'Welcome to my Home',
        })
    });

    app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About Page',
        })
    });

    app.get('/bad', (req,res) => {
        res.send({
            error: 'The page that you are looking for is not Available!!!',
            'errorCode': '400'
        })
    });

    app.listen(port, () => {
        console.log(`Server is Up on Port ${port}`);
    });
