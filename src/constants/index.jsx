export const baseUrl = "http://localhost:5000";
// export const baseUrl = "https://ems-production-aff7.up.railway.app";

export const calculateAgeGroup = (dob) => {
  const birth = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();

  if (age >= 8 && age <= 10) return "8-10";
  if (age > 10 && age <= 12) return "10-12";
  if (age > 12 && age <= 14) return "12-14";
  if (age > 14 && age <= 16) return "14-16";
  return "Other";
};
