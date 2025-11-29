import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const FlashSales = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Flash Sales" subtitle="Flash Sales List" />
        <EmptyState 
          title="Chưa có chương trình Flash Sale"
          message="Tính năng quản lý Flash Sale đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default FlashSales;
