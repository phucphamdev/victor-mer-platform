import React, { useState, useEffect, useMemo } from "react";
import {
  FieldErrors,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { useGetAllBrandsQuery } from "@/redux/brand/brandApi";
import { GroupBase } from "react-select";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";
import FormInput from "../../common/form-input";
import FormSelect from "../../common/form-select";
import ProductType from "./product-type";

// prop type
type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<React.SetStateAction<string>>;
  setSelectBrand: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  default_value?: {
    brand: string;
    product_type: string;
    unit: string;
  };
};

const ProductTypeBrand = ({
  register,
  errors,
  control,
  setSelectProductType,
  setSelectBrand,
  default_value,
}: IPropType) => {
  const { data: brands, isError, isLoading } = useGetAllBrandsQuery();
  const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);

  // Memoize brand options to avoid recalculation
  const brandOptions = useMemo(() => {
    if (!brands?.result) return [];
    return brands.result.map((b) => ({
      value: b.name,
      label: b.name,
    })) as unknown as readonly (string | GroupBase<string>)[];
  }, [brands?.result]);

  // Set default values
  useEffect(() => {
    if (
      default_value?.product_type &&
      default_value.brand &&
      !hasDefaultValues &&
      brands?.result
    ) {
      const brand = brands.result.find((b) => b.name === default_value.brand);
      if (brand) {
        setSelectBrand({ id: brand._id as string, name: default_value.brand });
        setSelectProductType(default_value.product_type);
        setHasDefaultValues(true);
      }
    }
  }, [
    default_value,
    brands,
    hasDefaultValues,
    setSelectBrand,
    setSelectProductType,
  ]);

  // Handle brand change
  const handleBrandChange = (selectedBrand: string) => {
    if (!brands?.result) return;
    const brand = brands.result.find((b) => b.name === selectedBrand);
    if (brand) {
      setSelectBrand({ id: brand._id as string, name: selectedBrand });
    }
  };

  // Render brand select content
  const renderBrandSelect = () => {
    if (isLoading) {
      return (
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Loading...</p>
          <Loading loading={isLoading} spinner="scale" />
        </div>
      );
    }

    if (isError) {
      return <ErrorMsg msg="Failed to load brands" />;
    }

    if (!brands?.result || brands.result.length === 0) {
      return <ErrorMsg msg="No brands found" />;
    }

    return (
      <FormSelect
        name="brand"
        label="Brands"
        control={control}
        errors={errors}
        options={brandOptions}
        defaultValue={
          default_value?.brand
            ? {
                label: default_value.brand,
                value: default_value.brand,
              }
            : undefined
        }
        placeholder="Select brand..."
        required={!default_value?.brand}
        helpText="Set the product brand."
        onChange={handleBrandChange}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6">
        {/* Product Type */}
        <div className="mb-5">
          <p className="mb-0 text-base text-black">ProductType</p>
          <ProductType
            control={control}
            errors={errors}
            default_value={default_value?.product_type}
            setSelectProductType={setSelectProductType}
          />
          <span className="text-tiny leading-4">
            Set the product ProductType.
          </span>
        </div>

        {/* Brand Select */}
        {renderBrandSelect()}

        {/* Unit Input */}
        <FormInput
          name="unit"
          label="Unit"
          register={register}
          errors={errors}
          type="text"
          placeholder="Product unit"
          required={true}
          defaultValue={default_value?.unit}
          helpText="Set the unit of product."
        />
      </div>
    </div>
  );
};

export default ProductTypeBrand;
