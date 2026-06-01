function CertificatePreview({ star }) {
  return (
    <section>
      <h2>Certificate Preview</h2>
      <p>This certifies that you have claimed:</p>

      <h3>{star.name}</h3>

      <p>Constellation: {star.constellation}</p>
      <p>Distance: {star.distance}</p>
      <p>Certificate ID: AA-{star.id}-DEMO</p>
    </section>
  );
}

export default CertificatePreview;