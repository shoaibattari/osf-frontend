import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useParticipant } from "../../../context/ParticipantContext";
import apis from "../../../config/api";
import { calculateAgeGroup } from "../../../constants";

const steps = [StepOne, StepTwo, StepThree];

const validationSchemas = [
  Yup.object().shape({
    dob: Yup.date().required("Date of Birth required"),
    gender: Yup.string().required("Gender required"),
  }),
  Yup.object().shape({
    selectedGames: Yup.array().min(1, "Select at least 1 game"),
  }),
  Yup.object().shape({
    name: Yup.string().required(),
    fatherName: Yup.string().required(),
    cnic: Yup.string().required(),
    whatsapp: Yup.string().required(),
    kitSize: Yup.string().required(),
    paymentFile: Yup.mixed().required(),
  }),
];

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    participantData,
    selectedGames,
    clearParticipantData,
  } = useParticipant();

  const initialValues = {
    dob: participantData.dob || "",
    gender: participantData.gender || "",
    selectedGames: selectedGames || [],
    name: participantData.name || "",
    fatherName: participantData.fatherName || "",
    cnic: participantData.cnic || "",
    whatsapp: participantData.whatsapp || "",
    kitSize: participantData.kitSize || "",
    paymentFile: null,
  };

  const { mutate: registerParticipant, isLoading } = useMutation({
    mutationFn: (data) => apis.registerParticipant(data),
    onSuccess: () => {
      alert("Registration Successful!");

      // ✅ Clear context
      clearParticipantData();

      // ✅ Reset stepper
      setCurrentStep(0);
    },

    onError: (err) => alert(err.message || "Error"),
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const backStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (values) => {
    const formData = new FormData();

    // Append participant fields
    Object.entries({
      ...participantData,
      dob: values.dob,
      gender: values.gender,
      ageGroup: calculateAgeGroup(values.dob),
      name: values.name,
      fatherName: values.fatherName,
      cnic: values.cnic,
      whatsapp: values.whatsapp,
      kitSize: values.kitSize,
    }).forEach(([key, val]) => {
      formData.append(`participantData[${key}]`, val);
    });

    // Append selected games as JSON string
    formData.append("selectedGames", JSON.stringify(selectedGames));

    // Append payment file
    if (values.paymentFile) {
      formData.append("paymentScreenshot", values.paymentFile);
    }

    registerParticipant(formData);
  };

  const CurrentStep = steps[currentStep];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">OMJ Registration</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[currentStep]}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isValid, dirty }) => (
          <Form>
            <CurrentStep />
            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={backStep}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Back
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!(isValid && dirty) || isLoading}
                  className={`px-4 py-2 rounded ${
                    isValid && dirty
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
