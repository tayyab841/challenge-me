import React from "react";
import styled from "styled-components";

const Container = styled.div`
.table-title {
    width: 100%;
    font-size: 36px;
}`;

export default function StatsTable(): JSX.Element {
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>56</td>
            <td>89</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>78</td>
            <td>76</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td>45</td>
            <td>64</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}