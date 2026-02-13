import { motion as Motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  const formattedTotal = total.toFixed(2);

  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;

      if (session.url) {
        window.location.href = session.url;
      }
    } catch {
      // Silently fail or add a toast if needed
    }
  };

  return (
    <Motion.div
      className="space-y-4 rounded-lg border border-surface-hover bg-surface p-4 shadow-sm md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-primary">Order Summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original Price
            </dt>
            <dd className="text-base font-medium text-white">
              ${formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-red-400">
                -${formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-red-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-white">Total</dt>
            <dd className="text-base font-medium text-primary">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <Motion.button
          className="flex w-full items-center justify-center rounded-lg bg-primary-darker px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-deep focus:outline-none focus:ring-4 focus:ring-primary-light/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </Motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline hover:text-primary-light hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </Motion.div>
  );
};

export default OrderSummary;
