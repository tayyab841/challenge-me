import styled from "styled-components";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import { Player } from "../common/types";
import getPlayerStats from "../services/getPlayerStats";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUser } from "../store/reducers/user";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

export default function StatsTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState<Player[]>([]);
  const loggedInUser = useAppSelector(selectUser).user;

  let rank = 0;

  useEffect(() => {
    if (loggedInUser.token) {
      getPlayerStats({ token: loggedInUser.token })
        .then((response) => {
          setPlayers(response.players || []);
        })
        .catch((error) => {
          toast.error(error.msg);
        });
    }
  }, [dispatch, loggedInUser])

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
                <td>{player.games_played > 0 ? (player.games_won / player.games_played) * 100 : 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  );
}