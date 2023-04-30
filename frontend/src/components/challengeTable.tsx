import React from "react";
import styled from "styled-components";
import { Challenge } from "../common/types";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

interface Props {
  challenges: Challenge[];
}

export default function ChallengeTable(props: Props): JSX.Element {
  const { challenges } = props;

  return (
    <Container>
      <table className="table text-white">
        <thead>
          <tr className="text-center">
            <th colSpan={2}><div className="fs-2">Pending Challenges</div></th>
          </tr>
          <tr>
            <th scope="col">Challenger</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id}>
              <th scope="row">{challenge.name}</th>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-primary text-white border-white"
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}