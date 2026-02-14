// export const baseUrl = "http://localhost:5000";
export const baseUrl =
  "https://backend-sportsfestival-okhaimemon.up.railway.app";
// export const baseUrl = "https://osf-backend-production.up.railway.app";

export const calculateAgeGroup = (dob) => {
  const birth = new Date(dob);
  const today = new Date();
  // const age = today.getFullYear() - birth.getFullYear();

  // Exact decimal age
  const ageInMs = today - birth;
  const age = ageInMs / (1000 * 60 * 60 * 24 * 365.25);

  // 6-8 group (internally 5.45 to <9)
  if (age >= 5.45 && age < 9) return "6-8";

  if (age >= 8 && age <= 10) return "8-10";
  if (age > 10 && age <= 12) return "10-12";
  if (age > 12 && age <= 14) return "12-14";
  if (age > 14 && age <= 16) return "14-16";
  return "Other";
};
