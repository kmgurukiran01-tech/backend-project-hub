const { body, param } = require("express-validator");

const createTaskValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage()
        .isLenght()
        .withMessage("Title cannot exceed 255 charactrs")
        ,

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
];


const updataeTaskvalidator=[
    param('id')
         .isInt()
        .withMessage("Task ID must be a number"),

    body('tilte')
    .trim()
    .notEmpty()
    .withMessage('Title is require'),
        
    body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),


    body('completed')
    .isBoolean()
    .withMessage('Complted must be true or false'),

]

const taskIdValidator = [
    param("id")
        .isInt()
        .withMessage("Task ID must be a number")
]

module.exports={
    createTaskValidator,
    updataeTaskvalidator,
    taskIdValidator

}