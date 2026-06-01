import { useState } from "react";
import StarCard from "./components/StarCard";
import CertificatePreview from "./components/CertificatePreview";

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

function App() {
  const [selectedStar, setSelectedStar] = useState(null);
  const [purchasedStar, setPurchasedStar] = useState(null);

  return (
    <main>
      <h1>Aster Atlas</h1>
      <p>Explore real stars and create a personal star certificate.</p>

      <h2>Available Stars</h2>

      {stars.map((star) => (
        <StarCard key={star.id} star={star} onView={setSelectedStar} />
      ))}

      {selectedStar && (
        <section>
          <h2>Selected Star</h2>
          <h3>{selectedStar.name}</h3>
          <p>Constellation: {selectedStar.constellation}</p>
          <p>Distance: {selectedStar.distance}</p>
          <p>{selectedStar.description}</p>
          <button onClick={() => setPurchasedStar(selectedStar)}>
            Buy This Star
          </button>
        </section>
      )}

      {purchasedStar && <CertificatePreview star={purchasedStar} />}
    </main>
  );
}

export default App;