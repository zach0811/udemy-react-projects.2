import { useState } from "react";

export const useInput = (defaultValue, validationFunction) => {
  const [enteredValues, setEnteredValues] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFunction(enteredValues);

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  const handleInputChange = (event) => {
    setEnteredValues(event.target.value);
    setDidEdit(false);
  };

  return {
    value: enteredValues,
    handleInputBlur,
    handleInputChange,
    hasError: !valueIsValid && didEdit,
  };
};
