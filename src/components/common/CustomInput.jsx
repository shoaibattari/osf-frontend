import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

/**
 * CustomInput
 * - Formik-friendly: accepts `field` and `form` props when used with <Field component={CustomInput} />
 * - Also works with controlled props: name, value, onChange, onBlur
 * - Types supported: "text", "password", "email", "tel", "textarea", "select"
 * - Props:
 *    label, type, placeholder, readOnly, options (for select),
 *    name, value, onChange, onBlur, error, maxLength, rows,
 *    className, showPasswordToggle, isOpen, setOpenDropdown
 */

const CustomInput = ({
  label,
  type = "text",
  placeholder = "",
  readOnly = false,
  options = [],
  field, // Formik field
  form, // Formik form
  name,
  value,
  onChange,
  onBlur,
  error, // manual error string (optional)
  maxLength,
  rows = 4,
  className = "",
  showPasswordToggle = false,
}) => {
  // Determine controlled vs Formik usage
  const inputName = name || field?.name;
  const inputValue = value ?? field?.value ?? "";
  const handleChange = onChange || field?.onChange;
  const handleBlur = onBlur || field?.onBlur;

  // Meta error: manual prop or Formik touched+error
  const metaError =
    error || (form?.touched?.[inputName] && form?.errors?.[inputName]) || null;

  const [inputType, setInputType] = useState(type);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown on outside click
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Select handling
  const selectedOption = options?.find((opt) => opt.value === inputValue);

  const handleSelect = (option) => {
    if (handleChange) {
      handleChange({ target: { name: inputName, value: option.value } });
    }
    // For Formik setFieldValue fallback
    if (form?.setFieldValue) {
      form.setFieldValue(inputName, option.value);
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = () => {
    if (readOnly) return;
    setOpenDropdown((prev) => (prev === inputName ? null : inputName));
  };

  const togglePassword = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const baseInputClass =
    "w-full px-4 py-2 text-sm rounded-md border outline-none transition focus:ring-1 focus:ring-offset-0";
  const normalBorder = "border-gray-300";
  const errorBorder = "border-red-500";
  const readonlyBg = "bg-gray-100 cursor-not-allowed";

  return (
    <div className={`mb-4 w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={inputName}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {type === "select" ? (
        <div className="relative w-full">
          <div
            id={inputName}
            onClick={toggleDropdown}
            className={`${baseInputClass} ${
              metaError ? errorBorder : normalBorder
            } flex items-center justify-between gap-3 px-3 py-2 ${
              readOnly ? readonlyBg : "bg-white cursor-pointer"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleDropdown();
            }}
          >
            <div className="w-full text-sm text-gray-700">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <span className="text-gray-400">{placeholder || "Select"}</span>
              )}
            </div>
            <span
              className={`transform transition-transform duration-200 ${
                openDropdown === inputName ? "rotate-180" : "rotate-0"
              }`}
            >
              <MdExpandMore size={20} />
            </span>
          </div>

          {openDropdown === inputName && (
            <ul className="absolute left-0 mt-1 w-full bg-white shadow-md rounded-md p-2 z-50 max-h-48 overflow-y-auto">
              {options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className={`cursor-pointer py-2 px-3 rounded text-sm hover:bg-gray-100 flex justify-between items-center ${
                    inputValue === opt.value ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  <span>{opt.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : type === "textarea" ? (
        <textarea
          id={inputName}
          name={inputName}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          readOnly={readOnly}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`${baseInputClass} ${
            metaError ? errorBorder : normalBorder
          } ${readOnly ? readonlyBg : "bg-white"}`}
        />
      ) : type === "tel" ? (
        <div
          className={`${baseInputClass} ${
            metaError ? errorBorder : normalBorder
          } flex items-center ${readOnly ? readonlyBg : "bg-white"}`}
        >
          <div className="px-3 pr-2 border-r border-gray-200 text-sm">+1</div>
          <input
            id={inputName}
            type="tel"
            name={inputName}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={readOnly}
            placeholder={placeholder}
            maxLength={maxLength}
            className="outline-none w-full px-3 py-1 text-sm bg-transparent"
          />
        </div>
      ) : (
        <div className="relative">
          <input
            id={inputName}
            type={showPasswordToggle ? inputType : type}
            name={inputName}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={readOnly}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`${baseInputClass} ${
              metaError ? errorBorder : normalBorder
            } ${readOnly ? readonlyBg : "bg-white"}`}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-2.5 text-gray-500 p-1"
              aria-label={
                inputType === "password" ? "Show password" : "Hide password"
              }
            >
              {inputType === "password" ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
      )}

      {metaError && <p className="text-xs text-red mt-1">{metaError}</p>}
    </div>
  );
};

export default CustomInput;
