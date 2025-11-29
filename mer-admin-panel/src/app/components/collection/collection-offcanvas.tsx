import React from "react";
import { CloseTwo } from "@/svg";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import CollectionFormField from "../brand/form-field-two";

// prop type
type IPropType = {
  propsItems: {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectType: React.Dispatch<React.SetStateAction<string>>;
    setIcon: React.Dispatch<React.SetStateAction<string>>;
    handleCollectionSubmit: (data: any) => void;
    isSubmitted: boolean;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    icon: string;
    handleSubmit: UseFormHandleSubmit<any, undefined>;
    control: Control;
  };
};

const CollectionOffcanvas = ({ propsItems }: IPropType) => {
  const {
    openSidebar,
    setOpenSidebar,
    isSubmitted,
    setIsSubmitted,
    setIcon,
    errors,
    handleCollectionSubmit,
    handleSubmit,
    icon,
    register,
    control,
    setSelectType,
  } = propsItems;
  
  return (
    <>
      <div
        className={`offcanvas-area fixed top-0 right-0 h-full bg-white w-[280px] sm:w-[400px] z-[999] overflow-y-scroll overscroll-y-contain scrollbar-hide shadow-md translate-x-[calc(100%+80px)]  transition duration-300 ${openSidebar ? "offcanvas-opened" : ""}`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* main wrap */}
          <form onSubmit={handleSubmit((data) => handleCollectionSubmit(data))}>
            <div className="flex items-center space-x-3 py-3 px-8 shadow-md sticky top-0 left-0 right-0 w-full z-[99] bg-white">
              <button
                onClick={() => setOpenSidebar(false)}
                className="text-black offcanvas-close-btn"
              >
                <CloseTwo />
              </button>
              <p className="mb-0 text-[15px] font-medium text-[#82808a]">
                Enter Collection Details
              </p>
            </div>
            {/* <!-- main content --> */}
            <div className="px-8 pt-6">
              <div className="">
                {/* icon input */}
                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Icon (emoji)</p>
                  <input
                    type="text"
                    className="input w-full h-[44px] text-2xl text-center"
                    placeholder="🎁"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter an emoji or icon</p>
                </div>
                {/* icon input */}
                <CollectionFormField
                  register={register}
                  errors={errors}
                  name="Name"
                  isReq={true}
                />
                <CollectionFormField
                  register={register}
                  errors={errors}
                  name="Slug"
                  isReq={false}
                />
                <CollectionFormField
                  register={register}
                  errors={errors}
                  name="Description"
                  isReq={false}
                />
                <CollectionFormField
                  register={register}
                  errors={errors}
                  name="Priority"
                  isReq={false}
                  type="number"
                />
                {/* Collection Type */}
                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Collection Type</p>
                  <div className="category-add-select select-bordered">
                    <select
                      onChange={(e) => setSelectType(e.target.value)}
                      className="input w-full h-[44px]"
                    >
                      <option value="custom">Custom</option>
                      <option value="seasonal">Seasonal</option>
                      <option value="trending">Trending</option>
                      <option value="new-arrival">New Arrival</option>
                      <option value="best-seller">Best Seller</option>
                    </select>
                  </div>
                </div>
                {/* Collection Type */}
              </div>
            </div>
            <div className="sm:flex items-center sm:space-x-3 py-6 px-8 sticky bottom-0 left-0 right-0 w-full z-[99] bg-white shadow-_md mt-8 flex-wrap sm:flex-nowrap">
              <button
                type="submit"
                className="tp-btn w-full sm:w-1/2 items-center justify-around mb-2 sm:mb-0"
              >
                Add Collection
              </button>
              <button
                type="button"
                onClick={() => setOpenSidebar(false)}
                className="tp-btn w-full sm:w-1/2 items-center justify-around border border-gray6 bg-white text-black hover:text-white hover:border-danger hover:bg-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        onClick={() => setOpenSidebar(false)}
        className={`body-overlay fixed bg-black top-0 left-0 w-full h-full z-[60] invisible opacity-0 transition-all duration-300 ${openSidebar ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default CollectionOffcanvas;
