import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login, isLoggingIn } = useAuthContext();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    console.log("Login submitted", values);
    login(values);
  };

  return (
    <Wrapper className="py-12">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Login
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="space-y-5">
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
                disabled={isLoggingIn}
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                {isLoggingIn ? "Logining...." : "Login"}
              </CommonButton>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
