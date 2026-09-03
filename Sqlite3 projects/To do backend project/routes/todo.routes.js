const express=require('express')

const {getTodos,
    getTodoById,
    createTodo,
    updatetodo,
    deleteTodo}=require('../controllers/todo.controller')
const authenticateToken=require('../middleware/auth');


const router=express.Router()

router.use(authenticateToken);


router.get('/',getTodos)
router.get('/:id',getTodoById)
router.post('/',createTodo)
router.put('/:id',updatetodo)
router.delete('/:id',deleteTodo)


module.exports=router;