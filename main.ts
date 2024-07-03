import { Chart, registerables } from "chart.js";
import color from "./color";
import { GraphData } from "./exportData";
import "./style.css";
import { chartDataType } from "./type";

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

  let [
    DifferentialPressureData,
    MotorCurrentFanData,
    MotorCurrentRotaryFeederData,
    MotorTorqueFanData,
    MotorTorqueRotaryFeederData,
    EnvironmentalTempertureData,
    HumidityData,
    InletTemperatureData,
    OutletTemperatureData,
    InletPressureData,
    OutletPressureData,
  ] = await GraphData("all");

  let chartData1: chartDataType = [
    lastDay,
    [
      DifferentialPressureData,
      MotorCurrentFanData,
      MotorCurrentRotaryFeederData,
    ],
  ];

  await GraphData("minute");

  // gerer les graphes de overviews
  // -----------------------------------

  if (document.getElementById("myChart")) {
    const myChart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      {
        type: "line",
        data: {
          labels: chartData1[0],
          datasets: [
            {
              label: "Differential Pressure",
              data: chartData1[1][0],
              borderColor: color.active,
              backgroundColor: color.active,
              borderWidth: 2,
              tension: 0.25,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
              pointHoverBackgroundColor: color.active,
            },
            {
              label: "Motor current fan",
              data: chartData1[1][1],
              borderColor: color.orange,
              backgroundColor: color.orange,
              borderWidth: 2,
              tension: 0.25,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
              pointHoverBackgroundColor: color.orange,
            },
            {
              label: "Motor Current Rotary Feeder",
              data: chartData1[1][2],
              borderColor: color.green,
              backgroundColor: color.green,
              borderWidth: 2,
              tension: 0.25,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
              pointHoverBackgroundColor: color.green,
            },
          ],
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
      }
    );

    let selectChart1: HTMLSelectElement | null =
      document.querySelector(".chart select");
    selectChart1?.addEventListener("change", async () => {
      if (selectChart1.value === "day") {
        chartData1[0] = lastDay;
        chartData1[1][0] = DifferentialPressureData;
        chartData1[1][1] = MotorCurrentFanData;
        chartData1[1][2] = MotorCurrentRotaryFeederData;
      } else if (selectChart1.value === "hour") {
        let tempData = await GraphData("hour");
        chartData1[0] = lastHour;
        chartData1[1][0] = tempData[0];
        chartData1[1][1] = tempData[1];
        chartData1[1][2] = tempData[2];
      } else if (selectChart1.value === "minute") {
        let tempData = await GraphData("minute");
        chartData1[0] = lastMinute;
        chartData1[1][0] = tempData[0];
        chartData1[1][1] = tempData[1];
        chartData1[1][2] = tempData[2];

      }
      myChart.data.labels = chartData1[0];
      myChart.data.datasets[0].data = chartData1[1][0];
      myChart.data.datasets[1].data = chartData1[1][1];
      myChart.data.datasets[2].data = chartData1[1][2];
      myChart.update();
    });
  }

  if (document.getElementById("myBar")) {
    let [s1, s2, s3] = [0, 0, 0];
    for (let i = 0; i < MotorCurrentFanData.length; i++) {
      s1 += DifferentialPressureData[i];
      s2 += MotorCurrentFanData[i];
      s3 += MotorCurrentRotaryFeederData[i];
    }

    new Chart(document.getElementById("myBar") as HTMLCanvasElement, {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "Pressure",
            data: [s1],
            borderColor: color.active,
            backgroundColor: color.active,
            barPercentage: 0.6,
            borderWidth: 2,
          },
          {
            label: "Motor current fan",
            data: [s2],
            borderColor: color.orange,
            backgroundColor: color.orange,
            barPercentage: 0.6,
            borderWidth: 2,
          },
          {
            label: "Motor Current Rotary Feeder",
            data: [s3],
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

  // gerer les graphes de filtering
  // -----------------------------------

  if (document.getElementById("myChart2")) {
    new Chart(document.getElementById("myChart2") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Differential Pressure",
            data: DifferentialPressureData,
            borderColor: color.active,
            backgroundColor: color.active,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.active,
          },
          {
            label: "Inlet Pressure",
            data: InletPressureData,
            borderColor: color.orange,
            backgroundColor: color.orange,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.orange,
          },
          {
            label: "Outlet Pressure",
            data: OutletPressureData,
            borderColor: color.green,
            backgroundColor: color.green,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.green,
          },
          {
            label: "Humidity",
            data: HumidityData,
            borderColor: color.secondary,
            backgroundColor: color.secondary,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.secondary,
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
            align: "end",
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

  if (document.getElementById("myChart3")) {
    new Chart(document.getElementById("myChart3") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Motor current fan",
            data: MotorCurrentFanData,
            borderColor: color.active,
            backgroundColor: color.active,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.active,
          },
          {
            label: "Motor current rotary feeder",
            data: MotorCurrentRotaryFeederData,
            borderColor: color.orange,
            backgroundColor: color.orange,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.orange,
          },
          {
            label: "Inlet temperature",
            data: InletTemperatureData,
            borderColor: color.green,
            backgroundColor: color.green,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.green,
          },
          {
            label: "Outlet temperature",
            data: OutletTemperatureData,
            borderColor: color.secondary,
            backgroundColor: color.secondary,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.secondary,
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
            align: "end",
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

  // gerer les graphes de fan
  // -----------------------------------
  if (document.getElementById("myChart4")) {
    new Chart(document.getElementById("myChart4") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Motor current fan",
            data: MotorCurrentFanData,
            borderColor: color.green,
            backgroundColor: color.green,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.green,
          },
          {
            label: "Motor torque fan",
            data: MotorTorqueFanData,
            borderColor: color.secondary,
            backgroundColor: color.secondary,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.secondary,
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
            align: "end",
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

  if (document.getElementById("myChart5")) {
    new Chart(document.getElementById("myChart5") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Environmental temperature",
            data: EnvironmentalTempertureData,
            borderColor: color.orange,
            backgroundColor: color.orange,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.orange,
          },
          {
            label: "Humidity",
            data: HumidityData,
            borderColor: color.green,
            backgroundColor: color.green,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.green,
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
            align: "end",
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

  // gerer les graphes de rotary feeder
  // -----------------------------------

  if (document.getElementById("myChart6")) {
    new Chart(document.getElementById("myChart6") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Motor current rotary feeder",
            data: MotorCurrentRotaryFeederData,
            borderColor: color.active,
            backgroundColor: color.active,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.active,
          },
          {
            label: "Motor torque rotary feeder",
            data: MotorTorqueRotaryFeederData,
            borderColor: color.secondary,
            backgroundColor: color.secondary,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.secondary,
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
            align: "end",
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

  if (document.getElementById("myChart7")) {
    new Chart(document.getElementById("myChart7") as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Environmental Temperature",
            data: EnvironmentalTempertureData,
            borderColor: color.orange,
            backgroundColor: color.orange,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.orange,
          },
          {
            label: "Humidity",
            data: HumidityData,
            borderColor: color.secondary,
            backgroundColor: color.secondary,
            borderWidth: 2,
            tension: 0.25,
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: color.secondary,
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
            align: "end",
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
