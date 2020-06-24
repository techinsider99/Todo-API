const Todo = require('../models/todo.model')
const { v4: generateId } = require('uuid')

exports.getAllTodos = async (req, res) => {
    const todos = await Todo.find(err => {
        if (err) {
            res.json({
                "error": err
            })
            return
        }
    })
    res.status(200).json(todos)
}

exports.createTodo = (req, res) => {
    if (req.body.title) {
        const todo = new Todo({
            id: generateId(),
            title: req.body.title,
            isCompleted: false
        })
        todo.save(err => {
            if(err) {
                res.json({
                    "error": err
                })
            } else {
                res.status(200).json({
                    "message": "success"
                })
            }
        })
    } else {
        res.status(400).json({
            "error": "Title is required"
        })
    }
}

exports.toggleTodo = async (req, res) => {
    if(req.body.id) {
        let todo = await Todo.findOne({
            "id": req.body.id
        })
        Todo.updateOne(
            {
                "id": req.body.id
            },
            {
                $set: {
                    isCompleted: !todo.isCompleted
                }
            }
        , err => {
            if(err) {
                res.json({
                    "error": err
                })
            } else {
                res.json({
                    "message": "success"
                })
            }
        }) 
    } else {
        res.status(400).json({
            "error": "ID is required"
        })
    }
}

exports.deleteTodo = (req, res) => {
    if(req.body.id) {
        Todo.deleteOne({
            "id": req.body.id
        }, err => {
            if(err) {
                res.json({
                    "error": err
                })
            } else {
                res.status(200).json({
                    "message": "success"
                })
            }
        })
    } else {
        res.status(400).json({
            "error": "ID is required"
        })
    }
}