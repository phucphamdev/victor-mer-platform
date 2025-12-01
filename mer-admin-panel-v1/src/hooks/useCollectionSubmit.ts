import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddCollectionMutation, useEditCollectionMutation } from "@/redux/collection/collectionApi";
import { generateSlug } from "@/data/collection-data";

const useCollectionSubmit = () => {
  const [icon, setIcon] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>("custom");
  const [slug, setSlug] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
    watch,
  } = useForm();

  // Watch name field to auto-generate slug
  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      setSlug(generateSlug(nameValue));
    }
  }, [nameValue]);

  useEffect(() => {
    if (!openSidebar) {
      setIcon("");
      setSelectType("custom");
      setSlug("");
      setSelectedCategories([]);
      reset();
    }
  }, [openSidebar, reset]);

  // submit handle
  const handleCollectionSubmit = async (data: any) => {
    try {
      if (!slug) {
        return notifyError("Slug is required");
      }

      const collection_data = {
        name: data?.name,
        slug: slug,
        description: data?.description || "",
        icon: icon || "",
        type: selectType,
        status: data?.status || "active",
        priority: data?.priority ? parseInt(data.priority) : 1,
        featured: data?.featured || false,
        categories: selectedCategories,
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
        setSlug("");
        setSelectedCategories([]);
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
        slug: slug || data?.slug,
        description: data?.description || "",
        icon: icon || "",
        type: selectType,
        status: data?.status,
        priority: data?.priority ? parseInt(data.priority) : 1,
        featured: data?.featured || false,
        categories: selectedCategories,
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
        setSlug("");
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
    slug,
    setSlug,
    selectedCategories,
    setSelectedCategories,
  };
};

export default useCollectionSubmit;
