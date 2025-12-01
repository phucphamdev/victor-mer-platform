import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const Affiliates = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Affiliates" subtitle="Affiliates List" />
        <EmptyState 
          title="Chưa có đối tác liên kết"
          message="Tính năng quản lý đối tác liên kết đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default Affiliates;
