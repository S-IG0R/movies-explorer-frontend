import './Profile.css';
export function Profile({ setLoggedIn }) {
  const handleLogout = () => {
    setLoggedIn(false);
  };
  return (
    <section className="profile">
      <p className="profile__name">{`Привет, ${'Виталий'}!`}</p>
      <form className="profile__form" name="profile-form">
        <label className="profile__input-label">
          Имя
          <input
            className="profile__input"
            type="text"
            name="name"
            value="Виталий"
            required
          />
        </label>
        <label className="profile__input-label">
          E-mail
          <input
            className="profile__input"
            type="text"
            name="email"
            value="pochta@yandex.ru"
            required
          />
        </label>
        <button className="profile__button-edit" type="submit">
          Редактировать
        </button>
      </form>
      <button
        className="profile__button-logout"
        type="button"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}
