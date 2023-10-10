import { useEffect } from 'react';
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
      value: '',
      isChecked: '',
    },
  });

  useEffect(() => {
    setShortMoviesChecked(values.shortMovies.isChecked);
  }, [handleChange]);

  useEffect(() => {
    setValues({
      shortMovies: {
        isChecked: searchParams.shortMovies === 'true' ? true : false,
      },
    });
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
