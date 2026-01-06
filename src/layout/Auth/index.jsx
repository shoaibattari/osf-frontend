import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CourseFormScreen,
  EventFormScreen,
  LoginScreen,
  // SignupScreen,
} from "../../views/auth";
import { HeroSection } from "../../components";

const AuthLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginScreen />} />
        {/* <Route path="/Signup" element={<SignupScreen />} /> */}
        <Route path="/course-form" element={<CourseFormScreen />} />
        <Route path="/event-form" element={<EventFormScreen />} />
      </Routes>
    </div>
  );
};

export default AuthLayout;
