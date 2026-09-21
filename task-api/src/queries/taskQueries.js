const { pool } = require("../config/db");

const createTask = async (userId, title, description) => {
    const result = await pool.query(
        `
        INSERT INTO tasks (user_id, title, description)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [userId, title, description || null]
    );

    return result.rows[0];
};

const getTasks = async (userId, limit, offset) => {
    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
        `,
        [userId, limit, offset]
    );

    return result.rows;
};

const getTaskCount = async (userId) => {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS count
        FROM tasks
        WHERE user_id = $1
        `,
        [userId]
    );

    return Number(result.rows[0].count);
};

const getTaskById = async (taskId, userId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE id = $1 AND user_id = $2
        `,
        [taskId, userId]
    );

    return result.rows[0];
};

const updateTask = async (
    taskId,
    userId,
    title,
    description,
    completed
) => {
    const result = await pool.query(
        `
        UPDATE tasks
        SET
            title = $1,
            description = $2,
            completed = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4 AND user_id = $5
        RETURNING *
        `,
        [
            title,
            description || null,
            completed,
            taskId,
            userId
        ]
    );

    return result.rows[0];
};

const deleteTask = async (taskId, userId) => {
    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING *
        `,
        [taskId, userId]
    );

    return result.rows[0];
};

module.exports = {
    createTask,
    getTasks,
    getTaskCount,
    getTaskById,
    updateTask,
    deleteTask
};