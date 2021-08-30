import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../image/logo.png";

const route = [
  { title: "Home", path: "/" },
  { title: "Feed", path: "/feed" },
  { title: "Logout", path: "/login", onClick: true },
];

function Header() {
  const history = useHistory();

  const clickLogo = useCallback(() => {
    history.push("/");
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.setItem("isAuthorized", "false");
    history.push("/login");
  }, []);

  return (
    <>
      <SytledHeader>
        <SytledImg src={logo} onClick={clickLogo} />
        <SytledUl>
          {route.map(({ title, path, onClick }, index) => (
            <SytledLi key={index} onClick={onClick ? handleLogout : null}>
              <Link to={path}>
                <span>{title}</span>
              </Link>
            </SytledLi>
          ))}
        </SytledUl>
      </SytledHeader>
    </>
  );
}

const SytledHeader = styled.header`
  display: flex;
  flex-direction: row;
  height: 36px;
  background-color: lightskyblue;
  margin: 0px;
  cursor: pointer;
`;
const SytledImg = styled.img`
  width: 140px;
  heigth: 34px;
`;
const SytledUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  list-style: none;
  padding: 0px;
  margin: 0px;
`;
const SytledLi = styled.li`
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;
export default Header;
