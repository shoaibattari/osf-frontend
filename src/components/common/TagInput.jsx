import React, { useState } from "react";

const TagInput = ({ label, name, values, setFieldValue, touched, errors }) => {
  const [tagInput, setTagInput] = useState("");

  // Add tag on Enter or comma
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !values[name].includes(value)) {
        setFieldValue(name, [...values[name], value]);
      }
      setTagInput("");
    }
  };

  // Remove tag by index
  const removeTag = (idx) => {
    const updated = values[name].filter((_, i) => i !== idx);
    setFieldValue(name, updated);
  };

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <div className="flex gap-2 items-center">
        <div className="flex-1 border rounded p-2 flex flex-wrap gap-2 items-center">
          {values[name]?.length > 0 &&
            values[name].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-200 rounded px-2 py-1 text-sm"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeTag(idx)}
                  className="text-xs leading-none"
                  aria-label={`Remove ${item}`}
                >
                  ✕
                </button>
              </div>
            ))}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type ${label.toLowerCase()} and press Enter`}
            className="flex-1 min-w-40 outline-none p-1 text-sm"
          />
        </div>
      </div>
      {touched[name] && errors[name] && (
        <div className="text-red-500 text-sm mt-1">{errors[name]}</div>
      )}
    </div>
  );
};

export default TagInput;
