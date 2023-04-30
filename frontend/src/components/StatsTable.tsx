import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Player } from "../common/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import getPlayerStats from "../services/getPlayerStats";
import { loginFail, loginInit, loginSuccess } from "../store/reducers/user";
import userLogout from "../services/userLogout";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

export default function StatsTable(): JSX.Element {
  const [players, setPlayers] = useState<Player[]>([]);
  const loggedInUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  let rank = 0;

  useEffect(() => {
    if (loggedInUser.token) {
      getPlayerStats({ token: loggedInUser.token })
        .then((response) => {
          setPlayers(response.players || []);
        })
        .catch((err) => {
          // if current user token is expired, update the server
          if (err.msg === "Invalid Token") {
            dispatch(loginInit());
            userLogout({ token: loggedInUser.token })
              .then(() => {
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_token");
                dispatch(loginSuccess({ userName: '', userId: '', token: '' }));
              })
              .catch((err) => {
                dispatch(loginFail(err.msg))
              });
          }
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