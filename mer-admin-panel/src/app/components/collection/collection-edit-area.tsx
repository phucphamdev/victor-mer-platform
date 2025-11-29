"use client";
import React, { useState, useEffect } from "react";
import CollectionTable from "./collection-table";
import useCollectionSubmit from "@/hooks/useCollectionSubmit";
import { useGetCollectionQuery } from "@/redux/collection/collectionApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import CollectionFormField from "../brand/form-field-two";
import { collectionIcons, collectionTypes } from "@/data/collection-data";

const CollectionEditArea = ({ id }: { id: string }) => {
  const {
    errors,
    handleSubmit,
    isSubmitted,
    icon,
    register,
    setIsSubmitted,
    setIcon,
    setOpenSidebar,
    control,
    setSelectType,
    handleSubmitEditCollection,
    slug,
    setSlug,
    selectType,
  } = useCollectionSubmit();
  
  const [showIconPicker, setShowIconPicker] = useState(false);
  
  // get specific collection
  const { data: collection, isError, isLoading } = useGetCollectionQuery(id);

  // Set initial values when collection data is loaded
  useEffect(() => {
    if (collection) {
      setIcon(collection.icon || "");
      setSelectType(collection.type || "custom");
      setSlug(collection.slug || "");
    }
  }, [collection, setIcon, setSelectType, setSlug]);
  
  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="fade" />;
  }
  if (!collection && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (collection && !isError) {
    content = (
      <>
        <div className="col-span-12 lg:col-span-4">
          <form onSubmit={handleSubmit((data) => handleSubmitEditCollection(data, id))}>
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Edit Collection</h3>
              
              {/* Name input */}
              <CollectionFormField
                register={register}
                errors={errors}
                name="Name"
                isReq={true}
                default_val={collection.name}
              />

              {/* Auto-generated Slug (read-only) */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">
                  Slug <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  className="input w-full h-[44px] bg-gray-100 cursor-not-allowed"
                  value={slug}
                  readOnly
                  placeholder="Auto-generated from name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Automatically generated from name
                </p>
              </div>

              {/* Icon picker */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">Icon (emoji) - Optional</p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="input w-full h-[44px] text-2xl text-center hover:bg-gray-50 transition-colors"
                  >
                    {icon || "Select an icon"}
                  </button>
                  {showIconPicker && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                      <div className="grid grid-cols-5 gap-2 p-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIcon("");
                            setShowIconPicker(false);
                          }}
                          className="p-2 hover:bg-gray-100 rounded text-xs text-gray-500 col-span-5"
                        >
                          No icon
                        </button>
                        {collectionIcons.map((item) => (
                          <button
                            key={item.emoji}
                            type="button"
                            onClick={() => {
                              setIcon(item.emoji);
                              setShowIconPicker(false);
                            }}
                            className="p-2 hover:bg-gray-100 rounded text-2xl transition-colors"
                            title={item.label}
                          >
                            {item.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Choose an icon or leave empty
                </p>
              </div>

              {/* Collection Type */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">
                  Collection Type <span className="text-red-500">*</span>
                </p>
                <div className="category-add-select select-bordered">
                  <select
                    value={selectType}
                    onChange={(e) => setSelectType(e.target.value)}
                    className="input w-full h-[44px]"
                  >
                    {collectionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <CollectionFormField
                register={register}
                errors={errors}
                name="Description"
                isReq={false}
                default_val={collection.description}
              />
              
              <CollectionFormField
                register={register}
                errors={errors}
                name="Priority"
                isReq={false}
                type="number"
                default_val={collection.priority}
              />

              {/* Status */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">Status</p>
                <div className="category-add-select select-bordered">
                  <select
                    {...register("status")}
                    className="input w-full h-[44px]"
                    defaultValue={collection.status}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="tp-btn px-7 py-2 w-full">
                Update Collection
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {content}
        <div className="col-span-12 lg:col-span-8">
          {/* collection table start */}
          <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
            <div className="overflow-scroll 2xl:overflow-visible">
              <CollectionTable cls="w-[975px] 2xl:w-full" setOpenSidebar={setOpenSidebar} />
            </div>
          </div>
          {/* collection table end */}
        </div>
      </div>
    </>
  );
};

export default CollectionEditArea;
