import { Delete, Edit } from "@/svg";
import React, { useState } from "react";
import Swal from "sweetalert2";
import DeleteTooltip from "../tooltip/delete-tooltip";
import EditTooltip from "../tooltip/edit-tooltip";
import { useDeleteCollectionMutation } from "@/redux/collection/collectionApi";
import Link from "next/link";

// prop type 
type IPropType = {
  id: string;
  setOpenSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: "default" | "compact"; // Add variant for different styles
}

const CollectionAction = ({ id, setOpenSidebar, variant = "default" }: IPropType) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const [deleteCollection, { data: delData, error: delErr }] =
    useDeleteCollectionMutation();

  // handle Delete
  const handleDelete = async (delId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this collection?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCollection(delId);
          if ("data" in res) {
            Swal.fire("Deleted!", `Your collection has been deleted.`, "success");
          }
        } catch (error) {
          // Handle error or show error message
        }
      }
    });
  };

  if (variant === "compact") {
    return (
      <div className="flex gap-2 w-full">
        <Link href={`/collections/${id}`} className="flex-1">
          <button className="w-full px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
            Edit
          </button>
        </Link>
        <button
          onClick={() => handleDelete(id)}
          className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="relative">
        <Link href={`/collections/${id}`}>
          <button
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
            className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
          >
            <Edit />
          </button>
        </Link>
        <EditTooltip showEdit={showEdit} />
      </div>
      <div className="relative">
        <button
          onClick={() => handleDelete(id)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          <Delete />
        </button>
        <DeleteTooltip showDelete={showDelete} />
      </div>
    </div>
  );
};

export default CollectionAction;
