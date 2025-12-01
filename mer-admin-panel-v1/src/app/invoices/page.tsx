import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const Invoices = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Invoices" subtitle="Invoices List" />
        <EmptyState 
          title="Chưa có hóa đơn"
          message="Tính năng quản lý hóa đơn đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default Invoices;
