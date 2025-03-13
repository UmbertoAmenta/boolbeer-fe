export default function ProductCard(newProduct) {
  return (
    <div class="flex gap-5 bg-white rounded-lg shadow-md p-4 my-4 w-200 mx-auto">
      <div class="flex-shrink-0">
        <img
          src={newProduct.image}
          alt={newProduct.name}
          class="w-24 h-24 object-cover rounded-lg"
        />
      </div>
      <div>
        <h4 class="text-xl font-bold text-gray-800 mb-2">
          {newProduct.name} ({newProduct.volume}ml)
        </h4>
        <ul class="list-disc text-gray-600">
          <li>Volume alcolico: {newProduct.abv}%</li>
          <li>{newProduct.description}</li>
          <li>Prezzo: €{newProduct.price}</li>
        </ul>
      </div>
    </div>
  );
}
