import React from "react";
const Input = props => {
  let inputElement = null;
  console.log("Props", props);
  let inputClasses = ["form-control"];
  if (props.touched && !props.valid) {
    inputClasses.push("is-invalid");
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;
    case "password":
      inputElement = (
        <input
          {...props.elementConfig}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={props.className}>
      <label htmlFor={props.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
