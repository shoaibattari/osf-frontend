import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const SignupForm = () => {
  const { register, isRegistering } = useAuthContext();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignup = (values, { resetForm }) => {
    console.log("Signup submitted", values);
    register(values);
    resetForm();
  };

  return (
    <Wrapper className="py-12">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Signup
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="space-y-5">
              <CustomInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />

              <CustomInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />

              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                showPasswordToggle
              />

              <CommonButton
                disabled={isRegistering}
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                {isRegistering ? "Signing up..." : "Signup"}
              </CommonButton>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </Wrapper>
  );
};

export default SignupForm;
