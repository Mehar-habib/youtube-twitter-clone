import { useState } from "react";
import { Logo } from "../index";
import { Link } from "react-router-dom";

function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="container mx-auto flex items-center justify-center h-screen">
        <div className="bg-black border border-slate-800 rounded-lg p-8 shadow-lg">
          <div className="mb-5">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
          <div className="mb-4">
            <ul className="list-disc list-inside">
              <li className="mb-2">
                This is project to showcase my skill in web development.
              </li>
              <li className="mb-2">This web app is still in development.</li>
              <li className="mb-2">
                Don&apos;t upload videos greater then 100 MB.
              </li>
              <li className="mb-2">
                Upload no explicit content meant to be emotionally gratifying.
              </li>
            </ul>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2 transform scale-125"
            />
            <label htmlFor="termsCheckbox" className="font-bold">
              I agree to the terms and conditions
            </label>
          </div>
          <div>
            {isChecked && (
              <Link
                to="/"
                className="bg-purple-500 hover:bg-purple-600 font-bold py-2 px-4 rounded"
              >
                Continue
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
