import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EmptyState from "@/components/shared/empty-state";

const Collections = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Collections" subtitle="Collections List" />
        <EmptyState 
          title="Chưa có bộ sưu tập"
          message="Tính năng quản lý bộ sưu tập đang được phát triển."
        />
      </div>
    </Wrapper>
  );
};

export default Collections;
