import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Popper from "./components/Popper";
import Paths from "./StatesInfo";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--pink);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--dark-blue);
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  font-family: var(--header-font);
  text-indent: 20px;
  font-weight: 900;
  color: var(--magenta);
`;

const Highlight = styled.div`
  color: var(--pink);
`;

const RecentBox = styled.p`
  padding: 10px;
  border: solid 2px var(--magenta);
  background-color: var(--magenta);
  color: var(--pink);
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
`;

const Canvas = styled.svg`
  height: 589px;
  width: 1000px;

  @media only screen and (max-width: 1000px) {
    transform: scale(0.7);
  }
  @media only screen and (max-width: 700px) {
    transform: scale(0.5);
  }
  @media only screen and (max-width: 500px) {
    transform: scale(0.3);
  }
`;

const Path = styled.path`
  stroke-width: 1;
  stroke: var(--magenta);
  fill: var(--orange);
  color: black;
  text-align: center;
  font-size: 1rem;
  content: ${(props) => props.dataId};
  :hover {
    fill: var(--magenta);
  }
  ::after {
    content: " (" attr(id) ")";
  }
`;

export default () => {
  const [selected, setSelected] = useState(null);
  const [states, setStates] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorName, setAnchorName] = useState(null);
  const [popper, setPopper] = useState(false);
  const [recentDeaths, setRecentDeaths] = useState(0);

  useEffect(() => {
    fetch("/api/states")
      .then((res) => res.json())
      .then((data) => {
        setStates(data.statesData);
        setRecentDeaths(data.recentDeaths);
      });
  }, []);

  const select = (e) => {
    e.stopPropagation();
    setSelected(e.target.id);
    setAnchorEl(anchorEl ? null : e.target);
    const stateName = Array.from(e.target.classList).pop();
    setAnchorName(stateName);
    setPopper(true);
  };

  return (
    <Container>
      <Header>
        <Highlight>Covid</Highlight> Tracking
      </Header>
      <RecentBox>
        Total deaths in the USA in the last 3 days:{" "}
        {recentDeaths > 0 && recentDeaths}
      </RecentBox>
      <Popper
        {...{
          anchorEl,
          anchorName,
          data: states.find((st) => st.state === selected),
          open: popper,
        }}
      />

      <Canvas>
        {Paths.map((st) => (
          <Path
            onMouseEnter={select}
            onMouseLeave={() => setPopper(false)}
            key={st.id}
            className={st.className}
            active={selected}
            id={st.id}
            d={st.d}
          />
        ))}
      </Canvas>
    </Container>
  );
};
