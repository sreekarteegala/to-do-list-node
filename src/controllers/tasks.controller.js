const { Tasks } = require('../models')

exports.create = (req, res) => {
    const keys = Object.keys(req.body);

    if (!keys.includes("name") || !keys.includes("description")) {
        res.status(400).send("Missing task name or description");
    }

    const task = new Tasks({
        "name": req.body.name,
        "description": req.body.description || null,
        "userId": req.user.userId
    });

    task.save(task)
        .then(data => res.status(201).json(data))
        .catch(err =>
            res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            })
        )
}

exports.findAll = (req, res) => {
    Tasks.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            })
        })
}

exports.findById = (req, res) => {
    const id = req.params.id;

    Tasks.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Task Not Fount With id=${id}.`
                });
            }
            else res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while getting task details."
            })
        })
}

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;

    Tasks.find({ userId })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Task Not Fount With id=${id}.`
                });
            }
            else res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while getting task details."
            })
        })
}

exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    };

    const task = {}

    if (req.body.name) task["name"] = req.body.name;
    if (req.body.description) task["description"] = req.body.description || null;
    if (req.body.completed) task["completed"] = req.bosy.completed

    Tasks.findByIdAndUpdate(req.params.id, task, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found!`
                });
            } else res.send({ message: "Task was updated successfully." });
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while updating the Task."
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Tasks.findOneAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found!`
                });
            } else res.send({ message: "Task Removed successfully." });
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while removing the Task."
            })
        })
}