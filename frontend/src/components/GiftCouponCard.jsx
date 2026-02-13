import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useEffect } from "react";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, removeCoupon, applyCoupon, getMyCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };
  return (
    <Motion.div className="space-y-4 rounded-lg border border-surface-hover bg-surface p-4 shadow-sm sm:p-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Do you have a voucher or gift card?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-surface-light bg-surface-hover p-2.5 text-sm text-white placeholder-gray-400 focus:border-primary-dark focus:ring-primary-dark"
            placeholder="Enter code here"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>

        <Motion.button
          className="flex w-full items-center justify-center rounded-lg bg-primary-darker px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-deep focus:outline-none focus:ring-4 focus:ring-primary-light/50 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Coupon
        </Motion.button>
        {isCouponApplied && coupon && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-400">
              Applied Coupon
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {coupon.code} - {coupon.discountPercentage}% off
            </p>

            <Motion.button
              className="mt-2 flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRemoveCoupon}
            >
              Remove Coupon
            </Motion.button>
          </div>
        )}
      </div>

      {coupon && !isCouponApplied && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">
            Your Available Coupon:
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </Motion.div>
  );
};

export default GiftCouponCard;

// 6:12:50 okaayy
