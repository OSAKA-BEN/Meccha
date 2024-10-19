import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const verifyPayment = async () => {
    try {
      if (!token) {
        setMessage("You need to be logged in to verify the payment.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { orderId, success },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        setMessage("Your order has been placed successfully!");
        // Optionally, use a toast notification
        toast.success("Your order has been placed successfully!");
        // Navigate after a short delay to allow the user to see the message
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } else {
        setMessage("Payment verification failed. Please try again.");
        // Optionally, redirect to cart page after a delay
        setTimeout(() => {
          navigate("/cart");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during payment verification.");
      toast.error("An error occurred during payment verification.");
      // Optionally, redirect to cart page after a delay
      setTimeout(() => {
        navigate("/cart");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      {isLoading ? (
        <p className="text-xl">Verifying your payment, please wait...</p>
      ) : (
        <p className="text-xl">{message}</p>
      )}
    </div>
  );
};

export default Verify;
