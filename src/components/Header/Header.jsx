import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconContext } from "react-icons";
import { FaUser } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5'
import authSelectors from 'redux/session/session-selectors';
import globalSelectors from 'redux/global/global-selectors';
import { toggleModalLogout } from "redux/global/global-slice";
import Container from "components/Container";
import ModalLogout from '../ModalLogout/ModalLogout';
import  {Logo}  from 'components/Icon/Logo';
import s from './Header.module.scss'

const Header = () => {
  const name = useSelector(authSelectors.getUsername);
  const modalOpen = useSelector(globalSelectors.getIsModalLogout);
  const dispatch = useDispatch();
   const isOpenModal = () => {
     dispatch(toggleModalLogout());
   }
  return (
    <header>
      <Container>
        <section className={s.header}>
        <Link to='/home'  className={s.link}>
            <Logo svg={s.link__logo}/>
          <p className={s.link__title}>Wallet</p>
          </Link>
          <div className={s.wrapper}>
        <div className={s.user}>
              <IconContext.Provider value={{ color: "#bdbdbd", className: "global-class-name", size: "18px" }}>
                <div className={s.icon}>
            <FaUser />
                </div>
            <span className={s.user__name}>{name}</span>
          </IconContext.Provider>
        </div>
          <IconContext.Provider value={{  className: "global-class-name", size: "24px" }}>
          <button className={s.logout__button} type='button' onClick={isOpenModal}>
                <IoExitOutline/>
              <span className={s.logout__text}>Exit</span>
        </button>
          </IconContext.Provider>
            </div>
          {modalOpen && <ModalLogout />}
          </section>
      </Container>
    </header>
  );
};
export default Header;
