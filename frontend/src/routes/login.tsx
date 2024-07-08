import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { UserInfoContext } from '../providers/UserInfo';
import LoginForm, { LoginDetails } from '../components/LoginForm';

export const Route = createFileRoute('/login')({
    component: LoginPage
})

function LoginPage() {

    const setUsername = useContext(UserInfoContext).setName;
    const navigate = useNavigate();

    function handleSubmit(loginDetails: LoginDetails) {
        setUsername(loginDetails.username);
        navigate({ to: '/' });
    }

    return (
        <LoginForm onSubmit={handleSubmit} />
    )
}