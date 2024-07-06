import { Chart, registerables } from "chart.js";
import color from "./color";
import "./style.css";
import { ErrorObject, chartDataType, resultData } from "./type";

import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import dataExport from "./exportData.ts";
import {
  barChartCreation,
  barChartUpdate,
  lineChartCreation,
  lineChartUpdate,
} from "./chartConfigCreation";

const socket = io("http://127.0.0.1:7000/");

const loading = document.querySelector(".loading");
if(!document.querySelector(".prediction")){
  loading?.classList.remove("hidden");
}

const elements: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".choice-child");

Chart.register(...registerables);
const LM = {
  id: "LegendMargin",
  afterInit(chart, args, plugins) {
    // console.log(chart.legend);

    const originalFit = chart.legend?.fit;
    chart.legend.fit = function fit() {
      if (originalFit) {
        originalFit.call(this);
      }
      return (this.height += 25);
    };
    // chart.legend?.right += 50;
    // chart.legend._margins.right += 20
  },
};

(async () => {
  let lastMinute: string[] = ["10s", "20s", "30s", "40s", "50s", "60s"];
  let lastHour: string[] = [
    "10min",
    "20min",
    "30min",
    "40min",
    "50min",
    "60min",
  ];
  let lastDay: string[] = [
    "00h",
    "",
    "",
    "",
    "4h",
    "",
    "",
    "",
    "8h",
    "",
    "",
    "",
    "12h",
    "",
    "",
    "",
    "16h",
    "",
    "",
    "",
    "20h",
    "",
    "",
    "",
    "23h59",
  ];

  // creation des variable acceuillant les graphes
  let myChart: Chart<"line", number[], string>;
  let myChart2: Chart<"line", number[], string>;
  let myChart3: Chart<"line", number[], string>;
  let myChart4: Chart<"line", number[], string>;
  let myChart5: Chart<"line", number[], string>;
  let myChart6: Chart<"line", number[], string>;
  let myChart7: Chart<"line", number[], string>;
  let myBarChart: Chart<"bar", number[], string>;

  // gerer les graphes de overviews
  // -----------------------------------

  if (document.getElementById("myChart")) {
    myChart = lineChartCreation(
      document.getElementById("myChart") as HTMLCanvasElement,
      [
        "Differential Pressure",
        "Motor current fan",
        "Motor Current Rotary Feeder",
      ]
    );
    myBarChart = barChartCreation(
      document.getElementById("myBar") as HTMLCanvasElement
    );
  }

  // gerer les graphes de filtering
  // -----------------------------------
  if (document.getElementById("myChart2")) {
    myChart2 = lineChartCreation(
      document.getElementById("myChart2") as HTMLCanvasElement,
      ["Differential Pressure", "Inlet Pressure", "Outlet Pressure"]
    );
  }

  if (document.getElementById("myChart3")) {
    myChart3 = lineChartCreation(
      document.getElementById("myChart3") as HTMLCanvasElement,
      [
        "Motor current fan",
        "Motor current rotary feeder",
        "Inlet temperature",
        "Outlet temperature",
      ]
    );
  }

  // gerer les graphes de fan
  // -----------------------------------
  if (document.getElementById("myChart4")) {
    myChart4 = lineChartCreation(
      document.getElementById("myChart4") as HTMLCanvasElement,
      ["Motor current fan", "Motor torque fan"]
    );
  }
  if (document.getElementById("myChart5")) {
    myChart5 = lineChartCreation(
      document.getElementById("myChart5") as HTMLCanvasElement,
      ["Environmental temperature", "Humidity"]
    );
  }

  // gerer les graphes de rotary feeder
  // -----------------------------------
  if (document.getElementById("myChart6")) {
    myChart6 = lineChartCreation(
      document.getElementById("myChart6") as HTMLCanvasElement,
      ["Motor current rotary feeder", "Motor torque rotary feeder"]
    );
  }

  if (document.getElementById("myChart7")) {
    myChart7 = lineChartCreation(
      document.getElementById("myChart7") as HTMLCanvasElement,
      ["Environmental Temperature", "Humidity"]
    );
  }

  socket.on("rms_data", (data: { data: resultData[] | ErrorObject }) => {
    if (Array.isArray(data.data)) {
      let data1: number[][] = dataExport("all", data.data);
      let data2: number[][] = dataExport("hour", data.data);
      let data3: number[][] = dataExport("minute", data.data);

      let allData: number[][][] = [data1, data2, data3];

      if (document.getElementById("myChart")) {
        lineChartUpdate(
          myChart,
          document.querySelector(".chart select"),
          allData,
          [0, 1, 2]
        );
        barChartUpdate(myBarChart, allData);
      }

      if (document.getElementById("myChart2")) {
        lineChartUpdate(
          myChart2,
          document.querySelector(".chart2 select"),
          allData,
          [0, 9, 10]
        );
      }

      if (document.getElementById("myChart3")) {
        lineChartUpdate(
          myChart3,
          document.querySelector(".chart3 select"),
          allData,
          [1, 2, 7, 8]
        );
      }

      if (document.getElementById("myChart4")) {
        lineChartUpdate(
          myChart4,
          document.querySelector(".chart4 select"),
          allData,
          [1, 3]
        );
      }

      if (document.getElementById("myChart5")) {
        lineChartUpdate(
          myChart5,
          document.querySelector(".chart5 select"),
          allData,
          [5, 6]
        );
      }

      if (document.getElementById("myChart6")) {
        lineChartUpdate(
          myChart6,
          document.querySelector(".chart6 select"),
          allData,
          [2, 4]
        );
      }

      if (document.getElementById("myChart7")) {
        lineChartUpdate(
          myChart7,
          document.querySelector(".chart7 select"),
          allData,
          [5, 6]
        );
      }

      loading?.classList.add("hidden")
    } else{
      console.log("no data");
    }
  });
})();

elements.forEach((element) => {
  element.addEventListener("click", () => {
    elements.forEach((element2) => {
      element2.classList.remove("active");
    });
    //   element.classList.toggle("active");
    if (element.classList.contains("active")) {
    } else {
      element.classList.add("active");
    }
  });
});

document.querySelector(".right button")?.addEventListener("click", () => {
  async function startPredictions() {
    try {
      const response = await fetch("http://localhost:8000/start", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  startPredictions();
  // socket.emit('start',"launch")
});

document.querySelectorAll(".choice-child").forEach((elt) => {
  elt.addEventListener("click", (e) => {
    e.preventDefault();
    let value: string | null | undefined =
      elt.querySelector("span:last-child")?.textContent;
    if (value && value === "Overview") {
      window.location.href = "./overview.html";
    } else if (value && value === "Home") {
      window.location.href = "./index.html";
    } else if (value && value === "Filtering Unit") {
      window.location.href = "./filtering.html";
    } else if (value && value === "Fan") {
      window.location.href = "./fan.html";
    } else if (value && value === "Rotary Feeder") {
      window.location.href = "./feeder.html";
    }
  });
});
