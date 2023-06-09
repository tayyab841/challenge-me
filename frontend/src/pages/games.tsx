import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Game } from "../common/types";
import { useAppSelector } from "../hooks";
import getGames from "../services/getGames";
import { selectUser } from "../store/reducers/user";
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

export default function Games(): JSX.Element {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loggedInUser = useAppSelector(selectUser).user;

  useEffect(() => {
    if (loggedInUser.token) {
      setIsLoading(true);
      getGames({ token: loggedInUser.token })
        .then((response) => {
          setIsLoading(false);
          setGames(response.games || []);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.msg);
        });
    }
  }, [loggedInUser]);

  const navigateToGame = (game: Game) => {
    navigate('/game', { state: game });
  }

  return (
    <Layout>
      <Container>
        <table className="table text-white">
          <thead>
            <tr className="text-center">
              <th colSpan={2}><div className="fs-2">Your Games</div></th>
            </tr>
            <tr>
              <th scope="col">Player Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} className="text-center">Loading ...</td>
              </tr>
            ) : (
              <React.Fragment>
                {games.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center">No ongoing games! Start challenging other.</td>
                  </tr>
                ) : (
                  <React.Fragment>
                    {games.map((game) => (
                      <tr key={game.id}>
                        <th scope="row">{loggedInUser.userName === game.playerOne.name ? game.playerTwo.name : game.playerOne.name}</th>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-primary text-white border-white"
                            onClick={() => navigateToGame(game)}
                          >
                            Go to Game
                          </button>
                        </td>
                      </tr>
                    ))}
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