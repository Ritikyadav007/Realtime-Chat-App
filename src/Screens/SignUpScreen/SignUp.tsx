import { Avatar } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { list, ref } from 'firebase/storage';
import { useAuth } from '../../store/AuthContext';
import CurrentStrings from '../../i8n';
import './SignUp.css';
import Constants from '../../Utils/constants';
import { sentenceCase, titleCase } from '../../Utils/methods';
import ChooseProfile from '../../Components/ChooseProfile/ChooseProfile';
import { addUserToStore } from '../../Services/UserService';
import storage, { uploadImage } from '../../Services/StorageService';

export default function SignUp() {
  const [error, setError] = useState<string>();
  const [image, setImage] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { PASSWORD_PATTERN, EMAIL_PATTERN } = Constants;
  const {
    AND,
    CONFIRM_PASS,
    CONTINUE,
    CREATE_ACCOUNT,
    EMAIL_ADDRESS,
    HAVE_ACCOUNT,
    META,
    NAME,
    PASSWORD,
    POLICY,
    TERMS,
  } = CurrentStrings;
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPass) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      const signedUpUser = await signUp(data.email, data.password);
      image && (await uploadImage(image, signedUpUser.user.uid));
      addUserToStore(data.name, data.email, signedUpUser.user.uid);
      navigate('/login');
    } catch {
      setError('Failed to SignUp');
    }
  };

  const handleProfilePic = (data: FileList) => {
    setImage(data[0]);
  };
  const defaultImg =
    'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png';

  return (
    <div className="SignUp" data-testid="comp-1">
      <div className="form-container">
        <h3>{sentenceCase(CREATE_ACCOUNT)}</h3>
        <Avatar
          size={100}
          src={image ? URL.createObjectURL(image) : defaultImg}
        />
        <p
          id="chooseprofile"
          {...register('chooseprofile', { required: true })}
        >
          <ChooseProfile handleImage={handleProfilePic} />
        </p>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              {titleCase(NAME)}
              <input
                type="name"
                className="form-control"
                id="name"
                {...register('name', { required: true })}
              />
            </label>
            {errors.name && <p className="error">Please enter the name</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail1" className="form-label">
              {titleCase(EMAIL_ADDRESS)}
              <input
                type="text"
                className="form-control"
                id="inputEmail1"
                {...register('email', {
                  required: true,
                  pattern: EMAIL_PATTERN,
                })}
              />
            </label>
            {errors.email && (
              <p className="error">
                Email should contain the '@' and '.' symbol.
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              {titleCase(PASSWORD)}
              <input
                type="password"
                className="form-control"
                id="inputPassword1"
                {...register('password', {
                  required: true,
                  pattern: PASSWORD_PATTERN,
                })}
              />
            </label>
            {errors.password && (
              <p className="error">
                Password should have 1 Capital, 1 small letter and should be
                6-15 characters long.
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              {titleCase(CONFIRM_PASS)}
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                {...register('confirmPass', {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                })}
              />
            </label>
            {errors.confirmPass && (
              <p className="error">Please enter the password entered above.</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            {titleCase(CONTINUE)}
          </button>
        </form>
        <span id="meta-info">
          <Link to="/login">{sentenceCase(HAVE_ACCOUNT)}</Link>
        </span>
        <p className="meta">
          {sentenceCase(META)}
          <span id="terms">{titleCase(TERMS)}</span> {AND}
          <span id="terms">{titleCase(POLICY)}</span>.
        </p>
      </div>
    </div>
  );
}
