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

export default function StatsTable(props: Props): JSX.Element {
  const { players } = props;

  let rank = 0;

  return (
    <Container>
      <table className="table text-white">
        <thead>
          <tr className="text-center">
            <th colSpan={4}><div className="fs-2">Players Statistics</div></th>
          </tr>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Games Played</th>
            <th scope="col">Winning Percentage</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            rank++;
            return (
              <tr key={player._id}>
                <th scope="row">{rank}</th>
                <td>{player.name}</td>
                <td>{player.games_played}</td>
                <td>{player.win_percentage}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  );
}