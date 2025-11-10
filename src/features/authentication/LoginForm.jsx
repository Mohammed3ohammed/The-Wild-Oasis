import { useState } from "react";
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import SpinnerMini from "../../ui/SpinnerMini";
import {useLogin} from "./useLogin";
import Button from "../../ui/Button";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoading} = useLogin();
    
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        login(
            {email, password},
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address" orientation="vertical">
                <Input type="email" id="email" autoComplete="username" value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </FormRowVertical>
            <FormRowVertical label="password" orientation="vertical">
                <Input 
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoading}>
                    {
                        isLoading ? <SpinnerMini /> : "Log in"  
                    }
                </Button>
            </FormRowVertical>
        </Form>
    )
}

export default LoginForm;