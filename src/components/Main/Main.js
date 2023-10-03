import './Main.css'
import { AboutProject } from '../AboutProject/AboutProject';
import { Promo } from '../Promo/Promo';
import { Tech } from '../Tech/Tech';
import { AboutMe } from '../AboutMe/AboutMe';

export function Main() {
  return (
    <>
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
    </>
  );
}
