import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { toast } from "sonner";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Handle adding or subtracting quantity
  const handleAddToCart = async ({ productId, delta, quantity, size, color }) => {
    const newQuantity = quantity + delta;

    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      ).unwrap();
      toast.success("Cart updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to update cart.");
    } finally {
      setLoading(false);
    }
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = async ({ productId, size, color }) => {
    setLoading(true);
    try {
      await dispatch(
        removeFromCart({
          productId,
          guestId,
          userId,
          size,
          color,
        })
      ).unwrap();
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error(error.message || "Failed to remove item from cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
          {/* Product Image */}
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
              aria-label={`Image of ${product.name}`}
            />
          </div>

          {/* Product Details */}
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">
              Size: {product.size} | Color: {product.color}
            </p>
            <div className="flex items-center mt-2">
              <button
                onClick={() =>
                  handleAddToCart({
                    productId: product.productId,
                    delta: -1,
                    quantity: product.quantity,
                    size: product.size,
                    color: product.color,
                  })
                }
                disabled={loading || product.quantity <= 1}
                className="border border-gray-500 cursor-pointer rounded px-2 py-0.5 text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="mx-2">{product.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart({
                    productId: product.productId,
                    delta: 1,
                    quantity: product.quantity,
                    size: product.size,
                    color: product.color,
                  })
                }
                disabled={loading}
                className="border border-gray-500 cursor-pointer rounded px-2 py-0.5 text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Product Price and Remove Button */}
          <div>
            <p className="font-medium">Rs.{product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart({
                  productId: product.productId,
                  size: product.size,
                  color: product.color,
                })
              }
              disabled={loading}
              className="ml-6 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Remove item from cart"
            >
              <RiDeleteBinLine className="h-6 w-6 cursor-pointer text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;