import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const Shipments = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Shipments" subtitle="Shipments List" />
        <EmptyState 
          title="Chưa có đơn vận chuyển"
          message="Tính năng quản lý vận chuyển đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default Shipments;
