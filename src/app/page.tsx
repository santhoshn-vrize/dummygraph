// import { Link } from 'next/link';
// TODO explore Link component here is crashing the page
"use client";
import React from "react";

import Chart from "../components/Graph";
const graphbgurl =
  "https://dev-p2p-synergy.s3.ap-south-1.amazonaws.com/chartbgimage+3.svg"; //default URL

export default function Home() {
  const labels = [
    "New RFQs",
    "Acknowledged RFQs",
    "Ordered",
    "Quoted RFQs",
    "Acknowledged RFQs",
    "Cancelled",
  ]; // default label
  const dataValues = [282, 132, 124, 233, 156, 160]; // default values
  const activePrLabel = "# Invoice"; // default value
  const title = "Summary of RFQs"; // default value
  const sumLabel = 747; // default value

  return (
    <div>
      <Chart
        labels={labels}
        dataValues={dataValues}
        activePrLabel={activePrLabel}
        title={title}
        sumLabel={sumLabel}
        graphbgurl={graphbgurl}
      />
      {/* <CustomGraph
        labels={labels}
        dataValues={dataValues}
        activePrLabel={activePrLabel}
        title={title}
        sumLabel={sumLabel}
        graphbgurl={graphbgurl}
      /> */}
      {/* <Link href="/en/quote-requests">Quote Requests</Link> */}
    </div>
  );
}
