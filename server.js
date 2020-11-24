var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var owners = [
	{
		id: 1,
		name: "Adam",
		pets: [
			{
				id: 1,
				name: "Vera",
				type: "Dog",
			},
			{
				id: 2,
				name: "Felix",
				type: "Cat",
			},
		],
	},
	{
		id: 2,
		name: "Kamilah",
		pets: [
			{
				id: 1,
				name: "Doug",
				type: "Dog",
			},
		],
	},
];

// GET /api/owners
app.get("/api/owners", (req, res) => {
	res.send(owners);
});

// GET /api/owners/:id
app.get("/api/owners/:id", (req, res) => {
	const id = req.params.id;
	const owner = owners.find(owner => owner.id === Number(id));
	res.send(owner);
});

// POST /api/owners
app.post("/api/owners", (req, res) => {
	owners.push({
		id: req.body.id,
		name: req.body.name,
		pets: req.body.pets,
	});
	res.send(owners);
});

// PUT /api/owners/:id
app.put("/api/owners/:id", (req, res) => {
	const id = req.params.id;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	owners[ownerIndex] = {...owners[ownerIndex], ...req.body};
	res.send(owners[ownerIndex]);
});

// DELETE /api/owners/:id
app.delete("/api/owners/:id", (req, res) => {
	const id = req.params.id;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	owners.splice(ownerIndex, 1);
	res.send(owners);
});

// GET /api/owners/:id/pets
app.get("/api/owners/:id/pets", (req, res) => {
	const id = req.params.id;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	res.send(owners[ownerIndex].pets);
});

// GET /api/owners/:id/pets/:petId
app.get("/api/owners/:id/pets/:petId", (req, res) => {
	const id = req.params.id;
	const petId = req.params.petId;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	const petIndex = owners[ownerIndex].pets.findIndex(pet => pet.id === Number(petId));
	res.send(owners[ownerIndex].pets[petIndex]);
});

// POST /api/owners/:id/pets
app.post("/api/owners/:id/pets", (req, res) => {
	const id = req.params.id;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	owners[ownerIndex].pets.push({
		id: req.body.id,
		name: req.body.name,
		type: req.body.type,
	});
	res.send(owners[ownerIndex]);
});

// PUT /api/owners/:id/pets/:petId
app.put("/api/owners/:id/pets/:petId", (req, res) => {
	const id = req.params.id;
	const petId = req.params.petId;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	const petIndex = owners[ownerIndex].pets.findIndex(pet => pet.id === Number(petId));
	owners[ownerIndex].pets[petIndex] = {...owners[ownerIndex].pets[petIndex], ...req.body};
	res.send(owners[ownerIndex]);
});

// DELETE /api/owners/:id/pets/:petId
app.delete("/api/owners/:id/pets/:petId", (req, res) => {
	const id = req.params.id;
	const petId = req.params.petId;
	const ownerIndex = owners.findIndex(owner => owner.id === Number(id));
	const petIndex = owners[ownerIndex].pets.findIndex(pet => pet.id === Number(petId));
	owners[ownerIndex].pets.splice(petIndex, 1);
	res.send(owners[ownerIndex]);
});

app.listen(3001, function () {
	console.log("Pets API is now listening on port 3001...");
});
