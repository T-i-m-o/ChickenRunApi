const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let id = 0;
let chickens = [];

function chickenObj(name, weight){
                this.id = id,
                this.name = name,
                this.birthday = "",
                this.weight = weight,
                this.steps = 0,
                this.isRunning = false
              }

//Gets all the chickens
app.get('/chicken', (req, res) => {
  res.send(chickens);
});

//Gets a specific chicken using its ID
app.get('/chicken/:id', (req, res) => {
  const chicken = chickens.find(c => c.id === parseInt(req.params.id));
  if (!chicken)
    return res.status(404).send('The chicken with the given ID was not found.\n');
  res.send(chicken);
});

//Adds a new chicken to the list
app.post('/chicken', (req, res) => {
  if (!req.body.name || !req.body.weight)
    return res.status(400).send('Name and weight are required\n');

  const chicken = new chickenObj();
  chicken.id = id;
  id += 1;
  chicken.name = req.body.name;
  if (req.body.birthday)
    chicken.birthday = req.body.birthday;
  chicken.weight = req.body.weight;
  chickens.push(chicken);
  res.send(chicken);
});

//Increments the steps of all the chickens by 1 using the webservice /chicken/run
app.post('/chicken/run', (req, res) => {
            let output = chickens.forEach(c => {c.steps += 1; c.isRunning = true});
            res.send(output)
        });

//Modifies all the values of a chicken that is already in the list
app.put('/chicken/:id', (req, res) => {
  const chicken = chickens.find(c => c.id === parseInt(req.params.id));
  if (!chicken)
    return res.status(404).send('The chicken with the given ID was not found.\n');

  if (!req.body.name || !req.body.weight)
    return res.status(400).send('Name and weight are required\n');
  chicken.name = req.body.name;
  if (req.body.birthday)
    chicken.birthday = req.body.birthday;
  chicken.weight = req.body.weight;
  res.send(chicken);
});

//Deletes all the chickens from the list
app.delete('/chicken', (req, res) => {
  chickens.splice(0, chickens.length)
  res.send();
});

//Deletes the specified chicken using its ID
app.delete('/chicken/:id', (req, res) => {
  const chicken = chickens.find(c => c.id === parseInt(req.params.id));
  if (!chicken)
    return res.status(404).send('The chicken with the given ID was not found.\n');

  const index = chickens.indexOf(chicken);
  chickens.splice(index, 1);

  res.send(chicken);
});

//Modifies only specified values from the body of a given chicken
app.patch('/chicken/:id', (req, res) => {
  const chicken = chickens.find(c => c.id === parseInt(req.params.id));
  if (!chicken)
    return res.status(404).send('The chicken with the given ID was not found.\n');

  chicken.weight = req.body.weight;
  if (req.body.name)
    chicken.name = req.body.name;
  if (req.body.birthday)
    chicken.birthday = req.body.birthday;
  if (req.body.weight)
    chicken.weight = req.body.weight;
  res.send(chicken);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));