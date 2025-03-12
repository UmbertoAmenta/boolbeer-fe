export default function ProductCard(newProduct) {
  return (
    <div className="flex gap-5 ">
      <div>
        <img src={newProduct.image} alt={newProduct.name} />
      </div>
      <div>
        <h4>
          {newProduct.name} ({newProduct.volume}ml)
        </h4>
        <ul>
          <li>volume alcolico: {newProduct.abv}%</li>
          <li>{newProduct.description}</li>
          <li>prezzo: €{newProduct.price}</li>
        </ul>
      </div>
    </div>
  );
}
