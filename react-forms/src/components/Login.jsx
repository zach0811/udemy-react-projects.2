import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const handleSubmit = (event) => {
    console.log("submitted");
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    !enteredEmail.includes("@")
      ? setEmailIsValid(false)
      : setEmailIsValid(true);
    enteredPassword.trim().length < 6
      ? setPasswordIsValid(false)
      : setPasswordIsValid(true);
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevState) => {
      return {
        ...prevState,
        [identifier]: value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" ref={email} />
          <div>
            {emailIsValid === false && (
              <p className="error-text">Please enter a valid email.</p>
            )}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
          <div>
            {passwordIsValid === false && (
              <p className="error-text">Please enter a valid password.</p>
            )}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
