const path = require('path')
const express = require('express');
const hbs  = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.get('', (req,res)=>{
    //res.send('hello express')
    res.render('weather',{
        title: 'My App',
        name: 'Ayushi Grover'
    })
})

app.get('/help', (req,res)=>{
    res.send([
        {name:'Ayushi'},
        {name: 'Grover'}
    ])
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Ayushi Grover'
    })
    console.log(req.query)
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        res.render('Error',{
            title: 'Error page',
        })
    }else{
        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return console.log(error)
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
    
               res.send({
                    title: 'Weather',
                    description: forecastData,
                    address: req.query.address
                })

            })
        })
    }
})

app.get('/about/*', (req,res)=>{
    // res.send('My 404 Pagesss')
    res.render('Error',{
        title: 'Error page',
        name: 'Ayushi Grover'
    })
})
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

app.use(express.static(path.join(__dirname,'../public')))

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})