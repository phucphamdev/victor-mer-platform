'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// internal
import BackToTopCom from "@/components/common/back-to-top";
import ProductModal from "@/components/common/product-modal";
import {get_cart_products,initialOrderQuantity} from "@/redux/features/cartSlice";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";
import { get_compare_products } from "@/redux/features/compareSlice";
import useAuthCheck from "@/hooks/use-auth-check";
import Loader from "@/components/loader/loader";

const Wrapper = ({ children }) => {
  const { productItem } = useSelector((state) => state.productModal);
  const dispatch = useDispatch();
  const authChecked = useAuthCheck();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load Bootstrap JS only on client side
    if (typeof window !== 'undefined') {
      import("bootstrap/dist/js/bootstrap").catch(() => {
        // Silently fail if bootstrap can't be loaded
      });
    }
    
    dispatch(get_cart_products());
    dispatch(get_wishlist_products());
    dispatch(get_compare_products());
    dispatch(initialOrderQuantity());
  }, [dispatch]);

  // Always render the same structure to avoid hydration mismatch
  // Show loader until mounted and auth is checked
  const showLoader = !mounted || !authChecked;

  return (
    <div id="wrapper">
      {showLoader && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ 
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: 9999
          }}
        >
          <Loader spinner="fade" loading={true} />
        </div>
      )}
      <div style={{ visibility: showLoader ? 'hidden' : 'visible' }}>
        {children}
        <BackToTopCom />
        <ToastContainer />
        {/* product modal start */}
        {productItem && <ProductModal />}
        {/* product modal end */}
      </div>
    </div>
  );
};

export default Wrapper;
