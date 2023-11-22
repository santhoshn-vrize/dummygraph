import * as React from "react";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  DoughnutController,
  registerables as _registerables,
  ChartComponent,
} from "chart.js/auto";
import { Registry, ChartComponentLike } from "chart.js/auto";
import * as Chart from "chart.js/auto";
import "./styles.css";

type DoughnutChartData = Chart.ChartData<"doughnut", number[], unknown>;

interface ExtendedRegistry extends Registry {
  register(...controllers: ChartComponentLike[]): void;
  addControllers(...controllers: ChartComponentLike[]): void;
}

const registry = Chart.registry as ExtendedRegistry;

interface CustomizableCardProps {
  title: string;
  chartData: DoughnutChartData;
  activePrLabel: string;
  sumLabel: number;
  backgroundColors: string[];
  graphbgurl: string;
}

const CustomizableCard: React.FC<CustomizableCardProps> = ({
  title,
  chartData,
  activePrLabel,
  sumLabel,
  backgroundColors,
  graphbgurl,
}) => {
  const dataValues: (number | null)[] = (
    chartData.datasets?.[0]?.data || []
  ).map((value: number | null) => (typeof value === "number" ? value : null));

  const customOptions: {
    cutout: string;
    plugins?: {
      legend: { display: boolean };
    };
    elements?: { arc: { borderWidth: number } };
    onHover?: { enabled: boolean };
    hover?: { mode?: string | null | undefined } | false;
    tooltips?: { enabled: boolean };
  } & Chart.ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "87%",
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    hover: false,
    tooltips: {
      enabled: false,
    },
  };

  useEffect(() => {
    if (registry && typeof registry.addControllers === "function") {
      registry.addControllers(DoughnutController as ChartComponent);
      return;
    }

    if (registry && "register" in registry) {
      const extendedRegistry = registry as ExtendedRegistry;
      (_registerables as ChartComponent[]).forEach((item) =>
        extendedRegistry.register(item)
      );
    }
  }, []);

  return (
    <div
      className="customizable-card"
      style={{
        backgroundImage: `url(${graphbgurl})`,
      }}
    >
      <div className="card-content">
        <div className="chart-container">
          <Doughnut
            data={chartData}
            options={customOptions}
            className="doughnut-chart"
          />
        </div>
        <p className="active-label">{activePrLabel}</p>
        <p className="sum-Label">{sumLabel}</p>
      </div>
      <span className="card-title">{title}</span>
      <div className="label-container">
        <div>
          {dataValues.slice(0, 3).map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                color: "aliceblue",
                alignItems: "center",
                marginBottom: "2px",
                fontFamily: "Poppins",
              }}
            >
              <div
                className="custom-badge-container"
                style={{ backgroundColor: backgroundColors[index] }}
              >
                <div className="custom-badge-text">{value?.toString()}</div>
              </div>
              <div className="label-name">
                {(chartData.labels?.[index] as React.ReactNode) || ""}
              </div>
            </div>
          ))}
        </div>

        <div className="labels-group">
          {dataValues.slice(3).map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                color: "aliceblue",
                alignItems: "center",
                marginBottom: "2px",
                fontFamily: "Poppins",
              }}
            >
              <div
                className="custom-badge-container"
                style={{
                  backgroundColor: backgroundColors[index + 3],
                }}
              >
                <div className="custom-badge-text">{value?.toString()}</div>
              </div>
              <div className="label-name">
                {(chartData.labels?.[index + 3] as React.ReactNode) || ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardContainerProps {
  children: React.ReactNode;
  tooltip?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, tooltip }) => (
  <div
    style={{
      width: "33%",
      pointerEvents: tooltip ? "auto" : "none",
    }}
  >
    {children}
  </div>
);

interface AppProps {
  labels?: string[];
  dataValues?: number[];
  activePrLabel: string;
  title: string;
  sumLabel: number;
  graphbgurl: string;
  // width: string | null;
}

const CustomGraph: React.FC<AppProps & { graphbgurl: string }> = ({
  labels,
  dataValues,
  activePrLabel,
  title,
  sumLabel,
  graphbgurl,
  //width,
}) => {
  const backgroundColors = [
    "rgba(149, 189, 255, 1)",
    "rgba(248, 229, 164, 1)",
    "rgba(247, 200, 224, 1)",
    "rgba(140, 242, 242, 1)",
    "rgba(255, 192, 179, 1)",
    "rgba(223, 255, 216, 1)",
  ];

  useEffect(() => {
    const linkElement = document.createElement("link");
    linkElement.href = "https://fonts.googleapis.com/css?family=Poppins";
    linkElement.rel = "stylesheet";
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  const data1: Chart.ChartData = {
    labels: labels || [
      "New RFQs",
      "Ordered",
      "Quoted RFQs",
      "Order Lost",
      "Declined RFQs",
      "Cancelled",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: dataValues?.map((value) => (value !== null ? value : 0)) || [],
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <CardContainer tooltip={false}>
      <CustomizableCard
        title={title}
        chartData={data1 as Chart.ChartData<"doughnut", number[], unknown>}
        activePrLabel={activePrLabel}
        sumLabel={sumLabel}
        backgroundColors={backgroundColors}
        graphbgurl={graphbgurl}
      />
    </CardContainer>
  );
};

export default CustomGraph;
