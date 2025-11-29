import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const OrderReturns = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Order Returns" subtitle="Order Returns List" />
        <EmptyState 
          title="Chưa có đơn trả hàng"
          message="Tính năng quản lý trả hàng đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default OrderReturns;
