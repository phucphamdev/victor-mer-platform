"use client";
import React, { useState } from "react";
import { Search } from "@/svg";
import CollectionTable from "./collection-table";
import CollectionGrid from "./collection-grid";
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
    selectedCategories,
    setSelectedCategories,
  } = useCollectionSubmit();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  
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
                {/* View Toggle */}
                <div className="flex border border-gray rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-theme text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    title="Grid View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-2 transition-colors ${
                      viewMode === "table"
                        ? "bg-theme text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    title="Table View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>

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
            {viewMode === "table" ? (
              <CollectionTable
                setOpenSidebar={setOpenSidebar}
                searchValue={searchValue}
                selectValue={selectValue}
              />
            ) : (
              <CollectionGrid
                setOpenSidebar={setOpenSidebar}
                searchValue={searchValue}
                selectValue={selectValue}
              />
            )}
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
          selectedCategories,
          setSelectedCategories,
        }}
      />
      {/* collection offcanvas end */}
    </>
  );
};

export default CollectionArea;
