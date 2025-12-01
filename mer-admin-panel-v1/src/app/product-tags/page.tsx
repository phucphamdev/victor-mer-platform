import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const ProductTags = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Product Tags" subtitle="Product Tags List" />
        <EmptyState 
          title="Chưa có thẻ sản phẩm"
          message="Tính năng quản lý thẻ sản phẩm đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default ProductTags;
