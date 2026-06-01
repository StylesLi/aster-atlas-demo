import { useEffect, useState } from "react";
import StarCard from "./components/StarCard";
import CertificatePreview from "./components/CertificatePreview";

function App() {
  const [stars, setStars] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [purchasedStar, setPurchasedStar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStars() {
      try {
        const response = await fetch("http://localhost:3000/api/stars");

        if (!response.ok) {
          throw new Error("Failed to load stars");
        }

        const data = await response.json();
        setStars(data);
      } catch (err) {
        setError("Could not load stars from backend.");
      } finally {
        setIsLoading(false);
      }
    }

    loadStars();
  }, []);

  return (
    <main>
      <h1>Aster Atlas</h1>
      <p>Explore real stars and create a personal star certificate.</p>

      <h2>Available Stars</h2>

      {isLoading && <p>Loading stars...</p>}
      {error && <p>{error}</p>}

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