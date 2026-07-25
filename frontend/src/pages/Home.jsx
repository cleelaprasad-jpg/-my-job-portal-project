import { api } from "../Services/services.jsx";

export const Testapi = async () => {
  alert("button clicked.. in home page");
  try {
    const test = await api.get("accounts/company/profile/");
    console.log(test.data);
  } catch (error) {
    console.log("request failed");
    console.log(error);
  }
};
