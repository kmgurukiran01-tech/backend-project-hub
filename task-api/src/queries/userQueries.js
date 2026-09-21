const {pool} = require("../config/db");

const createUser=async (name,email, password)=>{
    const result=await pool.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ($1,$2,$3)
        RETURNING id, name, email, created_at`,[name,email,password]
    );

    return result.rows[0];
};

const findbyemail=async(email)=>{
    const result=await pool.query(
        `
        SELECT * FROM users where email=$1`,[email]
    );

    return result.rows[0];
}

const findusById=async(id)=>{
    const result=await pool.query(`SELECT id, name, email, created_at from users where id=$1`,[id]);
};

module.exports={
    createUser,findbyemail, findusById
};