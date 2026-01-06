import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginScreen, SignupScreen } from "../../views/auth";
import { HeroSection } from "../../components";
import { RegistrationForm } from "../../components/auth";

const AuthLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/Signup" element={<SignupScreen />} />
      </Routes>
    </div>
  );
};

export default AuthLayout;
