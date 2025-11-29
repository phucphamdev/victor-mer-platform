import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddCollectionMutation, useEditCollectionMutation } from "@/redux/collection/collectionApi";

const useCollectionSubmit = () => {
  const [icon, setIcon] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>("custom");
  const router = useRouter();

  // add collection
  const [addCollection] = useAddCollectionMutation();
  // edit collection
  const [editCollection] = useEditCollectionMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  useEffect(() => {
    if (!openSidebar) {
      setIcon("");
      setSelectType("custom");
      reset();
    }
  }, [openSidebar, reset]);

  // submit handle
  const handleCollectionSubmit = async (data: any) => {
    try {
      const collection_data = {
        name: data?.name,
        slug: data?.slug || data?.name.toLowerCase().replace(/\s+/g, '-'),
        description: data?.description,
        icon: icon,
        type: selectType,
        status: data?.status || "active",
        priority: data?.priority ? parseInt(data.priority) : 0,
        featured: data?.featured || false,
      };

      const res = await addCollection({ ...collection_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Collection added successfully");
        setIsSubmitted(true);
        setIcon("");
        setOpenSidebar(false);
        setSelectType("custom");
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  // handle Submit edit Collection
  const handleSubmitEditCollection = async (data: any, id: string) => {
    try {
      const collection_data = {
        name: data?.name,
        slug: data?.slug,
        description: data?.description,
        icon: icon,
        type: selectType,
        status: data?.status,
        priority: data?.priority ? parseInt(data.priority) : 0,
        featured: data?.featured || false,
      };
      const res = await editCollection({ id, data: collection_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Collection updated successfully");
        router.push('/collections');
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    handleCollectionSubmit,
    isSubmitted,
    setIsSubmitted,
    icon,
    setIcon,
    register,
    handleSubmit,
    errors,
    openSidebar,
    setOpenSidebar,
    control,
    selectType,
    setSelectType,
    handleSubmitEditCollection,
  };
};

export default useCollectionSubmit;
