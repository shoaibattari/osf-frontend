import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import apis from "../../config/api";
import { useMemo, useState } from "react";

const CourseForm = () => {
  const { courses } = useAppContext();
  const [sections, setSections] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const campuses = useMemo(() => {
    const openCourses = courses.filter(
      (course) => course?.status === "Admission Open"
    );
    const uniqueCampuses = [];
    const campusMap = new Map();

    openCourses.forEach((course) => {
      const campus = course.courseCampus;
      if (campus && !campusMap.has(campus._id)) {
        campusMap.set(campus._id, campus);
        uniqueCampuses.push(campus);
      }
    });

    return uniqueCampuses;
  }, [courses]);
  // ✅ Initial values
  const initialValues = {
    campus: "",
    course: "",
    sectionTime: "",
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
    city: "",
  };

  // ✅ Validation
  const validationSchema = Yup.object({
    campus: Yup.string().required("Campus is required"),
    course: Yup.string().required("Course is required"),
    sectionTime: Yup.string().required("Section time is required"),
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    community: Yup.string().required("Community is required"),
    cast: Yup.string().required("Cast is required"),
    communityCardNumber: Yup.string().required(
      "Community card number is required"
    ),
    cnic: Yup.string().required("CNIC is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string().required("Date of birth is required"),
    qualification: Yup.string().required("Qualification is required"),
    institute: Yup.string().required("Institute is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  // ✅ Submit Handler
  const handleSubmit = async (values, { resetForm }) => {
    console.log("values", values);
    try {
      const { data } = await apis.registerParticipant(values);
      if (data?.status) {
        toast.success("Registration successful!");
        resetForm();
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Error submitting form");
    }
  };

  return (
    <Wrapper className="py-12">
      <div className=" mx-auto rounded-lg p-8">
        <h2 className="text-5xl font-bold text-center mb-6 text-primary">
          Course Registration
        </h2>

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
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* --- CAMPUS --- */}
                <CustomInput
                  label="Select Campus"
                  type="select"
                  name="campus"
                  value={values.campus}
                  onChange={(e) => {
                    const campusId = e.target.value;
                    setFieldValue("campus", campusId);
                    setFieldValue("course", "");
                    setFieldValue("sectionTime", "");
                    setSections([]);

                    // 🔹 Filter courses with Admission Open for selected campus
                    const filtered = courses.filter(
                      (c) =>
                        c.courseCampus?._id === campusId &&
                        c.status === "Admission Open"
                    );
                    setFilteredCourses(filtered);
                  }}
                  onBlur={handleBlur}
                  options={campuses.map((c) => ({
                    value: c._id,
                    label: c.name,
                  }))}
                  error={touched.campus && errors.campus}
                />

                {/* --- COURSE --- */}
                <CustomInput
                  label="Select Course"
                  type="select"
                  name="course"
                  disabled={!values.campus}
                  value={values.course}
                  onChange={(e) => {
                    const courseId = e.target.value;
                    setFieldValue("course", courseId);
                    setFieldValue("sectionTime", "");

                    // 🔹 Set sections for selected course
                    const selectedCourse = filteredCourses.find(
                      (course) => course._id === courseId
                    );
                    setSections(selectedCourse?.section || []);
                  }}
                  onBlur={handleBlur}
                  options={filteredCourses.map((c) => ({
                    value: c._id,
                    label: c.name,
                  }))}
                  error={touched.course && errors.course}
                />

                {/* --- SECTION TIME --- */}
                <CustomInput
                  label="Select Section"
                  type="select"
                  name="sectionTime"
                  disabled={!values.course}
                  value={values.sectionTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={sections.map((s) => ({
                    value: s,
                    label: s,
                  }))}
                  error={touched.sectionTime && errors.sectionTime}
                />
                {/* --- PERSONAL INFO --- */}
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
                    touched.communityCardNumber && errors.communityCardNumber
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
              <div className="flex justify-end">
                <CommonButton type="submit" variant="primary">
                  Submit Registration
                </CommonButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default CourseForm;
