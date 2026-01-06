import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import apis from "../../../config/api";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppContext";
import { CommonButton, CustomInput, TagInput } from "../../common";

const AddCourseForm = ({ closeModal }) => {
  const { campuses, fetchAllCourses } = useAppContext();

  // ✅ Mutation for adding new course
  const { mutate: addCourse, isPending: addingCourse } = useMutation({
    mutationFn: (formData) => apis.addCourse(formData),
    onSuccess: () => {
      closeModal();
      fetchAllCourses();
      toast.success("Course added successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add course");
    },
  });

  // ✅ Initial Form Values
  const initialValues = {
    name: "",
    duration: "",
    gender: "",
    batch: "",
    status: "",
    section: "",
    courseCampus: "",
    fees: "",
    category: [], // new
  };

  // ✅ Validation Schema (fixed status values)
  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    duration: Yup.string().required("Duration is required"),
    section: Yup.array().of(Yup.string().trim()),
    gender: Yup.string().oneOf(["Male", "Female", "Both"], "Select a gender"),
    status: Yup.string().oneOf(
      ["Coming Soon", "Admission Open", "Admission Closed"],
      "Select a status"
    ),
    batch: Yup.string().required("Batch is required"),
    courseCampus: Yup.string().required("Campus is required"),
    fees: Yup.number().required("fees is required"),
    category: Yup.array().of(Yup.string().trim()),
  });

  // ✅ Submit Handler
  const handleSubmit = (values) => {
    // ensure category is array (Formik already keeps it as array)
    addCourse(values);
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
          setFieldValue, // <-- important
        }) => {
          return (
            <Form className="space-y-5">
              <div className="grid grid-cols-2 gap-x-4">
                {/* Name */}
                <CustomInput
                  label="Course Name"
                  name="name"
                  type="text"
                  placeholder="Enter course name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                />

                {/* Duration */}
                <CustomInput
                  label="Duration"
                  name="duration"
                  type="text"
                  placeholder="e.g. 6 Months / 1 Year"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.duration && errors.duration}
                />
                <TagInput
                  label="Section"
                  name="section"
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
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
                    { value: "", label: "Select gender" },
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Both", label: "Both" },
                  ]}
                />

                {/* Batch */}
                <CustomInput
                  label="Batch"
                  name="batch"
                  type="text"
                  placeholder="Enter batch name or year"
                  value={values.batch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.batch && errors.batch}
                />

                <CustomInput
                  label="Fees"
                  name="fees"
                  type="number"
                  placeholder="Enter course fees"
                  value={values.fees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fees && errors.fees}
                />

                {/* Campus */}
                <CustomInput
                  type="select"
                  label="Campus"
                  name="courseCampus"
                  value={values.courseCampus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.courseCampus && errors.courseCampus}
                  options={[
                    { value: "", label: "Select campus" },
                    ...campuses.map((campus) => ({
                      value: campus._id,
                      label: campus.name,
                    })),
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
                    { value: "Admission Open", label: "Admission Open" },
                    { value: "Admission Closed", label: "Admission Closed" },
                  ]}
                />

                {/* Category: Tag input */}
                <TagInput
                  label="Category (optional)"
                  name="category"
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              </div>
              <CommonButton
                disabled={addingCourse}
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                {addingCourse ? "Adding..." : "Add Course"}
              </CommonButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCourseForm;
