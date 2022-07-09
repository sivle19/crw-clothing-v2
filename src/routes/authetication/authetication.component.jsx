import { AutheticationContainer } from './authetication.styles'

import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in/sign-in.component";

const Authetication = () => {

    return (
        <AutheticationContainer>
            <SignInForm />
            <SignUpForm />
        </AutheticationContainer>
    )
}

export default Authetication