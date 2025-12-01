import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const ProductLabels = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Product Labels" subtitle="Product Labels List" />
        <EmptyState 
          title="Chưa có nhãn sản phẩm"
          message="Tính năng quản lý nhãn sản phẩm đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default ProductLabels;
