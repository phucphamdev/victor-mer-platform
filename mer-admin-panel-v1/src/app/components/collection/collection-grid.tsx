import React from "react";
import dayjs from "dayjs";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import CollectionAction from "./collection-action";
import { useGetAllCollectionsQuery } from "@/redux/collection/collectionApi";
import Pagination from "../ui/Pagination";
import usePagination from "@/hooks/use-pagination";

type IPropType = {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectValue?: string;
  searchValue?: string;
};

const CollectionGrid = ({ setOpenSidebar, selectValue, searchValue }: IPropType) => {
  const { data: collections, isError, isLoading } = useGetAllCollectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const paginationData = usePagination(collections || [], 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !collections) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isError && collections) {
    let collection_items = [...currentItems];
    if (searchValue) {
      collection_items = collection_items.filter((c) =>
        c.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (selectValue) {
      collection_items = collection_items.filter(
        (c) => c.status.toLowerCase() === selectValue.toLowerCase()
      );
    }
    content = (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-8 mb-6">
          {collection_items.map((collection) => (
            <div
              key={collection._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {collection.icon && (
                  <div className="w-16 h-16 flex items-center justify-center text-4xl bg-gray-50 rounded-lg">
                    {collection.icon}
                  </div>
                )}
                <div className="flex-1 w-full">
                  <h3 className="font-medium text-gray-900 truncate">{collection.name}</h3>
                  {collection.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{collection.description}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize font-medium">{collection.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Products:</span>
                    <span className="font-medium">{collection.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <span className="font-medium">{collection.priority}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full justify-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      collection.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {collection.status}
                  </span>
                </div>
                <CollectionAction
                  id={collection._id}
                  setOpenSidebar={setOpenSidebar}
                  variant="compact"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing 1-{currentItems.length} of {collections?.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    );
  }
  return <div className="relative">{content}</div>;
};

export default CollectionGrid;
