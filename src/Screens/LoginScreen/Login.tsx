import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import CurrentStrings from '../../i8n';
import './Login.css';
import { sentenceCase, titleCase } from '../../Utils/methods';

export default function Login() {
  const [error, setError] = useState<string>();

  const {
    CONTINUE,
    EMAIL_ADDRESS,
    FORGET_PASSWORD,
    NEED_ACCOUNT,
    PASSWORD,
    REGISTER,
    WELCOME_BACK,
  } = CurrentStrings;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { LogIn, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setError('');
      await LogIn(data.email, data.password);
      navigate('/home');
    } catch {
      setError('Check your email address and password.');
    }
  };

  return (
    <div className="Login" data-testid="comp-2">
      <div className="form-container">
        <h3 data-testid="h3">{titleCase(WELCOME_BACK)}</h3>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor="inputEmail"
              className="form-label"
              data-testid="label"
            >
              {titleCase(EMAIL_ADDRESS)}
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                data-testid="input"
                {...register('email', { required: true })}
              />
            </label>
            {errors.email && (
              <p className="error">Please enter correct email</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              {titleCase(PASSWORD)}
              <input
                type="password"
                className="form-control"
                id="inputPassword1"
                {...register('password', { required: true })}
              />
            </label>
            {errors.email && (
              <p className="error">Please enter correct email</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            data-testid="button"
          >
            {titleCase(CONTINUE)}
          </button>
        </form>
        <span id="meta-info" data-testid="meta">
          <Link to="/forgetpassword">{titleCase(FORGET_PASSWORD)}</Link>
        </span>
        <p className="meta">
          {sentenceCase(NEED_ACCOUNT)}
          <span id="terms">
            <Link to="/signup">{titleCase(REGISTER)}</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
