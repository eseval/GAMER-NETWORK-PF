import styled from "styled-components";

export default function NavBar() {
  const Container = styled.div`
    height: 60px;
    background-color: whitesmoke;
  `;

  const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
  `;

  const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
  `;
  const Input = styled.input`
    border: none;
  `;
  const Center = styled.div`
    flex: 1;
    text-align: center;
  `;
  const Logo = styled.h1`
    font-weight: bold;
  `;
  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `;
  const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-right: 25px;
  `;
  return {Container, Wrapper, Left, SearchContainer, Input, Center, Logo, Right, MenuItem};
}