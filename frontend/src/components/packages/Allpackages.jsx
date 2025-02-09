import axios from "axios";
import { useEffect } from "react";

export default function Allpackages() {
  const fetchpackages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9297/api/v1/packages/allpackages"
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchpackages();
  }, []);

  return <div>Allpackages</div>;
}
