import styled from "styled-components";

export default function Footer() {
  const Container = styled.footer`
    display: flex;
    background-color: grey;
  `;

  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;

  const Logo = styled.h1``;

  const Description = styled.p`
    margin: 20px 0;
  `;

  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;

  const Title = styled.h3`
    margin-bottom: 30px;
  `;

  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;

  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;

  const Right = styled.div`
    flex: 1;
    padding: 20px;
  `;

  return {Container, Left, Logo, Description, Center, Title, List, ListItem, Right};
}