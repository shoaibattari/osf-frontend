import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import apis from "../../config/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Modal from "../common/Modal";

const EventForm = () => {
  const { events, fetchAllParticipants } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    event: "",
    category: "",
    fullName: "",
    fatherName: "",
    contact: "",
    email: "",
    community: "",
    cast: "",
    communityCardNumber: "",
    cnic: "",
    gender: "",
    dob: "",
    qualification: "",
    institute: "",
    address: "",
    city: "karachi",
  };

  const validationSchema = Yup.object({
    event: Yup.string().required("Event is required"),
    category: Yup.string().when("event", {
      is: (val) => {
        const ev = events.find((e) => e._id === val);
        return ev?.category?.length > 0;
      },
      then: (schema) => schema.required("Category is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email"),
    community: Yup.string().required("Community is required"),
    cnic: Yup.string().required("CNIC is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string()
      .max(new Date(), "Future dates are not allowed")
      .required("Date of birth is required"),
    qualification: Yup.string().required("Qualification is required"),
    institute: Yup.string().required("Institute is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  const {
    mutate: registerParticipant,
    isLoading: registeringParticipant,
  } = useMutation({
    mutationFn: (formData) => apis.registerParticipant(formData),
    onSuccess: (data) => {
      setModalData(handleModalData(data?.data?.data));
      setIsModalOpen(true);
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Error submitting form");
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        eventId: values.event,
        categoryId: values.category || null,
      };
      registerParticipant(payload);
      resetForm();
      setSelectedEvent(null);
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  const handleModalData = (data) => {
    return {
      "Participant ID": data.participantId,
      "Full Name": data.fullName,
      "Event Name": data.event,
      Category: data.category || "N/A",
      Contact: data.contact,
      Email: data.email || "—",
      Gender: data.gender,
      "Date of Birth": data.dob,
    };
  };

  return (
    <Wrapper className="py-8 laptop-sm:py-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary text-white py-6 laptop-sm:py-10 px-2 laptop-sm:px-8 text-center">
            <h2 className="text-2xl laptop-sm:text-5xl font-bold">
              Event Registration Form
            </h2>
            <p className="mt-3 text-lg opacity-90">
              Register for OMJ community events
            </p>
          </div>

          <div className="p-6 laptop-sm:p-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                values,
                setFieldValue,
              }) => (
                <Form className="space-y-8">
                  {/* Event & Category Section */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                      Event Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CustomInput
                        label="Select Event *"
                        type="select"
                        name="event"
                        value={values.event}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          setFieldValue("event", selectedId);
                          const ev = events.find((ev) => ev._id === selectedId);
                          setSelectedEvent(ev || null);
                          setFieldValue("category", "");
                        }}
                        onBlur={handleBlur}
                        options={events.map((e) => ({
                          value: e._id,
                          label: e.title || e.name,
                        }))}
                        error={touched.event && errors.event}
                        placeholder="Choose an event"
                      />

                      {selectedEvent?.category?.length > 0 && (
                        <CustomInput
                          label="Select Category *"
                          type="select"
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={selectedEvent.category.map((cat) => ({
                            value: cat,
                            label: cat,
                          }))}
                          error={touched.category && errors.category}
                          placeholder="Select category"
                        />
                      )}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <CustomInput
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fullName && errors.fullName}
                      />

                      <CustomInput
                        label="Father Name"
                        name="fatherName"
                        value={values.fatherName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fatherName && errors.fatherName}
                      />

                      <CustomInput
                        label="Contact"
                        name="contact"
                        value={values.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.contact && errors.contact}
                      />

                      <CustomInput
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />

                      <CustomInput
                        label="Community"
                        name="community"
                        value={values.community}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.community && errors.community}
                      />

                      <CustomInput
                        label="Cast"
                        name="cast"
                        value={values.cast}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.cast && errors.cast}
                      />

                      <CustomInput
                        label="Community Card Number"
                        name="communityCardNumber"
                        value={values.communityCardNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.communityCardNumber &&
                          errors.communityCardNumber
                        }
                      />

                      <CustomInput
                        label="CNIC"
                        name="cnic"
                        value={values.cnic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.cnic && errors.cnic}
                      />

                      <CustomInput
                        label="Gender"
                        type="select"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={[
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                        ]}
                        error={touched.gender && errors.gender}
                      />

                      <CustomInput
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dob && errors.dob}
                      />
                    </div>
                  </div>

                  {/* Education & Address */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                      Education & Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <CustomInput
                        label="Qualification"
                        name="qualification"
                        value={values.qualification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.qualification && errors.qualification}
                      />

                      <CustomInput
                        label="Institute"
                        name="institute"
                        value={values.institute}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.institute && errors.institute}
                      />

                      <CustomInput
                        label="Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && errors.address}
                      />

                      <CustomInput
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.city && errors.city}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <CommonButton
                      type="submit"
                      disabled={registeringParticipant}
                      variant="primary"
                      className="px-10 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {registeringParticipant
                        ? "Submitting..."
                        : "Submit Registration"}
                    </CommonButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && modalData && (
        <Modal
          width="700px"
          heading="🎉 Registration Successful!"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="">
            <div className="text-center mb-2">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-700">
                Your registration has been create Succesfully.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-2 space-y-2">
              {Object.entries(modalData).map(([key, value]) => {
                let displayValue = value;
                if (key === "Event Name" && events) {
                  const foundEvent = events.find((e) => e._id === value);
                  displayValue = foundEvent
                    ? foundEvent.title || foundEvent.name
                    : value;
                }

                return (
                  <div
                    key={key}
                    className="flex justify-between items-center py-1.5  border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium text-gray-600">{key}</span>
                    <span className="font-bold text-gray-900 text-right max-w-[60%] truncate">
                      {displayValue || "—"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Wrapper>
  );
};

export default EventForm;
