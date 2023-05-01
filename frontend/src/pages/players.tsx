import { toast } from "react-toastify";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getPlayers from "../services/getPlayers";
import { selectUser } from "../store/reducers/user";
import { useAppDispatch, useAppSelector } from "../hooks";
import playerChallenge from "../services/playerChallenge";
import acceptChallenges from "../services/acceptChallenge";
import { PlayersFail, PlayersInit, PlayersSuccess, selectPlayers } from "../store/reducers/players";
import Layout from "../layout";

const Container = styled.div`
width: 800px;
.table-title {
    width: 100%;
    font-size: 36px;
}
td button {
  width: 120px;
  height: 30px;
}`;

export default function Players(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const playersState = useAppSelector(selectPlayers);
  const loggedInUser = useAppSelector(selectUser).user;

  const handleResponse = (response: string, id: string, name: string) => {
    if (response === 'accept') {
      acceptChallenges({ token: loggedInUser.token, challengerId: id })
        .then((response) => {
          toast('Challenge Accepted!');
          const options = {
            playerOne: { name: loggedInUser.userName, id: loggedInUser.userId },
            playerTwo: { name: name, id: id }
          };
          navigate('/game', { state: options });
        });
      return;
    }

    if (response === 'challenge') {
      playerChallenge({ token: loggedInUser.token, challengedId: id })
        .then((response) => {
          getPlayers({ token: loggedInUser.token })
            .then((response) => {
              dispatch(PlayersSuccess(response.players));
            })
            .catch(error => {
              dispatch(PlayersFail(error.msg));
            });
          toast.success(response.msg);
        })
        .catch((error) => {
          toast.error(error.msg);
        })
    }
  }

  useEffect(() => {
    dispatch(PlayersInit());
    getPlayers({ token: loggedInUser.token })
      .then((response) => {
        dispatch(PlayersSuccess(response.players));
      })
      .catch(error => {
        dispatch(PlayersFail(error.msg));
      })
  }, [dispatch, loggedInUser]);

  return (
    <Layout>
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
            {playersState.players.map((player) => (
              <tr key={player.id}>
                <th scope="row">{player.name}</th>
                <td>{player.onlineStatus}</td>
                <td>
                  <button
                    type="button"
                    disabled={player.challengeStatus === 'pending' || playersState.isLoading}
                    className="py-0 btn btn-outline-primary text-white border-white"
                    onClick={() => handleResponse(player.challengeStatus, player.id, player.name)}
                  >
                    <div className="text-capitalize">{player.challengeStatus}</div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Layout>
  );
}