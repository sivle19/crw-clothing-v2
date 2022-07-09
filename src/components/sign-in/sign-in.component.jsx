import { SignInContainer, ButtonsContainer } from "./sign-in.styles.jsx";

import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailandPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";



const defaultFormFields = {
    email: "",
    password: "",
};


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)

    const { email, password } = formFields

    const handleChange = event => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();

    }

    const handleSumbit = async event => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailandPassword(email, password)

            resetFormFields()

        } catch (error) {

            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with email')
                    break;
                default:
                    console.log(error)
            }
        }

    }
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSumbit}>

                <FormInput
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required
                />
                <ButtonsContainer>
                    <Button type="submit">Sign in</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASS.google}>Sign In With Google</Button>
                </ButtonsContainer>


            </form>
        </SignInContainer>
    )
}
export default SignInForm
