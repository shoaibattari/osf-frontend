import React, { useState } from "react";
import { useFormikContext } from "formik";
import { CustomInput } from "../../common";
import { useParticipant } from "../../../context/ParticipantContext";

const StepOne = () => {
  const { values, setFieldValue } = useFormikContext();
  const { setParticipantData } = useParticipant();

  const [ageError, setAgeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setParticipantData((prev) => ({ ...prev, [name]: value }));

    if (name === "dob") {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      let ageGroup = "";

      if (age >= 6 && age <= 8) ageGroup = "6-8";
      else if (age > 8 && age <= 10) ageGroup = "8-10";
      else if (age > 10 && age <= 12) ageGroup = "10-12";
      else if (age > 12 && age <= 14) ageGroup = "12-14";
      else if (age > 14 && age <= 16) ageGroup = "14-16";

      if (!ageGroup) {
        setAgeError("❌ This age is not allowed for game participation");
      } else {
        setAgeError(`✅ Age criteria matched (${ageGroup})`);
      }

      setParticipantData((prev) => ({ ...prev, ageGroup }));
    }
  };

  return (
    <div className="space-y-6 bg-white/5 laptop-sm:p-6 rounded-2xl backdrop-blur-sm border border-white/10">
      {/* Header for Step */}
      <div className="border-l-4 border-[#002D62] pl-3 mb-6">
        <h3 className="text-[#002D62] font-black uppercase tracking-wider text-lg">
          Personal Information
        </h3>
        <p className="text-gray-500 text-xs">
          Enter your birth details and gender
        </p>
      </div>

      <div className="space-y-4">
        {/* Date of Birth Input */}
        <div className="relative group">
          <CustomInput
            label="Date of Birth"
            name="dob"
            type="date"
            value={values.dob}
            onChange={handleChange}
            // Tip: Ensure CustomInput uses focus:border-[#F57C00] for theme matching
          />

          {/* Age Criteria Message - Themed Colors */}
          {values.dob && (
            <div
              className={`mt-2 flex items-center gap-2 p-2 italic rounded-lg text-xs  uppercase tracking-tighter ${
                ageError.includes("❌")
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-green-50 text-[#4CAF50] border border-[#4CAF50]/30"
              }`}
            >
              {ageError}
            </div>
          )}
        </div>

        {/* Gender Selection */}
        <div className="relative group">
          <CustomInput
            label="Gender"
            name="gender"
            type="select"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            value={values.gender}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
