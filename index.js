const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let persons = [
  {
    name: "Carlos Osorio",
    number: "67890",
    id: 1,
  },
  {
    name: "Valeria Brito",
    number: "345547",
    id: 2,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons)
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(204).send("That page does not exist.").end();
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const status404 = (text) => {
    return res.status(400).json({
      error: `${text} is missing`,
    });
  };

  if (!body) {
    status404("content");
  } else if (!body.name) {
    status404("name");
  } else if (!body.number) {
    status404("number");
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((p) => p.id !== id);
  console.log(persons);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
