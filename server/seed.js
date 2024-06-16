import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    message VARCHAR(999)
)`);

db.query(`INSERT INTO messages(username, message)
    VALUES ('SpongeBob', 'Hi Patrick!'),
    ('Patrick', 'Hi SpongeBob')`);
