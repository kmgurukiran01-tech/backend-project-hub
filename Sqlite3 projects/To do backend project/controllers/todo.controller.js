const getTodos = async (req, res) => {
    try {
        const todos = await req.app.locals.db.all(
            `SELECT *
             FROM todos
             WHERE user_id = ?
             ORDER BY id DESC`,
            [req.userId]
        );

        res.json(todos);

    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
};


const getTodoById = async (req, res) => {

    const { id } = req.params;

    try {

        const todo = await req.app.locals.db.get(
            `SELECT *
             FROM todos
             WHERE id = ?
             AND user_id = ?`,
            [id, req.userId]
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.json(todo);

    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
};


const createTodo = async (req, res) => {

    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "title not found",
        });
    }

    try {

        const result = await req.app.locals.db.run(
            `INSERT INTO todos
             (user_id, title, description)
             VALUES (?, ?, ?)`,
            [
                req.userId,
                title,
                description || null
            ]
        );

        const newtodo = await req.app.locals.db.get(
            `SELECT *
             FROM todos
             WHERE id = ?`,
            [result.lastID]
        );

        res.status(201).json(newtodo);

    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
};


const updatetodo = async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        status
    } = req.body;

    try {

        const todo = await req.app.locals.db.get(
            `SELECT *
             FROM todos
             WHERE id = ?
             AND user_id = ?`,
            [id, req.userId]
        );

        if (!todo) {
            return res.status(404).json({
                message: "todo not found",
            });
        }

        const updatedTitle =
            title !== undefined
                ? title
                : todo.title;

        const updatedDescription =
            description !== undefined
                ? description
                : todo.description;

        const updatedStatus =
            status !== undefined
                ? status
                : todo.status;


        await req.app.locals.db.run(
            `UPDATE todos
             SET title = ?,
                 description = ?,
                 status = ?
             WHERE id = ?
             AND user_id = ?`,
            [
                updatedTitle,
                updatedDescription,
                updatedStatus,
                id,
                req.userId
            ]
        );


        const updatedtodo =
            await req.app.locals.db.get(
                `SELECT *
                 FROM todos
                 WHERE id = ?`,
                [id]
            );

        res.json(updatedtodo);

    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
};


const deleteTodo = async (req, res) => {

    const { id } = req.params;

    try {

        const deleteTodo =
            await req.app.locals.db.run(
                `DELETE FROM todos
                 WHERE id = ?
                 AND user_id = ?`,
                [id, req.userId]
            );


        if (deleteTodo.changes === 0) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }


        res.json({
            message: "Todo deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
};


module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updatetodo,
    deleteTodo
};