import { useState } from "react";

function FoodCard({ food, onAddToCart, onRemoveFromCart }) {
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    setCount((count) => count + 1);
    onAddToCart(food);
  };

  const handleRemoveFromCart = () => {
    setCount((count) => count - 1);
    onRemoveFromCart(food);
  };

  return (
    <div
      key={food.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={food.image || "/placeholder.svg"}
        alt={food.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{food.name}</h2>
        <p className="text-gray-600 mb-4">{food.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            {food.price.toLocaleString()} so&apos;m
          </span>
          <div className="flex items-center gap-1">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={handleAddToCart}
            >
              {count > 0 ? "+" : "Add to cart"}
            </button>
            {count > 0 && (
              <span className="text-base font-medium">{count}</span>
            )}
            {count > 0 && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
