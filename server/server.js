import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const dbConnectionString = process.env.Database_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const port = 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}!`);
});

app.get("/", (req, res) => {
  res.json({ message: "This is the root route!" });
});

app.get("/message", async (req, res) => {
  const result = await db.query(`SELECT * FROM messages`);
  // console.log(result);
  //parse result into json
  res.json(result.rows);
});

app.post("/message", async (req, res) => {
  const { username, message } = req.body;
  // console.log(req.body);
  //body is the form values
  try {
    await db.query(`INSERT into messages (username, message) VALUES ($1, $2)`, [
      username,
      message,
    ]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Data lost!", error);
    res.status(500).json({ success: false });
  }
});
