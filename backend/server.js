const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.POSTGRES_DB,
});

app.get("/api/stars", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stars ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Could not load stars from database" });
  }
});

app.post("/api/purchase", async (req, res) => {
  const { starId, ownerName } = req.body;

  if (!starId || !ownerName) {
    return res.status(400).json({ message: "starId and ownerName are required" });
  }

  try {
    const starResult = await pool.query("SELECT * FROM stars WHERE id = $1", [
      starId,
    ]);

    if (starResult.rows.length === 0) {
      return res.status(404).json({ message: "Star not found" });
    }

    const certificateId = `AA-${starId}-${Date.now()}`;

    const ownershipResult = await pool.query(
      `INSERT INTO ownerships (star_id, owner_name, certificate_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [starId, ownerName, certificateId]
    );

    res.json({
      message: "Purchase saved",
      star: starResult.rows[0],
      ownership: ownershipResult.rows[0],
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({ message: "Could not save purchase" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});