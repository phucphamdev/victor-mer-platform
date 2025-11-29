import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ReactSelect, { GroupBase } from "react-select";
import ErrorMsg from "./error-msg";

type Option = {
  value: string | number;
  label: string;
};

type FormSelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  options: readonly (string | GroupBase<string>)[];
  defaultValue?: Option;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  onChange?: (value: any) => void;
  isLoading?: boolean;
};

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  control,
  errors,
  options,
  defaultValue,
  placeholder = "Select...",
  required = false,
  helpText,
  onChange,
  isLoading = false,
}) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">
        {label} {required && <span className="text-red">*</span>}
      </p>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required!` : false,
        }}
        render={({ field }) => (
          <ReactSelect
            {...field}
            value={field.value}
            defaultValue={defaultValue}
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              if (onChange) {
                onChange(selectedOption?.value);
              }
            }}
            options={options}
            placeholder={placeholder}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        )}
      />
      <ErrorMsg msg={errors?.[name]?.message as string} />
      {helpText && <span className="text-tiny leading-4">{helpText}</span>}
    </div>
  );
};

export default FormSelect;
