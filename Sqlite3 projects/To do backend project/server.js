const express = require("express");
const path = require("path");
const fs = require("fs");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());



