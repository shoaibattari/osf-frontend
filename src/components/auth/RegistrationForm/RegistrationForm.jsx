import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useParticipant } from "../../../context/ParticipantContext";
import apis from "../../../config/api";
import { calculateAgeGroup } from "../../../constants";
import Modal from "../../common/Modal";

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
    name: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    omjCard: Yup.string()
      .matches(
        /^\d{5}-\d{2}-\d{5}$/,
        "OMJ Card must be 12 digits like 12345-12-54321"
      )
      .required("OMJ Card number is required"),
    cnic: Yup.string()
      .matches(
        /^\d{5}-\d{7}-\d{1}$/,
        "CNIC must be 13 digits like 12345-1234567-0"
      )
      .required("CNIC number is required"),
    whatsapp: Yup.string()
      .matches(
        /^03\d{2}-\d{7}$/,
        "WhatsApp must be 11 digits like 0331-3416850"
      )
      .required("WhatsApp number is required"),
    khundi: Yup.string().required("Select Khundi"),
    location: Yup.string().required("Select Location"),
    kitSize: Yup.string().required("Select Kit Size"),
    paymentFile: Yup.mixed().required("Payment screenshot is required"),
  }),
];

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(showModal, "showModal");
  console.log(submittedData, "submittedData");
  const {
    participantData,
    setParticipantData,
    selectedGames,
    setSelectedGames,
    paymentFile,
    setPaymentFile,
    clearParticipantData,
  } = useParticipant();

  const initialValues = {
    dob: participantData.dob || "",
    gender: participantData.gender || "",
    selectedGames: selectedGames || [],
    name: participantData.name || "",
    fatherName: participantData.fatherName || "",
    cnic: participantData.cnic || "",
    omjCard: participantData.omjCard || "",
    khundi: participantData.khundi || "",
    location: participantData.location || "",
    whatsapp: participantData.whatsapp || "",
    kitSize: participantData.kitSize || "",
    paymentFile: paymentFile || null,
  };

  const { mutate: registerParticipant, isPending: isLoading } = useMutation({
    mutationFn: (data) => apis.registerParticipant(data),
    onSuccess: (data) => {
      setSubmittedData(data?.data?.participant);
      clearParticipantData();
      setShowModal(true);
      setCurrentStep(0);
    },
    onError: (err) => alert(err.message || "Error"),
  });
  console.log(isLoading, "loading...");
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
      omjCard: values.omjCard,
      cnic: values.cnic,
      whatsapp: values.whatsapp,
      khundi: values.khundi,
      location: values.location,
      kitSize: values.kitSize,
    }).forEach(([key, val]) => {
      formData.append(`participantData[${key}]`, val);
    });

    // Append selected games
    formData.append("selectedGames", JSON.stringify(selectedGames));

    // Append payment file
    if (paymentFile) {
      formData.append("paymentScreenshot", paymentFile);
    }

    registerParticipant(formData);
  };

  const CurrentStep = steps[currentStep];

  return (
    <div className="max-w-3xl mx-auto p-6 mb-40 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">OMJ Registration</h1>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <p className="text-white text-lg">Submitting, please wait...</p>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[currentStep]}
        onSubmit={handleSubmit}
        enableReinitialize // ✅ allow reinit when context updates
      >
        {({ isValid, values, setFieldValue }) => {
          // Sync Formik values with context
          useEffect(() => {
            setParticipantData((prev) => ({
              ...prev,
              dob: values.dob,
              gender: values.gender,
              name: values.name,
              fatherName: values.fatherName,
              cnic: values.cnic,
              omjCard: values.omjCard,
              whatsapp: values.whatsapp,
              khundi: values.khundi,
              location: values.location,
              kitSize: values.kitSize,
            }));
            setPaymentFile(values.paymentFile);
            setSelectedGames(values.selectedGames);
          }, [values, setParticipantData, setPaymentFile, setSelectedGames]);

          return (
            <Form>
              <CurrentStep setFieldValue={setFieldValue} />
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
                    disabled={
                      (currentStep === 0 &&
                        (!values.dob ||
                          !values.gender ||
                          !participantData.ageGroup)) ||
                      (currentStep === 1 && values.selectedGames.length === 0)
                    }
                    className={`px-4 py-2 rounded ${
                      (currentStep === 0 &&
                        (!values.dob ||
                          !values.gender ||
                          !participantData.ageGroup)) ||
                      (currentStep === 1 && values.selectedGames.length === 0)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isValid || isLoading} // ✅ remove dirty
                    className={`px-4 py-2 rounded cursor-pointer hover:opacity-50 ${
                      isValid
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>

      {showModal && (
        <Modal
          heading={"Registration Details"}
          onClose={() => setShowModal(false)}
        >
          <SuccessModalContent data={submittedData} />
        </Modal>
      )}
    </div>
  );
}

export default RegistrationForm;

const SuccessModalContent = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full">
      <div>
        {/* Header */}

        <h2 className="text-xl font-semibold text-green-600">
          Registration Successful
        </h2>
        <p className="text-sm text-gray-500">
          Your registration has been submitted successfully
        </p>
      </div>
      <div className="text-center max-h-[450px] overflow-y-scroll space-y-2">
        {/* Participant Info */}
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 mb-2">
            Participant Details
          </h3>

          <InfoRow label="Participant ID" value={data.participantId} />
          <InfoRow label="Name" value={data.name} />
          <InfoRow label="Father Name" value={data.fatherName} />
          <InfoRow label="OMJ Card" value={data.omjCard} />
          <InfoRow label="CNIC" value={data.cnic} />
          <InfoRow label="WhatsApp" value={data.whatsapp} />
          <InfoRow label="Gender" value={data.gender} />
          <InfoRow label="Age Group" value={data.ageGroup} />
          <InfoRow label="Date of Birth" value={data.dob} />
          <InfoRow label="Kit Size" value={data.kitSize} />

          <InfoRow
            label="Khundi"
            value={data.khundiOther ? data.khundiOther : data.khundi}
          />
          <InfoRow
            label="Location"
            value={data.locationOther ? data.locationOther : data.location}
          />
        </div>

        {/* Games */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Selected Games</h3>

          <div className="flex flex-wrap gap-2">
            {data.gamesSelected?.map((game) => (
              <span
                key={game.gameId}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
              >
                {game.gameName}
              </span>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 mb-2">
            Payment Information
          </h3>

          <InfoRow
            label="Payment Status"
            value={
              <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                {data.paymentStatus}
              </span>
            }
          />

          {data.paymentScreenshot?.url && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Payment Screenshot</p>
              <a
                href={data.paymentScreenshot.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={data.paymentScreenshot.url}
                  alt="Payment Screenshot"
                  className="w-full max-h-40 object-contain border rounded hover:opacity-90"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b py-2">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-medium text-gray-900">{value || "-"}</span>
  </div>
);
