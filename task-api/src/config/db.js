const {pool}=require('pg')
require('dotenv').config();

const pool=new pool({
    host: process.env.DB_HOST,
    port: process.env.DB.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PAASSWORD,
    database: process.env.DB_NAME
})


pool.on('connect',()=>{
console.log("PostgreSQL connected");
})
pool.on('error',(error)=>{
    console.log('error',error);
    

})
const initializeDatabase=async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS USER(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            password VARCHAR(200) UNIQUE NOT NULL,
            created_at TIMETSAMP default  CURRENT_TIMESTAMP );`);


        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            title varchar(200) NOT NULL,
            description text,
           complted BOOLEAN DEFAULT FALSE,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMSTAMP DEFAULT CURRENT_TIMESTAMP,
           
           contraint fk_user
           FOREIGN KEY (user_id)
           REFERENCES users(id)
           ON DELETE CASCADE
           );`);

               console.log("Database tables ready");
    }catch(error){
        console.log('database connection failed',error)
        throw error;

    }
}

module.exports={
pool,initializeDatabase
}