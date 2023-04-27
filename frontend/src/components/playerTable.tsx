import React from "react";
import styled from "styled-components";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

export default function PlayerTable(): JSX.Element {
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
          <tr>
            <th scope="row">Mark</th>
            <td>Online</td>
            <td><button className="btn btn-outline-primary text-white border-white" type="button">Challenge</button></td>
          </tr>
          <tr>
            <th scope="row">Jacob</th>
            <td>Offline</td>
            <td><button disabled className="btn btn-outline-primary text-secondary border-white" type="button">Challenge</button></td>
          </tr>
          <tr>
            <th scope="row">Larry</th>
            <td>Online</td>
            <td><button className="btn btn-outline-primary text-white border-white" type="button">Challenge</button></td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}