const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema(
    {
        "name": String,
        "description": String,
        "isCompleted": {
            "type": Boolean,
            "default": false
        },
        "userId": String, // user who created the task
        "isActive": {
            "type": Boolean,
            "default": true
        }
    },
    {
        timestamps: true
    }
)

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;

// Add a new task to the database