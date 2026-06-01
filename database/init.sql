DROP TABLE IF EXISTS stars;

CREATE TABLE stars (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  constellation TEXT NOT NULL,
  price INTEGER NOT NULL,
  distance TEXT,
  description TEXT
);

INSERT INTO stars (name, constellation, price, distance, description)
VALUES
(
  'Aster-001',
  'Orion',
  29,
  '642 light years',
  'A bright star region associated with one of the most recognisable constellations.'
),
(
  'Aster-002',
  'Lyra',
  49,
  '25 light years',
  'A beautiful star from a constellation often linked with music and mythology.'
),
(
  'Aster-003',
  'Cassiopeia',
  79,
  '550 light years',
  'A star from the northern sky, connected with the famous W-shaped constellation.'
);