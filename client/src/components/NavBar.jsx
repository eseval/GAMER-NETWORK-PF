import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import styledNavBar from "../styles/NavBar";

const {Container, Wrapper, Left, SearchContainer, Input, Center, Logo, Right, MenuItem} = styledNavBar();

const Navbar = () => {
  return (
      <Container>
        <Wrapper>
          <Left>
            <SearchContainer>
              <Input placeholder="search"/>
              <BiSearchAlt style={ {color: "gray", fontSize: 16} }/>
            </SearchContainer>
          </Left>
          <Center>
            <Logo>PLAY CENTER</Logo>
          </Center>
          <Right>
            <MenuItem to="/contact">Contact Us</MenuItem>
            <MenuItem to="/about">About</MenuItem>
          </Right>
        </Wrapper>
      </Container>
  );
};

export default Navbar;
