import React from "react";
import dayjs from "dayjs";
// internal
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import CollectionAction from "./collection-action";
import { useGetAllCollectionsQuery } from "@/redux/collection/collectionApi";
import Pagination from "../ui/Pagination";
import usePagination from "@/hooks/use-pagination";

// table head
function TableHead({ title }: { title: string }) {
  return (
    <th
      scope="col"
      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
    >
      {title}
    </th>
  );
}

// prop type
type IPropType = {
  cls?: string;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectValue?: string;
  searchValue?: string;
};

const CollectionTable = ({ cls, setOpenSidebar, selectValue, searchValue }: IPropType) => {
  const { data: collections, isError, isLoading, error } = useGetAllCollectionsQuery();
  const paginationData = usePagination(collections || [], 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;
  
  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !collections) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isError && collections) {
    let collection_items = [...currentItems];
    // search value filtering if search value true
    if (searchValue) {
      collection_items = collection_items.filter((c) =>
        c.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    // selectValue filtering if selectValue true
    if (selectValue) {
      collection_items = collection_items.filter(
        (c) => c.status.toLowerCase() === selectValue.toLowerCase()
      );
    }
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                Name
              </th>
              <TableHead title="Type" />
              <TableHead title="Products" />
              <TableHead title="Status" />
              <TableHead title="Priority" />
              <TableHead title="Created" />
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {collection_items.map((collection) => (
              <tr
                key={collection._id}
                className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
              >
                <td className="pr-8 py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-5">
                    {collection?.icon && (
                      <div className="w-[60px] h-[60px] rounded-md bg-gray-100 flex items-center justify-center text-3xl">
                        {collection.icon}
                      </div>
                    )}
                    <span className="font-medium text-heading">
                      {collection.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 text-black font-normal text-end">
                  <span className="capitalize rounded-md px-3 py-1 bg-gray">
                    {collection.type}
                  </span>
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {collection.productCount}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  <span
                    className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium text-end ${
                      collection.status === "active"
                        ? "text-success bg-success/10"
                        : "text-danger bg-danger/10"
                    }`}
                  >
                    {collection.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-3 py-3 text-end">
                  {collection.priority}
                </td>
                <td className="px-3 py-3 text-end">
                  {dayjs(collection.createdAt).format("MMM D, YYYY")}
                </td>
                <td className="px-9 py-3 text-end">
                  <CollectionAction
                    id={collection._id}
                    setOpenSidebar={setOpenSidebar}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing 1-{currentItems.length} of {collections?.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center mx-8 pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={`${cls ? cls : "relative overflow-x-auto mx-8"}`}>
      {content}
    </div>
  );
};

export default CollectionTable;
