import { useState } from "react";
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit() {}

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address" orientation="vertical">
                <Input type="email" id="email" autoComplete="username" value={email}
                 onChinge={(e) => setEmail(e.target.value)}
                 />
            </FormRow>
            <FormRow lable="password" orientation="vertical">
                <Input 
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </FormRow>
            <FormRow orientation="vertical">
                <Button size="large">Login</Button>
            </FormRow>
        </Form>
    )
}

export default LoginForm;