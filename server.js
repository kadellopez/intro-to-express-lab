const express = require('express')
const app = express()

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/', (req, res) => {
    res.send('Hello, World!');
  })

  app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    const greeting = `Hello there, ${username}!`
    res.send(greeting)
});

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
      res.send("No potato for you!");
    } else {
      const roll = Math.floor(Math.random() * (number + 1));
      res.send(`You rolled a ${roll}.`);
    }
  })

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index >= collectibles.length) {
      res.send("This item is not yet in stock. Check back soon!");
    } else {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
  })

  app.get('/shoes', (req, res) => {
    let filteredShoes = shoes
  
    const minPrice = parseFloat(req.query['min-price'])
    const maxPrice = parseFloat(req.query['max-price'])
    const type = req.query.type
  
    if (!isNaN(minPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice)
    }
  
    if (!isNaN(maxPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice)
    }
  
    if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }
    res.send(filteredShoes)
  })
  
 
app.listen(3000)