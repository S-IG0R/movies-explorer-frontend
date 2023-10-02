import './Promo.css'
import { NavTab } from '../NavTab/NavTab'

export function Promo() {
  return(
    <section className="promo">
      <div className='promo__banner'>
        <h1  className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab />
      </div>
    </section>
  )
}