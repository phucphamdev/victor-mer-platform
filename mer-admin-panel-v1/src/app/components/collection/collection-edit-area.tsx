"use client";
import React, { useState, useEffect } from "react";
import CollectionTable from "./collection-table";
import useCollectionSubmit from "@/hooks/useCollectionSubmit";
import { useGetCollectionQuery } from "@/redux/collection/collectionApi";
import { useGetAllCollectionCategoriesQuery } from "@/redux/collectionCategory/collectionCategoryApi";
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
    selectedCategories,
    setSelectedCategories,
  } = useCollectionSubmit();
  
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // get specific collection
  const { data: collection, isError, isLoading } = useGetCollectionQuery(id);
  const { data: categories } = useGetAllCollectionCategoriesQuery();

  // Set initial values when collection data is loaded
  useEffect(() => {
    if (collection) {
      setIcon(collection.icon || "");
      setSelectType(collection.type || "custom");
      setSlug(collection.slug || "");
      setSelectedCategories(collection.categories || []);
    }
  }, [collection, setIcon, setSelectType, setSlug, setSelectedCategories]);
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{collection.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Collection Details</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Collection
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Icon</label>
              <div className="mt-1 text-4xl">{collection.icon || "—"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="mt-1 text-gray-900">{collection.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Slug</label>
              <p className="mt-1 text-gray-900 font-mono text-sm">{collection.slug}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Type</label>
              <p className="mt-1 text-gray-900 capitalize">{collection.type}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <p className="mt-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    collection.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {collection.status}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Priority</label>
              <p className="mt-1 text-gray-900">{collection.priority}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Products</label>
              <p className="mt-1 text-gray-900">{collection.productCount}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Description</label>
              <p className="mt-1 text-gray-900">{collection.description || "—"}</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        {collection.categories && collection.categories.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="text-sm font-medium text-gray-600">Categories</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {collection.categories.map((catId) => {
                const category = categories?.find(c => c._id === catId);
                return category ? (
                  <span
                    key={catId}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {category.icon && <span>{category.icon}</span>}
                    <span>{category.name}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      {content}

      {/* Edit Modal */}
      {isModalOpen && collection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Collection</h2>
              
              <form onSubmit={handleSubmit((data) => {
                handleSubmitEditCollection(data, id);
                setIsModalOpen(false);
              })} className="space-y-4">
                {/* Name input */}
                <CollectionFormField
                  register={register}
                  errors={errors}
                  name="Name"
                  isReq={true}
                  default_val={collection.name}
                />

                {/* Auto-generated Slug (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    value={slug}
                    readOnly
                    placeholder="Auto-generated from name"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically generated from name
                  </p>
                </div>

                {/* Icon picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon (Emoji)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowIconPicker(!showIconPicker)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-2xl text-center hover:bg-gray-50 transition-colors"
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
                </div>

                {/* Collection Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectType}
                    onChange={(e) => setSelectType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {collectionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={collection.status}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Categories Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories - Optional
                  </label>
                  <div className="border border-gray-300 rounded-md p-3 max-h-[200px] overflow-y-auto">
                    {categories && categories.length > 0 ? (
                      <div className="space-y-2">
                        {categories
                          .filter(cat => cat.status === "active")
                          .map((category) => (
                            <label
                              key={category._id}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category._id)}
                                onChange={() => handleCategoryToggle(category._id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="flex items-center space-x-2">
                                {category.icon && <span className="text-lg">{category.icon}</span>}
                                <span className="text-sm">{category.name}</span>
                              </span>
                            </label>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No categories available</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Select one or more categories for this collection
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionEditArea;
