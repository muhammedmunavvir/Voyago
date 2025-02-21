import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PackagerSetup = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userrole");
    setUserRole(role);
    if (role !== "packager") {
      navigate("/");
    }
  }, [navigate]);

  if (userRole === "traveler") {
    navigate("/accessdenied")
  }
  return <div>PackagerSetup</div>;
};
