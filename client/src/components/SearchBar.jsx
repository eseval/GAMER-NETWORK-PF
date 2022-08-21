import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNewsByTitle } from "../redux/actions";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

const Container = styled.div`
  height: 30px;
  background-color: whitesmoke;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Input = styled.input`
  border: none;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: black;
  size: 20px;
`


export default function SearchBar() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNewsByTitle(title));
    setTitle('');
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    } else if (title[0] === " ") {
      setTitle(title.substring(1));
    }
  }

  return (
      <Container>
        <Wrapper>
          <Input
              type="text"
              placeholder="Search for a news"
              value={ title }
              onChange={ (e) => handleOnChange(e) }
              onKeyDown={ (e) => handleKeyPress(e) }
          />
          <Button
              type="submit"
              onClick={ (e) => handleSubmit(e) }><BsSearch/></Button>
        </Wrapper>
      </Container>
  )
}