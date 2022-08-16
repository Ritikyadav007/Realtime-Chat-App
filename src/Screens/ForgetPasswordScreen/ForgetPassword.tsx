import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import CurrentStrings from '../../i8n';
import './ForgetPassword.css';
import { sentenceCase, titleCase } from '../../Utils/methods';

export default function ForgetPassword() {
  const [error, setError] = useState<string>();

  const { EMAIL_ADDRESS, NEED_ACCOUNT, REGISTER, SEND_LINK, RESET_PASSWORD } =
    CurrentStrings;

  const { register, handleSubmit } = useForm();

  const { ResetPassword } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await ResetPassword(data.email);
      navigate('/login');
    } catch {
      setError('Enter a registered email address.');
    }
  };

  return (
    <div className="ForgetPassword">
      <div className="form-container">
        <h3 data-testid="h3">{titleCase(RESET_PASSWORD)}</h3>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              {titleCase(EMAIL_ADDRESS)}
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                {...register('email', { required: true })}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {titleCase(SEND_LINK)}
          </button>
        </form>
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
