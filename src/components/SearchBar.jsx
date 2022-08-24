import React, { useState } from "react";
import styledSearchBar from "../styles/SearchBar";
import {searchBarsearch , getAllNews} from "../redux/actions/index"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
const { Container, Wrapper, Input } = styledSearchBar();

export default function Search(){
  
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(getAllNews())
  }, [dispatch]);

  const allNews = useSelector(state => state.allNews);

  function handleOnChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
    dispatch(searchBarsearch(e.target.value));

  }


  return (
    <Container>
      <Wrapper>
        <Input
          type="text"
          placeholder="Search for a news"
          onChange={handleOnChange}
          list="data"
          id="inputSearch"
        />
        <datalist id="data">
                {typeof allNews === "object"  ? allNews.map(e =>
                    <option key={e.id} value={e.title}></option>
                ): ""}
        </datalist>
        </Wrapper>
    </Container>
  );

}


