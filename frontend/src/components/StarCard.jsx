function StarCard({ star, onView }) {
  return (
    <div>
      <h3>{star.name}</h3>
      <p>Constellation: {star.constellation}</p>
      <p>Price: £{star.price}</p>
      <button onClick={() => onView(star)}>View Star</button>
    </div>
  );
}

export default StarCard;