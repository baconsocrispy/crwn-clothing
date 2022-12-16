import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import { ButtonsContainer, SignInContainer, SignInHeader } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const dispatch = useDispatch();
  
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
   
    <SignInContainer>
      <SignInHeader>Already have an account?</SignInHeader>
      <span></span>
      <form onSubmit={ handleSubmit }>
        <FormInput 
          label='Email'
          required
          onChange={ changeHandler }
          type='email'
          name='email'
          value={ email }
        />
        <FormInput 
          label='Password'
          required
          onChange={ changeHandler }
          type='password'
          name='password'
          autocomplete='on'
          value={ password }
        />

        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            buttonType={ BUTTON_TYPE_CLASSES.google }
            onClick={ signInWithGoogle }
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm;