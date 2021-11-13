import { useState } from 'react';
import { useCookies } from 'react-cookie';
import envelope from '@assets/images/envelope-solid.svg';
import infoCircle from '@assets/images/info-circle-solid.svg';
import { instance as axios } from '@/common/axios/instance';

function Login() {
  const fields = {
    email: '',
    password: '',
  };
  const [values, setValues] = useState({ ...fields });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cookies, setCookie] = useCookies(['bearer']);

  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const formSubmit = async (e) => {
    if (e) e.preventDefault();
    setSuccess(false);
    setIsSubmitting(true);
    await setErrors(validate(values));

    try {
      const { data } = await axios.post('login', {
        email: values.email,
        password: values.password,
      });
      setCookie('bearer', data, { path: '/' });
      setSuccess(true);
    } catch (error) {
      setErrors({ response: error.response.data });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center bg-navy-1 h-screen">
      <div className="bg-white rounded py-8 px-4 shadow-1 w-64">
        <h1 className="text-3xl text-center mb-4 font-light">Login</h1>
        {Object.values(errors).length > 0 && (
          <div className="bg-red-500 mb-2 rounded p-2">
            {Object.values(errors).map((error, i) => (
              <p className="text-white" key={i}>
                {error}
              </p>
            ))}
          </div>
        )}
        {success && (
          <div className="bg-green-500 mb-2 rounded p-2">
            <p className="text-white">Succesfully login</p>
          </div>
        )}
        <form className="form" onSubmit={formSubmit}>
          <div className="mb-4">
            <div
              className={`form__input-group ${
                errors.email ? 'form__input-group--error' : ''
              }`}
            >
              <img className="form__input-group-icon" src={envelope} alt="" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={values.email || ''}
              />
            </div>
            <div
              className={`form__input-group form__input-group--no-mb ${
                errors.password ? 'form__input-group--error' : ''
              }`}
            >
              <img className="form__input-group-icon" src={infoCircle} alt="" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password || ''}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="uppercase text-xs text-white bg-blue-1 py-3 px-8 rounded font-bold"
              disabled={isSubmitting}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
