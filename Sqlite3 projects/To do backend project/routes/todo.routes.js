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
router.get('/:Id',getTodoById)
router.post('/',createTodo)
router.put('/:Id',updatetodo)
router.delete('/:Id',deleteTodo)


module.exports=router;