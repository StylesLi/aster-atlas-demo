function CertificatePreview({ purchase }) {
  const { star, ownership } = purchase;

  return (
    <section>
      <h2>Certificate Preview</h2>
      <p>This certifies that:</p>

      <h3>{ownership.owner_name}</h3>

      <p>has claimed:</p>

      <h3>{star.name}</h3>

      <p>Constellation: {star.constellation}</p>
      <p>Distance: {star.distance}</p>
      <p>Certificate ID: {ownership.certificate_id}</p>
    </section>
  );
}

export default CertificatePreview;