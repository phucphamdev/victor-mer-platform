import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMsg from "./error-msg";

type FormInputProps = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  helpText?: string;
  validation?: object;
  className?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  register,
  errors,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
  helpText,
  validation = {},
  className = "input w-full h-[44px] rounded-md border border-gray6 px-6 text-base",
}) => {
  const rules = {
    required: required ? `${label} is required!` : false,
    ...validation,
  };

  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">
        {label} {required && <span className="text-red">*</span>}
      </p>
      <input
        id={name}
        {...register(name, rules)}
        defaultValue={defaultValue}
        className={className}
        type={type}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      />
      <ErrorMsg msg={errors?.[name]?.message as string} />
      {helpText && <span className="text-tiny leading-4">{helpText}</span>}
    </div>
  );
};

export default FormInput;
