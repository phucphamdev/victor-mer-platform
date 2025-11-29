"use client";
import React from "react";
import CollectionTable from "./collection-table";
import useCollectionSubmit from "@/hooks/useCollectionSubmit";
import { useGetCollectionQuery } from "@/redux/collection/collectionApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import CollectionFormField from "../brand/form-field-two";

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
  } = useCollectionSubmit();
  
  // get specific collection
  const { data: collection, isError, isLoading } = useGetCollectionQuery(id);
  
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
              {/* icon input */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">Icon (emoji)</p>
                <input
                  type="text"
                  className="input w-full h-[44px] text-2xl text-center"
                  placeholder="🎁"
                  value={icon || collection.icon}
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
                default_val={collection.name}
              />
              <CollectionFormField
                register={register}
                errors={errors}
                name="Slug"
                isReq={false}
                default_val={collection.slug}
              />
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

              {/* collection type */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">Collection Type</p>
                <div className="category-add-select select-bordered">
                  <select
                    onChange={(e) => setSelectType(e.target.value)}
                    className="input w-full h-[44px]"
                    defaultValue={collection.type}
                  >
                    <option value="custom">Custom</option>
                    <option value="seasonal">Seasonal</option>
                    <option value="trending">Trending</option>
                    <option value="new-arrival">New Arrival</option>
                    <option value="best-seller">Best Seller</option>
                  </select>
                </div>
              </div>
              {/* collection type */}

              {/* status */}
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
              {/* status */}

              <button className="tp-btn px-7 py-2">Edit Collection</button>
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
