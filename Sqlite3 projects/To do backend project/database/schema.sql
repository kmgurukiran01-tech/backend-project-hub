CREATE TABLE IF NOT EXISTS users(
    id integer primary key AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT not null,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS todos(
    id integer primary key autoincrement,
    user_id integer not null,
    title text not null,
    description text,
    status text DEFAULT 'pending',
    CREATED_AT DATETIME default current_timestamp,
    foreign key (user_id) references users(id)
);