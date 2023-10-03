import './BurgerButton.css'
export function BurgerButton({ setIsBurgerMenuOpen }) {
  const handleClickBurger = () => {
    setIsBurgerMenuOpen(true);
  }
  return (
    <button className="burger-menu-button" onClick={handleClickBurger} type='button'/>
  )
}