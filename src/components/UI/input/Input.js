import React from "react";
import classes from "./Input.css";

const input = props => {
  const inputClasses = [classes.InputElement];
  let inputErrorMsg = null;
  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
    inputErrorMsg = <p className={classes.ValidationError}>{props.errorMessage}</p>
  }
  const inputClassesStr = inputClasses.join(" ");

  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClassesStr}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClassesStr}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClassesStr}
          value={props.elementValue}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClassesStr}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.elementLabel}</label>
      {inputElement}
      {inputErrorMsg}
    </div>
  );
};

export default input;
