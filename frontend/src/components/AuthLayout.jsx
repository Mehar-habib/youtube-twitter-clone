import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginPopup } from "./index";

function AuthLayout({ children, authentication }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authentication && authStatus === authentication) {
      return;
    }
  }, [authentication, authStatus, navigate]);

  if (authentication && authStatus !== authentication) {
    return <LoginPopup />;
  }
  return children;
}

export default AuthLayout;
