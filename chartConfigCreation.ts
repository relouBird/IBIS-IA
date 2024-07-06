import { Chart, registerables } from "chart.js";
import color from "./color";
import { chartDataType, datasetType } from "./type";
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

let lastMinute: string[] = ["10s", "20s", "30s", "40s", "50s", "60s"];
let lastHour: string[] = ["10min", "20min", "30min", "40min", "50min", "60min"];
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

let createDataset = (name: string, color: string) => {
  return {
    label: name,
    data: [],
    borderColor: color,
    backgroundColor: color,
    borderWidth: 2,
    tension: 0.25,
    pointBorderWidth: 0,
    pointBackgroundColor: "transparent",
    pointHoverBackgroundColor: color,
  };
};

export let lineChartCreation = (
  canvas: HTMLCanvasElement,
  chartDataName: string[],
) => {
  let allColor: string[] = [
    color.active,
    color.green,
    color.orange,
    color.secondary,
  ];
  let usedColor: string[] = [];
  let datasets: datasetType[] = [];

  for (let i = 0; i < chartDataName.length; i++) {
    let c = Math.floor(Math.random() * 4);
    while (usedColor.includes(allColor[c])) {
      c = Math.floor(Math.random() * 4);
    }
    usedColor.push(allColor[c]);
    datasets.push(
      createDataset(chartDataName[i], allColor[c])
    );
  }

  const myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: [
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
      ],
      datasets: datasets,
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      layout: {},
      scales: {
        x: {
          ticks: {
            maxRotation: 0, // Empêche l'inclinaison des étiquettes
            minRotation: 0,
          },
          grid: {
            display: false,
          },
          border: {
            color: color.border,
          },
        },
        y: {
          grid: {
            display: true,
            color: color.border,
          },
          ticks: {
            stepSize: 25,
            color: "#0008",
          },
          border: {
            color: "#0000",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "center",
          labels: {
            boxHeight: 8,
            boxWidth: 8,
            useBorderRadius: true,
            borderRadius: 3.5,
            font: {
              size: 12.5,
            },
          },
        },
        tooltip: {},
      },
    },
    plugins: [LM],
  });

  return myChart;
};

export let lineChartUpdate = (
  chartLine: Chart<"line", number[], string>,
  selectType: HTMLSelectElement | null,
  allData: number[][][],
  order: number[]
) => {
  let chartDataName: string[] = [""];
  let chartDataValue: number[][] = [[], [], []];
  if (selectType?.value === "day") {
    chartDataName = lastDay;
    for(let i =0; i< order.length;i++){
      chartDataValue[i] = allData[0][order[i]];
    }
  } else if (selectType?.value === "hour") {
    chartDataName = lastHour;
    for(let i =0; i< order.length;i++){
      chartDataValue[i] = allData[1][order[i]];
    }
  } else if (selectType?.value === "minute") {
    chartDataName = lastMinute;
    for(let i =0; i< order.length;i++){
      chartDataValue[i] = allData[2][order[i]];
    }
  }
  chartLine.data.labels = chartDataName;
  for(let i =0; i< order.length;i++){
    chartLine.data.datasets[i].data = chartDataValue[i];
  }
  chartLine.update();

  selectType?.addEventListener("change", async () => {
    let chartDataName: string[] = [""];
    let chartDataValue: number[][] = [[], [], []];
    if (selectType.value === "day") {
      chartDataName = lastDay;
      for(let i =0; i< order.length;i++){
        chartDataValue[i] = allData[0][order[i]];
      }
    } else if (selectType.value === "hour") {
      chartDataName = lastHour;
      for(let i =0; i< order.length;i++){
        chartDataValue[i] = allData[1][order[i]];
      }
    } else if (selectType.value === "minute") {
      chartDataName = lastMinute;
      for(let i =0; i< order.length;i++){
        chartDataValue[i] = allData[2][order[i]];
      }
    }
    chartLine.data.labels = chartDataName;
    for(let i =0; i< order.length;i++){
      chartLine.data.datasets[i].data = chartDataValue[i];
    }
    chartLine.update();
  });
};

export let barChartCreation = (canvas: HTMLCanvasElement) => {
   return new Chart(canvas, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Pressure",
          data: [],
          borderColor: color.active,
          backgroundColor: color.active,
          barPercentage: 0.6,
          borderWidth: 2,
        },
        {
          label: "Motor current fan",
          data: [],
          borderColor: color.orange,
          backgroundColor: color.orange,
          barPercentage: 0.6,
          borderWidth: 2,
        },
        {
          label: "Motor Current Rotary Feeder",
          data: [],
          borderColor: color.green,
          backgroundColor: color.green,
          barPercentage: 0.6,
          borderWidth: 2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {},
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            color: "#0000",
          },
        },
        y: {
          grid: {
            display: false,
            color: color.border,
          },
          ticks: {
            stepSize: 25,
            color: "#0000",
          },
          border: {
            color: "#0000",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            boxHeight: 8,
            boxWidth: 8,
            useBorderRadius: true,
            borderRadius: 3.5,
            font: {
              size: 12.5,
            },
          },
        },
        tooltip: {},
      },
    },
  });
}


export let barChartUpdate = (barChat:Chart<"bar", number[], string>,allData: number[][][]) => {
  let chartDataValue: number[][] = [[], [], []];
  barChat.data.datasets[0].data = allData[0][0];
  barChat.data.datasets[1].data = allData[0][1];
  barChat.data.datasets[2].data = allData[0][2];
  barChat.update();
};
