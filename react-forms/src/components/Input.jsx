export const Input = ({ label, required, name, type, id, error, ...props }) => {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} type={type} name={name} required={required} />
    </div>
  );
};
