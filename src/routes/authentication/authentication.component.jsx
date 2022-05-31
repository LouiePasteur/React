import { useEffect } from "react";
import { AuthenticationContainer } from "./authentication.styles.jsx";

import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

const Authentication = () => {
  useEffect(() => {
    async function fetchData() {
      const response = await getRedirectResult(auth);
      console.log(response);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    fetchData();
  }, []);

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
