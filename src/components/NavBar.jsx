import React from "react";
import { Link } from "react-router-dom";
import styledNavBar from "../styles/NavBar";
import SearchBar from "./SearchBar";

const {Container, Wrapper, Left, SearchContainer, Input, Center, Logo, Right, MenuItem} = styledNavBar();

const Navbar = ({ user }) => {
  return (
    <Container>
      <Wrapper>
        <Left>
          {/*<SearchContainer>*/ }
          {/*  <Input placeholder="search"/>*/ }
          {/*  <BiSearchAlt style={ {color: "gray", fontSize: 16} }/>*/ }
          {/*</SearchContainer>*/ }
          <SearchBar />
        </Left>
        <Center>
          <Logo>PLAY CENTER</Logo>
        </Center>
        <Right>
          <MenuItem to="/contact">Contact Us</MenuItem>
          <MenuItem to="/about">About</MenuItem>
          {user?<MenuItem><Link to={`/profile/${user.id}`}>Profile</Link></MenuItem>:""}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
