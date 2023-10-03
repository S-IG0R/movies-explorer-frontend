import { SwitchButton } from '../SwitchButton/SwitchButton';
import './SearchForm.css';
export function SearchForm() {
  return (
    <div className="search-section">
      <form className="search-section__form" name="search-movie">
        <div className="search-section__form-container">
          <input
            className="search-section__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search-section__submit-button" />
        </div>
        <SwitchButton title="Короткометражки" />
        <div className='search-section__line'/>
      </form>
    </div>
  );
}
