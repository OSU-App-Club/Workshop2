const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
	res.send(tasks);
});

app.post('/task', (req, res) => {
	const { name } = req.body;
	const id = tasks.length;
	tasks.push({
		id: id,
		name
	});
	res.status(201).send({
		id
	});
});

app.get('/task/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const task = tasks.find((task) => task.id == id);
	res.send(task);
});

app.put('/task/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { name } = req.body;
	const taskIndex = tasks.findIndex((task) => task.id == id);
	tasks[taskIndex].name = name;
	res.status(204).send();
});

app.delete('/task/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const taskIndex = tasks.findIndex((task) => task.id == id);
	tasks.splice(taskIndex, 1);
	res.status(200).send();
});

app.listen(5000, () => {
	console.log('Listening on http://localhost:5000');
});
