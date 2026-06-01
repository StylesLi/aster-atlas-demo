const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const stars = [
  {
    id: 1,
    name: "Aster-001",
    constellation: "Orion",
    price: 29,
    distance: "642 light years",
    description:
      "A bright star region associated with one of the most recognisable constellations.",
  },
  {
    id: 2,
    name: "Aster-002",
    constellation: "Lyra",
    price: 49,
    distance: "25 light years",
    description:
      "A beautiful star from a constellation often linked with music and mythology.",
  },
  {
    id: 3,
    name: "Aster-003",
    constellation: "Cassiopeia",
    price: 79,
    distance: "550 light years",
    description:
      "A star from the northern sky, connected with the famous W-shaped constellation.",
  },
];

app.get("/api/stars", (req, res) => {
  res.json(stars);
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});