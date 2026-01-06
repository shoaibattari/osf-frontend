import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import apis from "../../../config/api";
import { CommonButton, CustomInput } from "../../common";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppContext";

const AddCampusForm = ({ closeModal }) => {
  const { fetchAllCampuses } = useAppContext();

  const { mutate: addCampus, isLoading: addingCampus } = useMutation({
    mutationFn: (formData) => apis.addCampus(formData),
    onSuccess: () => {
      fetchAllCampuses();
      closeModal();
      toast.success("Campus added successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add campus");
    },
  });

  const initialValues = {
    name: "",
    address: "",
    contact: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Campus name is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string()
      .required("Contact is required")
      .matches(/^[0-9+\-()\s]+$/, "Invalid contact format"),
  });

  const handleSubmit = (values) => {
    console.log("Submitting campus:", values);
    addCampus(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="space-y-5">
            <CustomInput
              label="Campus Name"
              name="name"
              type="text"
              placeholder="Enter campus name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
            />

            <CustomInput
              label="Address"
              name="address"
              type="text"
              placeholder="Enter campus address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && errors.address}
            />

            <CustomInput
              label="Contact"
              name="contact"
              type="text"
              placeholder="Enter campus contact number"
              value={values.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.contact && errors.contact}
            />

            <CommonButton
              disabled={addingCampus}
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              {addingCampus ? "Adding..." : "Add Campus"}
            </CommonButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCampusForm;
