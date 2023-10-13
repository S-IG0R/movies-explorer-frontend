import { useEffect } from 'react';
import './SwitchButton.css';
import { useForm } from '../../hooks/useForm';

export function SwitchButton({
  title,
  name,
  setShortMoviesChecked,
  // searchParams,
  handleSubmit,
  shortMoviesCheckbox
}) {
  const { values, handleChange, setValues } = useForm({
    shortMovies: {
      value: '',
      isChecked: '',
    },
  });

  const onChangeCheckbox = (evt) => {
    handleChange(evt);
    handleSubmit(evt);
  };

  useEffect(() => {
    setShortMoviesChecked(values.shortMovies.isChecked);
  }, [onChangeCheckbox]);

  useEffect(() => {
    setValues({
      shortMovies: {
        isChecked: shortMoviesCheckbox === 'true' ? true : false,
      },
    });
  }, [shortMoviesCheckbox]);

  return (
    <>
      <input
        className="switch"
        id="switch"
        type="checkbox"
        name={name}
        onChange={onChangeCheckbox}
        checked={values.shortMovies.isChecked}
      />
      <label className="switch-label" htmlFor="switch">
        {title}
      </label>
    </>
  );
}
