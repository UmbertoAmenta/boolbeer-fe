export default function ProductCard(product) {
  return (
    <div className="flex gap-5 ">
      <div>
        <img
          className="w-10 h-10"
          src={`http://localhost:3000/imgs/${product.image}`}
          alt={product.name}
        />
      </div>
      <div>
        <h4>
          {product.name} ({product.volume}ml)
        </h4>
        <ul>
          <li>volume alcolico: {product.abv}%</li>
          <li>{product.description}</li>
          <li>prezzo: €{product.price}</li>
        </ul>
      </div>
      <div>{`http://localhost:3000/imgs/brands/${product.brand_image}`}</div>
    </div>
  );
}
