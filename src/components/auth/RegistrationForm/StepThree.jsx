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
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

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

    // Create a local preview for the image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="border-l-4 border-[#F57C00] pl-4 mb-6">
        <h2 className="text-[#002D62] font-black text-xl uppercase italic tracking-tighter">
          Personal & Payment Info
        </h2>
        <p className="text-gray-500 text-xs font-medium">
          Please provide accurate details for your registration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex flex-col gap-0">
          <CustomInput
            label="OMJ Card Number"
            name="omjCard"
            value={values.omjCard}
            onChange={handleChange}
            placeholder="12345-12-54321"
          />
          <p className="text-xs text-[#002D62] leading-0">
            Format: 12345-12-54321
          </p>
        </div>
        <div className="flex flex-col gap-0">
          <CustomInput
            label="CNIC Number"
            name="cnic"
            value={values.cnic}
            onChange={handleChange}
            placeholder="12345-1234567-0"
          />
          <p className="text-xs text-[#002D62] leading-0">
            Format: 12345-1234567-0
          </p>
        </div>
        <div className="flex flex-col gap-0">
          <CustomInput
            label="WhatsApp Number"
            name="whatsapp"
            value={values.whatsapp}
            onChange={handleChange}
            placeholder="0300-0000000"
          />
          <p className="text-xs text-[#002D62] leading-0">
            Format: 0300-0000000
          </p>
        </div>
        <CustomInput
          label="Kit Size"
          name="kitSize"
          type="select"
          options={kitSizeOptions}
          value={values.kitSize}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-4">
          <CustomInput
            label="Khundi"
            name="khundi"
            type="select"
            options={khundiOptions}
            value={values.khundi}
            onChange={handleChange}
          />
          {values.khundi === "OTHER" && (
            <CustomInput
              label="Enter Khundi"
              name="khundiOther"
              value={values.khundiOther || ""}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <CustomInput
            label="Location"
            name="location"
            type="select"
            options={locationOptions}
            value={values.location}
            onChange={handleChange}
          />
          {values.location === "Other" && (
            <CustomInput
              label="Enter Location"
              name="locationOther"
              value={values.locationOther || ""}
              onChange={handleChange}
            />
          )}
        </div>
      </div>

      {/* --- PAYMENT UPLOAD SECTION --- */}
      <div className="mt-8">
        <label className="block mb-2 font-bold text-[#002D62] text-sm uppercase tracking-widest">
          Payment Screenshot
        </label>

        <div
          onClick={handleFileClick}
          className={`relative border-2 border-dashed rounded-3xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
            fileName
              ? "border-[#4CAF50] bg-green-50/30"
              : "border-gray-200 bg-gray-50 hover:bg-white hover:border-[#F57C00]"
          }`}
        >
          {preview ? (
            <div className="relative w-full max-w-[200px]">
              <img
                src={preview}
                alt="Payment Preview"
                className="rounded-xl shadow-md border-2 border-white"
              />
              <div className="absolute -top-2 -right-2 bg-[#4CAF50] text-white rounded-full p-1 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-4xl mb-2 block">🧾</span>
              <p className="text-gray-500 font-medium text-sm">
                Tap to upload your payment screenshot
              </p>
              <p className="text-[10px] text-gray-400 mt-1">JPG, PNG allowed</p>
            </div>
          )}

          <div className="mt-4 px-6 py-2 bg-[#002D62] text-white text-xs font-black uppercase rounded-xl hover:bg-[#F57C00] transition-colors">
            {fileName ? "Change Screenshot" : "Choose File"}
          </div>

          {fileName && (
            <p className="mt-2 text-[10px] text-[#4CAF50] font-bold truncate max-w-xs">
              {fileName}
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default StepThree;
