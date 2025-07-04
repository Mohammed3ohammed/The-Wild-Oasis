import { useUpdateUser } from './useUpdateUser';
import { useState } from 'react';
import { useUser } from '../../features/authentication/useUser';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateUserDataForm() {
    const {
        user: {
            email,
             user_metadata: {fullName: currentFullName},
             }, 
} = useUser();
    
    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    const {updateUser,  isUpdating} = useUpdateUser();

    function handleSubmit(e) {
        e.preventDefault();
        if (!fullName) return;

        updateUser(
            {fullName, avatar},
            {
                onSuccess: () => {
                    setAvatar(null);
                    e.target.reset();
                },
            }
        );
    }

    function handleCancel() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label='Email address'>
                <Input value={email} disabled />
            </FormRow>
            <FormRow label='Full name'>
                    <Input 
                    type='text' value={fullName} onChange={(e) => setFullName(e.target.value)}
                    disabled={isUpdating} id='fullName'
                    />
            </FormRow>
            <FormRow label='Avatar image'>
                <FileInput 
                disabled={isUpdating} id='avatar' accept='image/*' onChange={(e) => setAvatar(e.target.files[0])}
                />
            </FormRow>
            <FormRow>
                <Button onClick={handleCancel} type='reset' variation='secondary'>
                    Cancel
                </Button>
                <Button disabled={isUpdating}>
                    Update account
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdateUserDataForm;