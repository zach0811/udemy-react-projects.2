import { Input } from "./Input";

export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const acquisitionChannel = formData.getAll("acquisition");
    const data = Object.fromEntries(formData);
    data.acquisition = acquisitionChannel;
    console.log(data);
  };

  const handleReset = (event) => {
    const form = event.target.form;
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <Input
        htmlFor="email"
        label="Email"
        id="email"
        type="email"
        name="email"
        required={true}
      />

      <div className="control-row">
        <Input
          id="password"
          htmlFor="password"
          label="Password"
          type="password"
          name="password"
          required={true}
        />

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <Input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <Input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <Input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>

        <Input
          type="checkbox"
          id="google"
          name="acquisition"
          value="google"
          label={"Google"}
          htmlFor="google"
        />

        <Input
          type="checkbox"
          id="friend"
          name="acquisition"
          value="friend"
          htmlFor="friend"
          label={"Referred by friend"}
        />

        <Input
          type="checkbox"
          id="other"
          name="acquisition"
          value="other"
          htmlFor="other"
          label="other"
        />
      </fieldset>

      <Input
        htmlFor="terms-and-condtions"
        label={"I agree to the terms and conditions"}
        type="checkbox"
        id="terms-and-conditions"
        name="terms"
      />

      <p className="form-actions">
        <button
          type="reset"
          onClick={handleReset}
          className="button button-flat"
        >
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
