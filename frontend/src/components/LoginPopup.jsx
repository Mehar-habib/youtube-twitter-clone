import { Link } from "react-router-dom";
import { Button, Logo } from "./index";

function LoginPopup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-black border border-slate-800 rounded-lg p-5 text-center">
        <div className="flex flex-col gap-2 items-center mb-10">
          <Logo size="30" />
        </div>
        <p>Login or Signup to continue</p>
        <Link to="/login">
          <Button
            className="bg-purple-500 w-full py-2 px-4 font-bold text-lg"
            textColor="text-black"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPopup;
