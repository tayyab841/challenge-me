import styled from "styled-components";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import { Player } from "../common/types";
import getPlayerStats from "../services/getPlayerStats";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUser } from "../store/reducers/user";
import Layout from "../layout";

const Container = styled.div`
width: 800px;
.table-title {
    width: 100%;
    font-size: 36px;
}`;

export default function Stats(): JSX.Element {
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loggedInUser = useAppSelector(selectUser).user;

  let rank = 0;

  useEffect(() => {
    if (loggedInUser.token) {
      setIsLoading(true);
      getPlayerStats({ token: loggedInUser.token })
        .then((response) => {
          setIsLoading(false);
          setPlayers(response.players || []);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.msg);
        });
    }
  }, [dispatch, loggedInUser])

  return (
    <Layout>
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
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">Loading ...</td>
              </tr>
            ) : (
              <React.Fragment>
                {players.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No Players!</td>
                  </tr>
                ) : (
                  <React.Fragment>
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
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </tbody>
        </table>
      </Container>
    </Layout>
  );
}