import React from "react";
import { useFormikContext } from "formik";
import { CustomInput } from "../../common";
import { useParticipant } from "../../../context/ParticipantContext";

const StepOne = () => {
  const { values, setFieldValue } = useFormikContext();
  const { participantData, setParticipantData } = useParticipant();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setParticipantData((prev) => ({ ...prev, [name]: value }));

    if (name === "dob") {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      let ageGroup = "";
      if (age >= 8 && age <= 10) ageGroup = "8-10";
      else if (age > 10 && age <= 12) ageGroup = "10-12";
      else if (age > 12 && age <= 14) ageGroup = "12-14";
      else if (age > 14 && age <= 16) ageGroup = "14-16";
      setParticipantData((prev) => ({ ...prev, ageGroup }));
    }
  };

  return (
    <div>
      <CustomInput
        label="Date of Birth"
        name="dob"
        type="date"
        value={values.dob}
        onChange={handleChange}
      />
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
  );
};

export default StepOne;
