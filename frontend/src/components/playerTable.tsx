import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import getPlayers from "../services/getPlayers";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

interface Player {
  id: string,
  name: string;
  onlineStatus: string;
  challengeStatus: string;
}

export default function PlayerTable(): JSX.Element {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();
  const loggedInUser = useAppSelector((state) => state.user.user);

  const handleResponse = (response: string, id: string, name: string) => {
    const options = {
      player_one: { name: loggedInUser.userName, id: loggedInUser.userId },
      player_two: { name: name, id: id }
    };
    navigate('/game', { state: options });
  }

  useEffect(() => {
    getPlayers({ token: loggedInUser.token })
      .then((response) => {
        setPlayers(response.players || []);
      })
      .catch(error => {
        console.log(error);
      })
  }, [loggedInUser])

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
            <tr key={player.id}>
              <th scope="row">{player.name}</th>
              <td>{player.onlineStatus}</td>
              <td>
                {player.challengeStatus === 'accept' || player.challengeStatus === 'challenge' ?
                  (
                    <button
                      type="button"
                      onClick={() => handleResponse(player.challengeStatus, player.id, player.name)}
                      className="btn btn-outline-primary text-white border-white"
                    >
                      <div className="text-capitalize">{player.challengeStatus}</div>
                    </button>
                  ) : (
                    <p>Response Pending</p>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}