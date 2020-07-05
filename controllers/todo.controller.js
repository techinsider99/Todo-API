const Todo = require('../models/todo.model')
const { v4: generateId } = require('uuid')

const getAllTodos = async (req, res) => {
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

const createTodo = (req, res) => {
    if (req.body.title) {
        const todo = new Todo({
            id: generateId(),
            title: req.body.title,
            isCompleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
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

const toggleTodo = async (req, res) => {
    if(req.body.id) {
        Todo.updateOne(
            {
                "id": req.body.id
            },
            {
                $set: {
                    isCompleted: !todo.isCompleted,
                    updatedAt: new Date().toISOString()
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

const deleteTodo = (req, res) => {
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

const addNote = async (req, res) => {
    if(req.body.id) {
        if(req.body.description) {
            const todo = await Todo.findOne({
                "id": req.body.id
            })
            Todo.updateOne(
                {
                    "id": req.body.id
                },
                {
                    $push: {
                        notes: {
                            id: generateId(),
                            description: req.body.description
                        }
                    }
                }
            , err => {
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
                "error": "Note description is required"
            })
        }
    } else {
        res.status(400).json({
            "error": "Todo ID is required"
        })
    }
}

const deleteNote = async (req, res) => {
    if(req.body.todoId) {
        if(req.body.noteId) {
            const todo = await Todo.findOne({
                "id": req.body.todoId
            })
            console.log(todo)
            const noteExists = todo.notes.filter(note => note.id === req.body.noteId).length > 0
            if (noteExists) {
                Todo.updateOne(
                    {
                        "id": req.body.todoId
                    },
                    {
                        $pull: {
                            notes: {
                                "id": req.body.noteId
                            }
                        }
                    }
                , err => {
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
                    "error": "Note doesn't exist"
                })
            }
        } else {
            res.status(400).json({
                "error": "Note ID is required"
            })
        }
    } else {
        res.status(400).json({
            "error": "Todo ID is required"
        })
    }
}

module.exports = {
    getAllTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
    addNote,
    deleteNote
}