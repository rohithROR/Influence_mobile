import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import authService from '../services/auth.service';
import { useState } from 'react';

const RegisterComponent = () => {

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState();

  const schema = Yup.object().shape({
    first_name: Yup.string().required("FirstName is a required field"),
    last_name: Yup.string().required("LastName is a required field"),
    gender: Yup.string().required(),
    dob: Yup.date().required(),
    user_name: Yup.string().required(),
    password: Yup.string().required()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password should contains a lowercase, a uppercase character and a digit.')
  });

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data) => {
    setIsSubmitted(true)
    try {
      authService.register(data).then((result) => {
        if (result && !result.error) {
          navigate('/');
        }else{
          toast.error(result.error);
        }
      })
      
    } catch (error) {
      toast.error(error.data.message);
    }
    setIsSubmitted(false)
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputFirstName" className="form-label">FirstName</label>
            <input type="first_name" className="form-control" id="inputFirstName" {...register('first_name')} />
            <div className="form-text text-danger">
              {errors.first_name && <p>{errors.first_name.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">LastName</label>
            <input type="last_name" className="form-control" id="inputLastName" {...register('last_name')} />
            <div className="form-text text-danger">
              {errors.last_name && <p>{errors.last_name.message}</p>}
            </div>
          </div>
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

          <div className="mb-3 row">
            <label htmlFor="inputGender" className="mb-4 form-label">Gender</label>
            <div className="mb-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                className="form-check-input"
                {...register('gender')}
              />
              Male
            </label>
            </div>
            <div className="mb-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                className="form-check-input"
                {...register('gender')}

              />
              Female
            </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputDOB" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" id="inputDOB" {...register('dob')} />
            <div className="form-text text-danger">
              {errors.dob && <p>{errors.dob.message}</p>}
            </div>
          </div>


          <button type="submit" className="btn btn-primary" disabled={isSubmitted || !isDirty || !isValid}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterComponent