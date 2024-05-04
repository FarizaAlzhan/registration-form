import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation,  } from '@apollo/client';
import { gql } from '@apollo/client';

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;




const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [registerUser, { loading: registrationLoading, error: registrationError }] = useMutation(REGISTER_USER);

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await registerUser({ variables: { name, email, password } });
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <span>Name is required</span>}
        
        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <span>Email is required</span>}
        
        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" />
        {errors.password && <span>Password is required and must be at least 6 characters</span>}
        
        <input {...register("confirmPassword", { required: true, validate: value => value === getValues("password") })} type="password" placeholder="Confirm Password" />
        {errors.confirmPassword && <span>Passwords must match</span>}
        
        <button type="submit" disabled={registrationLoading}>Register</button>
        {registrationError && <p>{registrationError.message}</p>}
      </form>

      
    </div>
  );
};

export default RegistrationForm;
