"use client";
import React, { useState } from "react";
import { Search } from "@/svg";
import { useGetAllCollectionCategoriesQuery, useDeleteCollectionCategoryMutation, useAddCollectionCategoryMutation, useEditCollectionCategoryMutation } from "@/redux/collectionCategory/collectionCategoryApi";
import { useGetAllCollectionsQuery } from "@/redux/collection/collectionApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

const CollectionCategoryPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [icon, setIcon] = useState("");
  
  const { data: categories, isLoading } = useGetAllCollectionCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: collections } = useGetAllCollectionsQuery();
  const [deleteCategory] = useDeleteCollectionCategoryMutation();
  const [addCategory] = useAddCollectionCategoryMutation();
  const [editCategory] = useEditCollectionCategoryMutation();
  
  // Count collections for each category
  const getCollectionCount = (categoryId: string) => {
    if (!collections) return 0;
    return collections.filter(col => 
      col.categories && col.categories.includes(categoryId)
    ).length;
  };
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        notifySuccess("Category deleted successfully");
      } catch (error) {
        notifyError("Failed to delete category");
      }
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIcon(category.icon || "");
    setIsModalOpen(true);
    reset({
      name: category.name,
      description: category.description,
      status: category.status,
      priority: category.priority,
    });
  };

  const onSubmit = async (data: any) => {
    try {
      const categoryData = {
        name: data.name,
        description: data.description || "",
        icon: icon || "",
        status: data.status || "active",
        priority: data.priority ? parseInt(data.priority) : 0,
      };

      if (editingCategory) {
        await editCategory({ id: editingCategory._id, data: categoryData }).unwrap();
        notifySuccess("Category updated successfully");
      } else {
        await addCategory(categoryData).unwrap();
        notifySuccess("Category added successfully");
      }
      
      setIsModalOpen(false);
      setEditingCategory(null);
      setIcon("");
      reset();
    } catch (error: any) {
      notifyError(error?.data?.message || "Something went wrong");
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setIcon("");
    reset();
    setIsModalOpen(true);
  };

  let filteredCategories = categories || [];
  if (searchValue) {
    filteredCategories = filteredCategories.filter((c) =>
      c.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  if (selectValue) {
    filteredCategories = filteredCategories.filter(
      (c) => c.status.toLowerCase() === selectValue.toLowerCase()
    );
  }

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Collection Categories" subtitle="Manage Collection Categories" />
        {/* breadcrumb end */}

        <div className="bg-white rounded-lg shadow-sm">
          {/* Search and Filter */}
          <div className="p-4 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  className="w-full h-11 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Search by category name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                  <Search />
                </button>
              </div>
              
              <div className="flex gap-3">
                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
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
                    className={`px-4 py-2 transition-colors ${
                      viewMode === "table"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    title="Table View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                <select
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                
                <button
                  onClick={openAddModal}
                  className="h-11 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            {isLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No categories found</div>
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredCategories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      {category.icon && (
                        <div className="w-16 h-16 flex items-center justify-center text-4xl bg-gray-50 rounded-lg">
                          {category.icon}
                        </div>
                      )}
                      <div className="flex-1 w-full">
                        <h3 className="font-medium text-gray-900 truncate">{category.name}</h3>
                        {category.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Collections:</span>
                          <span className="font-medium">{getCollectionCount(category._id)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Priority:</span>
                          <span className="font-medium">{category.priority}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full justify-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            category.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {category.status}
                        </span>
                      </div>
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => handleEdit(category)}
                          className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="overflow-x-auto">
                <table className="w-full text-base text-left text-gray-500">
                  <thead className="bg-white border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-xs text-gray-600 uppercase font-semibold">Name</th>
                      <th className="px-4 py-3 text-xs text-gray-600 uppercase font-semibold text-end">Collections</th>
                      <th className="px-4 py-3 text-xs text-gray-600 uppercase font-semibold text-end">Status</th>
                      <th className="px-4 py-3 text-xs text-gray-600 uppercase font-semibold text-end">Priority</th>
                      <th className="px-4 py-3 text-xs text-gray-600 uppercase font-semibold text-end">Created</th>
                      <th className="px-4 py-3 text-xs text-gray-600 uppercase font-semibold text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            {category.icon && (
                              <div className="w-10 h-10 flex items-center justify-center text-2xl bg-gray-50 rounded">
                                {category.icon}
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{category.name}</div>
                              {category.description && (
                                <div className="text-sm text-gray-500 truncate max-w-xs">{category.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-end">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                            {getCollectionCount(category._id)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-end">
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              category.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {category.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-end text-gray-700">{category.priority}</td>
                        <td className="px-4 py-4 text-end text-gray-700">
                          {dayjs(category.createdAt).format("MMM D, YYYY")}
                        </td>
                        <td className="px-4 py-4 text-end">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit(category)}
                              className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(category._id)}
                              className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Category name"
                  />
                  {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon (Emoji)
                  </label>
                  <input
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="🎁"
                    maxLength={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <input
                    {...register("priority")}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingCategory(null);
                      setIcon("");
                      reset();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCategory ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default CollectionCategoryPage;
