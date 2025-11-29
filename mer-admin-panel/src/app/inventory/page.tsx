import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const Inventory = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Inventory" subtitle="Inventory Management" />
        <EmptyState 
          title="Chưa có dữ liệu tồn kho"
          message="Tính năng quản lý tồn kho đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default Inventory;
