import './SearchForm.css';
import { SwitchButton } from '../SwitchButton/SwitchButton';
import { useForm } from '../../hooks/useForm';
import { useEffect, useState } from 'react';

export function SearchForm({
  name,
  setSearchQuery,
  setShortMoviesChecked,
  handleSubmitSearchForm,
  searchParams
}) {
  const [isInputValid, setIsInputValid] = useState(false);
  const { values, handleChange, setValues } = useForm({
    search: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
  });

  useEffect(()=>{
    setValues({
      search: {
        value: searchParams.query ?? '',
      },
    })
  }, [searchParams]) 

  // обработчик поиска
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // если значения нет в инпуте
    if (!values.search.value) {
      // установим стейт невалидного поля
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
      setSearchQuery(values.search.value);
      handleSubmitSearchForm();
    }
  };

  return (
    <section className="search-section">
      <form
        className="search-section__form"
        name={name}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-section__form-container">
          <input
            className={`search-section__input ${
              isInputValid && 'search-section__input_error'
            }`}
            name="search"
            type="text"
            placeholder={isInputValid ? 'Нужно ввести ключевое слово' : 'Фильм'}
            minLength="1"
            value={values.search.value}
            onChange={handleChange}
            required
          />
          <button className="search-section__submit-button" type="submit" />
        </div>
        <SwitchButton
          title="Короткометражки"
          name="shortMovies"
          setShortMoviesChecked={setShortMoviesChecked}
          searchParams={searchParams}
        />
        <div className="search-section__line" />
      </form>
    </section>
  );
}
