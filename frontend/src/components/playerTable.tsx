import React from "react";
import styled from "styled-components";
import { Player } from "../common/types";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

interface Props {
  players: Player[];
}

export default function PlayerTable(props: Props): JSX.Element {
  const { players } = props;
  return (
    <Container>
      <table className="table text-white">
        <thead>
          <tr className="text-center">
            <th colSpan={4}><div className="fs-2">All Players</div></th>
          </tr>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player._id}>
              <th scope="row">{player.name}</th>
              <td>{player.status}</td>
              <td>
                <button disabled={player.status === 'offline'} className="btn btn-outline-primary text-white border-white" type="button">Challenge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}