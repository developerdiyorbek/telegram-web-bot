import { useCallback, useState } from "react";
import FoodCard from "./components/FoodCard";
import { foods } from "./constants/db";
import { totalPrice } from "./utils";
import { useEffect } from "react";

const telegram = window.Telegram.WebApp;

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    telegram.ready();
  }, []);

  const onAddToCart = (food) => {
    const isExist = cart.find((item) => item.id === food.id);

    if (isExist) {
      const updatedItems = cart.map((item) =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedItems);
    } else {
      const updatedItems = [...cart, { ...food, quantity: 1 }];
      setCart(updatedItems);
    }
  };

  const onRemoveFromCart = (food) => {
    const updatedItems = cart.filter((item) => item.id !== food.id);
    setCart(updatedItems);
  };

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  const onCheckOut = () => {
    telegram.MainButton.text = "Buyurtma berishsh";
    telegram.MainButton.show();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        O&apos;zbek milliy taomlari
      </h1>

      {cart.length > 0 && (
        <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:gap-5">
          <p className="text-xl font-semibold text-green-600 ">
            Total price: {totalPrice(cart).toLocaleString()} so&apos;m
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={onCheckOut}
          >
            Buyurtma berish
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <FoodCard
            food={food}
            key={food.id}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
