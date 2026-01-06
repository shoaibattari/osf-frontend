import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import apis from "../../../config/api";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppContext";
import { CommonButton, CustomInput } from "../../common";

const AddEventForm = ({ closeModal }) => {
  const { campuses, fetchAllEvents } = useAppContext();

  // ✅ Mutation to add event
  const { mutate: addEvent, isPending: addingEvent } = useMutation({
    mutationFn: (formData) => apis.addEvent(formData),
    onSuccess: () => {
      closeModal();
      fetchAllEvents?.();
      toast.success("Event added successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add event");
    },
  });

  // ✅ Initial Form Values
  const initialValues = {
    name: "",
    date: "",
    duration: "",
    venue: "",
    description: "",
    status: "",
    gender: "",
    category: [], // array of tags
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Event name is required"),
    date: Yup.string().required("Date is required"),
    duration: Yup.string().required("Duration is required"),
    venue: Yup.string().required("Venue is required"),
    description: Yup.string().required("Description is required"),
    fees: Yup.number().required("fees is required"),
    status: Yup.string()
      .oneOf(
        ["Coming Soon", "Registration Open", "Registration Closed"],
        "Select valid status"
      )
      .required("Status is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Both"], "Select valid gender")
      .required("Gender is required"),
    category: Yup.array().of(Yup.string().trim()),
  });

  const handleSubmit = (values) => {
    addEvent(values);
  };

  return (
    <div>
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
        }) => {
          const [tagInput, setTagInput] = useState("");

          const addTag = (raw) => {
            const val = (raw || tagInput || "").trim();
            if (!val) return;
            const parts = val
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean);

            const newTags = [...values.category];
            parts.forEach((p) => {
              if (!newTags.includes(p)) newTags.push(p);
            });

            setFieldValue("category", newTags);
            setTagInput("");
          };

          const onKeyDown = (e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            }
          };

          const removeTag = (index) => {
            const updated = values.category.filter((_, i) => i !== index);
            setFieldValue("category", updated);
          };

          return (
            <Form className=" space-y-5">
              <div className="grid grid-cols-2 gap-2">
                {/* Event Name */}
                <CustomInput
                  label="Event Name"
                  name="name"
                  type="text"
                  placeholder="Enter event name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                />

                {/* Date */}
                <CustomInput
                  label="Date"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date && errors.date}
                />

                {/* Duration */}
                <CustomInput
                  label="Duration"
                  name="duration"
                  type="text"
                  placeholder="e.g. 1 Day / 3 Hours"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.duration && errors.duration}
                />

                {/* Venue */}
                <CustomInput
                  label="Venue"
                  name="venue"
                  type="text"
                  placeholder="Enter venue"
                  value={values.venue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.venue && errors.venue}
                />

                {/* Description */}
                <CustomInput
                  label="Description"
                  name="description"
                  type="textarea"
                  placeholder="Enter event description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && errors.description}
                />

                <CustomInput
                  label="Event Fees"
                  name="fees"
                  type="number"
                  placeholder="Enter event fees"
                  value={values.fees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.fees}
                />

                {/* Gender */}
                <CustomInput
                  type="select"
                  label="Gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender && errors.gender}
                  options={[
                    { value: "", label: "Select Gender" },
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Both", label: "Both" },
                  ]}
                />

                {/* Status */}
                <CustomInput
                  type="select"
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.status && errors.status}
                  options={[
                    { value: "", label: "Select Status" },
                    { value: "Coming Soon", label: "Coming Soon" },
                    { value: "Registration Open", label: "Registration Open" },
                    {
                      value: "Registration Closed",
                      label: "Registration Closed",
                    },
                  ]}
                />

                {/* Category tags (optional) */}
                <div>
                  <label className="block font-medium mb-2">
                    Category (optional)
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 border rounded p-2 flex flex-wrap gap-2 items-center">
                      {values.category.length > 0 &&
                        values.category.map((cat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-gray-200 rounded px-2 py-1 text-sm"
                          >
                            <span>{cat}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(idx)}
                              className="text-xs leading-none"
                              aria-label={`Remove ${cat}`}
                            >
                              ✕
                            </button>
                          </div>
                        ))}

                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Type category and press Enter"
                        className="flex-1 min-w-40 outline-none p-1 text-sm"
                      />
                    </div>
                  </div>
                  {touched.category && errors.category ? (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Submit button */}
              <CommonButton
                disabled={addingEvent}
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                {addingEvent ? "Adding..." : "Add Event"}
              </CommonButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEventForm;
