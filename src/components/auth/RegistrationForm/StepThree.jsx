import React, { useRef, useState } from "react";
import { useFormikContext } from "formik";
import { useParticipant } from "../../../context/ParticipantContext";
import CustomInput from "../../common/CustomInput";

export const khundiOptions = [
  { label: "ASWANI", value: "ASWANI" },
  { label: "BARAI", value: "BARAI" },
  { label: "BHANWARIA", value: "BHANWARIA" },
  { label: "DADWALA", value: "DADWALA" },
  { label: "DARBAR", value: "DARBAR" },
  { label: "DARIYA", value: "DARIYA" },
  { label: "DAWRA", value: "DAWRA" },
  { label: "DUROODWALA", value: "DUROODWALA" },
  { label: "ESSANI", value: "ESSANI" },
  { label: "GABA", value: "GABA" },
  { label: "GABRANI", value: "GABRANI" },
  { label: "GAGAI", value: "GAGAI" },
  { label: "GANATRA", value: "GANATRA" },
  { label: "GATTA", value: "GATTA" },
  { label: "GAZIANI", value: "GAZIANI" },
  { label: "JAFFRANI", value: "JAFFRANI" },
  { label: "JAKHURA", value: "JAKHURA" },
  { label: "JIWANI", value: "JIWANI" },
  { label: "KALANI", value: "KALANI" },
  { label: "KARAR", value: "KARAR" },
  { label: "KATH", value: "KATH" },
  { label: "KHOSA", value: "KHOSA" },
  { label: "LADHANI", value: "LADHANI" },
  { label: "MAMDANI", value: "MAMDANI" },
  { label: "MANGRORIA", value: "MANGRORIA" },
  { label: "MARKATIYA", value: "MARKATIYA" },
  { label: "MOORAD", value: "MOORAD" },
  { label: "MOOSANI", value: "MOOSANI" },
  { label: "MUHAMMADI", value: "MUHAMMADI" },
  { label: "MULLARA", value: "MULLARA" },
  { label: "OTHER", value: "OTHER" },
  { label: "PANJWANI", value: "PANJWANI" },
  { label: "PASTA", value: "PASTA" },
  { label: "PATEL", value: "PATEL" },
  { label: "POPATPOTRA", value: "POPATPOTRA" },
  { label: "SURIYA", value: "SURIYA" },
  { label: "TOBERIA", value: "TOBERIA" },
  { label: "VAYANI", value: "VAYANI" },
];

export const locationOptions = [
  { label: "Hussainabad", value: "Hussainabad" },
  { label: "Mossamiyat", value: "Mossamiyat" },
  { label: "Memon Society", value: "Memon Society" },
  { label: "Highway", value: "Highway" },
  { label: "Chandni", value: "Chandni" },
  { label: "Hashimabad", value: "Hashimabad" },
  { label: "Gulshan-e-Iqbal", value: "Gulshan-e-Iqbal" },
  { label: "Other", value: "Other" },
];

export const kitSizeOptions = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
  { label: "Extra Large", value: "X-Large" },
  { label: "Double Extra Large", value: "xx-Large" },
];

const StepThree = () => {
  const { values, setFieldValue } = useFormikContext();
  const { setParticipantData, setPaymentFile } = useParticipant();
  const [fileName, setFileName] = useState(values.paymentFile?.name || "");
  const fileInputRef = useRef(null);

  // General handler for text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value, true);
    setParticipantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setFieldValue("paymentFile", file, true);
    setPaymentFile(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      {/* Basic text inputs */}
      <CustomInput
        label="Full Name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <CustomInput
        label="Father Name"
        name="fatherName"
        value={values.fatherName}
        onChange={handleChange}
      />
      <CustomInput
        label="OMJ Card Number"
        name="omjCard"
        value={values.omjCard}
        onChange={handleChange}
        placeholder="12345-12-54321"
      />
      <CustomInput
        label="CNIC Number"
        name="cnic"
        value={values.cnic}
        onChange={handleChange}
        placeholder="12345-1234567-0"
      />
      <CustomInput
        label="WhatsApp Number"
        name="whatsapp"
        value={values.whatsapp}
        onChange={handleChange}
        placeholder="0331-3416850"
      />

      {/* Khundi select */}
      <CustomInput
        label="Khundi"
        name="khundi"
        type="select"
        options={khundiOptions}
        value={values.khundi}
        onChange={handleChange}
      />
      {/* Show "Other" input */}
      {values.khundi === "OTHER" && (
        <CustomInput
          label="Enter Khundi"
          name="khundiOther"
          value={values.khundiOther || ""}
          onChange={handleChange}
        />
      )}

      {/* Location select */}
      <CustomInput
        label="Location"
        name="location"
        type="select"
        options={locationOptions}
        value={values.location}
        onChange={handleChange}
      />
      {/* Show "Other" input */}
      {values.location === "Other" && (
        <CustomInput
          label="Enter Location"
          name="locationOther"
          value={values.locationOther || ""}
          onChange={handleChange}
        />
      )}

      {/* Kit size select */}
      <CustomInput
        label="Kit Size"
        name="kitSize"
        type="select"
        options={kitSizeOptions}
        value={values.kitSize}
        onChange={handleChange}
      />

      {/* File upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Payment Screenshot</label>
        <div
          className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer hover:bg-gray-50"
          onClick={handleFileClick}
        >
          <span>{fileName || "Click to upload file"}</span>
          <button
            type="button"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Browse
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default StepThree;
