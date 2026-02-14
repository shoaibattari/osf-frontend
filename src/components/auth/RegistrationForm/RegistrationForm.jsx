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
import { Logo } from "../../common";

// logic remains same, only UI classes updated
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
    // omjCard: Yup.string()
    //   .matches(/^\d{5}-\d{2}-\d{5}$/, "Format: 12345-12-54321")
    //   .required("Required"),
    cnic: Yup.string()
      .matches(/^\d{5}-\d{7}-\d{1}$/, "Format: 12345-1234567-0")
      .required("Required"),
    whatsapp: Yup.string()
      .matches(/^03\d{2}-\d{7}$/, "Format: 0331-3416850")
      .required("Required"),
    khundi: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    kitSize: Yup.string().required("Required"),
    paymentFile: Yup.mixed().required("Screenshot required"),
  }),
];

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const backStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (values) => {
    const formData = new FormData();
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
    formData.append("selectedGames", JSON.stringify(selectedGames));
    if (paymentFile) formData.append("paymentScreenshot", paymentFile);
    registerParticipant(formData);
  };

  const CurrentStep = steps[currentStep];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 mb-40 ">
      {/* Header - Navy Blue Theme */}
      <div className="text-center mb-8">
        <Logo />
        <div className="flex justify-center gap-2 mt-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-12 rounded-full transition-all duration-300 ${
                idx <= currentStep ? "bg-[#e8e6e4]" : "bg-[#fda954]"
              }`}
            />
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-[#002D62]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative flex items-center justify-center">
            {/* Rotating Border / Ring */}
            <div className="absolute w-24 h-24 border-4 border-[#F57C00] border-t-transparent rounded-full animate-spin"></div>

            {/* Logo in Center */}
            <div className="relative w-16 h-16 animate-pulse">
              <Logo />
            </div>
          </div>
          <p className="text-white font-bold tracking-widest uppercase mt-12">
            Submitting Data...
          </p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[currentStep]}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isValid, values, setFieldValue }) => {
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
            }, [values]);

            return (
              <Form>
                <div className="min-h-[300px]">
                  <CurrentStep setFieldValue={setFieldValue} />
                </div>

                <div className="flex flex-col laptop:flex-row justify-between items-center space-y-2 mt-10 border-t pt-6 ">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={backStep}
                      className="px-6 py-2.5 w-full laptop-sm:w-fit font-bold text-[#002D62] bg-[#002D62]/10 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
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
                      className={`px-10 py-3 rounded-xl font-black uppercase w-full laptop-sm:w-fit tracking-wider transition-all shadow-lg ${
                        (currentStep === 0 &&
                          (!values.dob ||
                            !values.gender ||
                            !participantData.ageGroup)) ||
                        (currentStep === 1 && values.selectedGames.length === 0)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#002D62] text-white hover:bg-[#001a3a] hover:scale-105 active:scale-95"
                      }`}
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isValid || isLoading}
                      className={`px-10 py-3 rounded-xl font-black uppercase tracking-wider w-full laptop-sm:w-fit shadow-lg transition-all ${
                        isValid
                          ? "bg-[#4CAF50] text-white hover:bg-[#388E3C] hover:scale-105 active:scale-95"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? "Processing..." : "Finish & Submit"}
                    </button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

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

// Success Modal UI Refined with Poster Colors
const SuccessModalContent = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full text-left">
      <div className="text-center mb-2">
        <Logo />
        <h2 className="text-2xl font-black text-[#002D62] uppercase italic">
          Success!
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          Registration ID:{" "}
          <span className="text-base font-bold text-[#F57C00]">
            {data.participantId}
          </span>
        </p>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
        <div className="bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-300">
          <h3 className="text-[#002D62] font-bold text-sm uppercase mb-3 border-b pb-1">
            Personal Details
          </h3>
          <InfoRow label="Name" value={data.name} />
          <InfoRow label="Father Name" value={data.fatherName} />
          <InfoRow label="Age Group" value={data.ageGroup} />
          <InfoRow label="WhatsApp" value={data.whatsapp} />
        </div>

        <div className="bg-[#002D62]/5 rounded-2xl p-4 border border-[#002D62]/10">
          <h3 className="text-[#002D62] font-bold text-sm uppercase mb-3 border-b border-[#002D62]/20 pb-1">
            Games Selected
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {data.gamesSelected?.map((game) => (
              <span
                key={game.gameId}
                className="px-3 py-2 text-xs font-bold text-center w-full laptop:w-fit bg-[#4CAF50] text-white rounded-lg uppercase"
              >
                {game.gameName}
              </span>
            ))}
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h3 className="text-[#002D62] font-bold text-sm uppercase mb-3">
            Payment Info
          </h3>
          <div className="flex justify-between items-center bg-yellow-50 p-2 rounded-lg border border-yellow-100 mb-3">
            <span className="text-xs font-bold text-yellow-700">Status</span>
            <span className="text-xs font-black uppercase text-yellow-800">
              {data.paymentStatus}
            </span>
          </div>
          {data.paymentScreenshot?.url && (
            <img
              src={data.paymentScreenshot.url}
              alt="Payment"
              className="w-full rounded-xl border-2 border-white shadow-sm"
            />
          )}
        </div> */}
      </div>
      <div className="flex items-center justify-center py-1">
        <a
          href="https://chat.whatsapp.com/ClHGloZ4deFAAaOXDxMM6U"
          className="w-fit text-center py-3 px-3 cursor-pointer bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-colors uppercase tracking-widest text-sm"
        >
          Join WhatsApp Group
        </a>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
    <span className="text-gray-500 text-xs font-bold uppercase">{label}</span>
    <span className="font-bold text-[#002D62] text-sm">{value || "-"}</span>
  </div>
);

export default RegistrationForm;
