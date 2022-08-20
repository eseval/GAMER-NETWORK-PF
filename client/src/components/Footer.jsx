import { Link } from "react-router-dom";
import styledFooter from './../styles/Footer'

const {Container, Left, Logo, Description, Center, Title, List, ListItem, Right} = styledFooter();

export default function Footer() {
  return (
      <Container>
        <Left>
          <Logo>TITLE GOES HERE</Logo>
          <Description>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Description>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>
              <Link to="/home">Home</Link>
            </ListItem>
            <ListItem>
              <Link to="/about">About Us</Link>
            </ListItem>
            <ListItem>
              <Link to="/contact">Contact Us</Link>
            </ListItem>
            <ListItem> Video-games</ListItem>
          </List>
        </Center>
        <Right>
        </Right>
      </Container>
  );
}