import styled from "styled-components";

export default function styledSearchBar() {
  const Container = styled.div`
    height: 30px;
    background-color: whitesmoke;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
  `;

  const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Input = styled.input`
    border: none;
  `;

  const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: black;
    size: 20px;
  `;
  return { Container, Wrapper, Input, Button };
}