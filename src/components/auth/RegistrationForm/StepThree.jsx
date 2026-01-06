import React from "react";
import { useFormikContext } from "formik";
import { useParticipant } from "../../../context/ParticipantContext";
import { CustomInput } from "../../common";

const StepThree = () => {
  const { values, setFieldValue } = useFormikContext();
  const { setParticipantData, setPaymentFile } = useParticipant();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setParticipantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFieldValue("paymentFile", file);
    setPaymentFile(file);
  };

  return (
    <div>
      <CustomInput label="Full Name" name="name" value={values.name} onChange={handleChange} />
      <CustomInput label="Father Name" name="fatherName" value={values.fatherName} onChange={handleChange} />
      <CustomInput label="CNIC" name="cnic" value={values.cnic} onChange={handleChange} />
      <CustomInput label="WhatsApp" name="whatsapp" value={values.whatsapp} onChange={handleChange} />
      <CustomInput label="Kit Size" name="kitSize" value={values.kitSize} onChange={handleChange} />
      <div className="mb-4">
        <label className="block mb-1">Payment Screenshot</label>
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default StepThree;
