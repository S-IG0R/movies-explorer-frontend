import { useState } from 'react';

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    // достаем нужные поля из элемента инпута
    const { value, name, validationMessage } = event.target;
    const { valid } = event.target.validity;

    // записываем их значения в объект с ключом-именем инпута
    setValues({
      ...values,
      [name]: {
        value: value,
        isValid: valid,
        validationMessage: validationMessage,
      },
    });
  };
  return { values, handleChange, setValues };
}
