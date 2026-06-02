import { useEffect, useState } from "react";
import StarCard from "./components/StarCard";
import CertificatePreview from "./components/CertificatePreview";

function App() {
  const [stars, setStars] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [purchaseResult, setPurchaseResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [isGeneratingAiMessage, setIsGeneratingAiMessage] = useState(false);

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

  async function handlePurchase(star) {
    setPurchaseMessage("Saving purchase...");
    setAiMessage("");
    setIsGeneratingAiMessage(false);

    try {
      const purchaseResponse = await fetch("http://localhost:3000/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starId: star.id,
          ownerName: "Demo User",
        }),
      });

      if (!purchaseResponse.ok) {
        throw new Error("Purchase failed");
      }

      const purchaseData = await purchaseResponse.json();
      setPurchaseResult(purchaseData);
      setPurchaseMessage("Purchase saved.");

      setIsGeneratingAiMessage(true);

      try {
        const aiResponse = await fetch(
          "http://localhost:3000/api/generate-certificate-message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ownerName: purchaseData.ownership.owner_name,
              starName: purchaseData.star.name,
              constellation: purchaseData.star.constellation,
              distance: purchaseData.star.distance,
            }),
          }
        );

        if (!aiResponse.ok) {
          throw new Error("AI message failed");
        }

        const aiData = await aiResponse.json();
        setAiMessage(aiData.message);
      } catch (err) {
        setAiMessage(
          `${purchaseData.star.name} in ${purchaseData.star.constellation} is dedicated to ${purchaseData.ownership.owner_name} as a personal mark of wonder and memory.`
        );
      } finally {
        setIsGeneratingAiMessage(false);
      }
    } catch (err) {
      setPurchaseMessage("Could not save purchase.");
    }
  }

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
          <button onClick={() => handlePurchase(selectedStar)}>
            Buy This Star
          </button>
        </section>
      )}

      {purchaseMessage && <p>{purchaseMessage}</p>}

      {purchaseResult && (
        <CertificatePreview
          purchase={purchaseResult}
          aiMessage={aiMessage}
          isGeneratingAiMessage={isGeneratingAiMessage}
        />
      )}
    </main>
  );
}

export default App;