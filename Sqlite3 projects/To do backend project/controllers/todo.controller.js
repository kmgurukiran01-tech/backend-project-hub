const getTodos=async(req,res)=>{
    try{
        const todos=await req.app.locals.db.all(
             `SELECT *  FROM todos where user_id=? order by id desc`,[req.userID]       
             );
        res.json(todos);

    }catch(erorr){
         res.status(500).json({
              message:'server error',
         })
    }
};



const getTodoById=async(req,res)=>{
    const {id}=req.params
    try{

        const todo=await req.app.locals.db.get(
             `SELECT *  FROM todos where id=? and user_id=?`,[id,req.userID]       
             )
       

        if(!todo){
            return res.status(404).json({
                message:"Todo not found",
            })
        }

        res.json(todo)

    }catch(erorr){
         res.status(500).json({
              message:'server error',
         })
    }
}



const createTodo=async(req,res)=>{
    const {title,description}=req.body


      if(!title){
        return res.status(400).json({
            message:"title not found",
        })
      }

    try{
        const result=await req.app.locals.db.run(
            `insert into todos (user_id,title, description) values(?, ?, ?)`,
            [req.userID,title,description||null]
        )

        const newtodo=await req.app.locals.db.get(
         `SELECT *  FROM todos where id=?`,[result.lastID]
        )
        
       res.status(201).json(newtodo)
    }catch(erorr){
         res.status(500).json({
              message:'server error',
         })
    }
}

const updatetodo=async(req,res)=>{
       const {id}=req.params
       const {title,description,status}=req.body
    try{


      const todo=await req.app.locals.db.get(
       ` select * from todos where id=? and user_id=?`,[id,req.userID]
      )
      if(!todo){
        return res.status(404).json({
            message:"todo not found",
        })
      }

        const updatedTitle = title !== undefined ? title : todo.title;
        const updatedDescription = description !== undefined ? description : todo.description;
        const updatedStatus = status !== undefined ? status : todo.status;


    await req.app.locals.db.run
    (`update todos
         set
        title=?,description=?,status=?
        where id=? and user_id=?`,
 [updatedTitle, updatedDescription, updatedStatus, id, req.userID])


const updatedtodo=await req.app.locals.db.get(
    `select * from todos where id=?;`,[id]
);
  res.json(updatedtodo)
    }
    catch(erorr){
         res.status(500).json({
              message:'server error',
         })
    }
}



const deleteTodo=async(req,res)=>{
    try{
        
    }
    catch(eror){
         res.status(500).json({
              message:'server error',
         })
    }
}