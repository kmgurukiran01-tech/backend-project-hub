const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "todo.db");

let db = null;

const initializeDatabase = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.locals.db = db;

    const schemaPath = path.join(
      __dirname,
      "database",
      "schema.sql"
    );

    const fs = require("fs");

    const schema = fs.readFileSync(
      schemaPath,
      "utf8"
    );

    await db.exec(schema);

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.log(`Database error: ${error.message}`);
    process.exit(1);
  }
};


app.get("/", (request, response) => {
  response.json({
    message: "Todo API is running",
  });
});


app.use("/auth", authRoutes);

app.use("/todos", todoRoutes);

app.use("/users", userRoutes);


initializeDatabase();