import { useEffect, useState } from 'react';
import './SwitchButton.css';
import { useForm } from '../../hooks/useForm';

export function SwitchButton({
  title,
  name,
  setShortMoviesChecked,
  searchParams,
}) {
  const { values, handleChange, setValues } = useForm({
    shortMovies: {
      // isValid: '',
      // validationMessage: '',
      value: '',
      isChecked: '',
    },
  });

  useEffect(() => {
    setShortMoviesChecked(values.shortMovies.isChecked);
  }, [handleChange]);

  useEffect(() => {
    const searchParams = localStorage.getItem('searchParams');
    if (searchParams) {
      const params = JSON.parse(searchParams);
      const checkboxState = params.shortMovies;
      if (checkboxState === 'true') {
        setValues({ shortMovies: { isChecked: true } });
      } else {
        setValues({ shortMovies: { isChecked: false } });
      }
      
    }
  }, []);

  return (
    <>
      <input
        className="switch"
        id="switch"
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={values.shortMovies.isChecked}
      />
      <label className="switch-label" htmlFor="switch">
        {title}
      </label>
    </>
  );
}
