import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import authService from '../services/auth.service';

const LoginComponent = () => {

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    user_name: Yup.string().required(),
    password: Yup.string().required()
  });

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data) => {
    setIsSubmitted(true)
    try {
      const result = await authService.login(data);
      if (result.data) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.data.message);
    }
    setIsSubmitted(false)
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputUserName" className="form-label">User Name</label>
            <input type="user_name" className="form-control" id="inputUserName" {...register('user_name')} />
            <div className="form-text text-danger">
              {errors.user_name && <p>{errors.user_name.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" {...register('password')} />
            <div className="form-text text-danger">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <button type="submit" disabled={isSubmitted || !isDirty || !isValid} className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent