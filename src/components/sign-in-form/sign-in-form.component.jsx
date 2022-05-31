import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer, ButtonContainer } from "./sign-in-form.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

const defaultformFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("no user associate with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
            required: true,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
            required: true,
          }}
        />
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
