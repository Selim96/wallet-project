import React, { Fragment } from "react";
import Media from "react-media";
import s from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";

const toggle = ({ isActive }) => {
  return isActive ? s.active__link : s.nav__link;
};

const Navigation = () => {
  return (
    <>
      <Media
        queries={{ small: "(max-width:767px)", medium: "(min-width:768px)" }}
      >
        {(matches) => (
          <Fragment>
            {matches.small && (
              <nav className={s.nav}>
                <NavLink to="/home" className={toggle}>
                  <div className={s.icon__wrapper}>
                    <AiFillHome
                      style={{ width: "27", height: "23", color: "white" }}
                    />
                  </div>
                </NavLink>
                <NavLink to="/diagram" className={toggle}>
                  <div className={s.icon__wrapper}>
                    <MdShowChart
                      style={{ width: "28", height: "18", color: "white" }}
                    />
                  </div>
                </NavLink>
                <NavLink to="/currency" className={toggle}>
                  <div className={s.icon__wrapper}>
                    <FaDollarSign
                      style={{ width: "13", height: "22", color: "white" }}
                    />
                  </div>
                </NavLink>
              </nav>
            )}
            {matches.medium && (
              <nav className={s.nav}>
                <NavLink to="/home" className={toggle}>
                  <div className={s.icon__wrapper}>
                    <AiFillHome
                      style={{ width: "18", height: "18", color: "white" }}
                    />
                  </div>
                  <p className={s.text}>Main page</p>
                </NavLink>
                <NavLink to="/diagram" className={toggle}>
                  <div className={s.icon__wrapper}>
                    <MdShowChart
                      style={{ width: "28", height: "18", color: "white" }}
                    />
                  </div>

                  <p className={s.text}>Statistics page</p>
                </NavLink>
              </nav>
            )}
          </Fragment>
        )}
      </Media>
    </>
  );
};
export default Navigation;
