import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
`;

const StateName = styled.div`
  font-weight: bold;
`;

const Field = styled.div`
  font-size: 0.9rem;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PopperBox({ anchorEl, anchorName, data, open }) {
  const classes = useStyles();

  const id = open ? "transitions-popper" : undefined;
  if (data && data.state) {
    return (
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Container className={classes.paper}>
              <StateName>{anchorName}</StateName>
              <Field>Deaths: {data.death ? data.death : 0}</Field>
              <Field>
                Hospitalized: {data.hospitalized ? data.hospitalized : 0}
              </Field>
              <Field>
                Death increase on the last 3 days: {data.deathIncrease}
              </Field>
              <Field></Field>
            </Container>
          </Fade>
        )}
      </Popper>
    );
  } else {
    return <></>;
  }
}
