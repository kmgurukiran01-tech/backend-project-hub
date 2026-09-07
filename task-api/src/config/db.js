const {poll}=require('pg')
require('dotenv').config();

const pool=new pool({
    host: process.env.DB_HOST,
    port: process.env.DB.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PAASSWORD,
    database: process.env.DB_NAME
})