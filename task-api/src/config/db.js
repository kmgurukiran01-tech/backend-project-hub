const {poll}=require('pg')
require('dotenv').config();

const pool=new pool({
    host: process.env.DB_HOST,
    port: process.env.DB.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PAASSWORD,
    database: process.env.DB_NAME
})

const initialize=async()=>{
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
            )`)


    }catch{

    }
}