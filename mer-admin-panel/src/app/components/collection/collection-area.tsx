"use client";
import React, { useState } from "react";
import { Search } from "@/svg";
import CollectionTable from "./collection-table";
import CollectionOffcanvas from "./collection-offcanvas";
import useCollectionSubmit from "@/hooks/useCollectionSubmit";

const CollectionArea = () => {
  const {
    handleCollectionSubmit,
    errors,
    handleSubmit,
    isSubmitted,
    icon,
    openSidebar,
    register,
    setIsSubmitted,
    setIcon,
    setOpenSidebar,
    control,
    setSelectType,
    slug,
    selectType,
  } = useCollectionSubmit();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");
  
  // handle search value
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  // handle select value
  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  
  return (
    <>
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[1500px] xl:w-full">
            <div className="tp-search-box flex items-center justify-between px-8 py-8">
              <div className="search-input relative">
                <input
                  className="input h-[44px] w-full pl-14"
                  type="text"
                  placeholder="Search by collection name"
                  onChange={handleSearchValue}
                />
                <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
                  <Search />
                </button>
              </div>
              <div className="flex justify-end space-x-6">
                <div className="search-select mr-3 flex items-center space-x-3 ">
                  <span className="text-tiny inline-block leading-none -translate-y-[2px]">
                    Status :{" "}
                  </span>
                  <select onChange={handleSelectValue}>
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="product-add-btn flex ">
                  <button
                    onClick={() => setOpenSidebar(true)}
                    type="button"
                    className="tp-btn offcanvas-open-btn"
                  >
                    Add Collection
                  </button>
                </div>
              </div>
            </div>
            <CollectionTable
              setOpenSidebar={setOpenSidebar}
              searchValue={searchValue}
              selectValue={selectValue}
            />
          </div>
        </div>
      </div>

      {/* collection offcanvas start */}
      <CollectionOffcanvas
        propsItems={{
          openSidebar,
          setOpenSidebar,
          setIcon,
          icon,
          handleCollectionSubmit,
          handleSubmit,
          register,
          errors,
          isSubmitted,
          setIsSubmitted,
          control,
          setSelectType,
          slug,
          selectType,
        }}
      />
      {/* collection offcanvas end */}
    </>
  );
};

export default CollectionArea;
