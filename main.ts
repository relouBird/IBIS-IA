import { Chart, registerables } from "chart.js";
import color from "./color";

const elements: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".choice-child");

Chart.register(...registerables);

// gerer les graphes de overviews
// -----------------------------------

if (document.getElementById("myChart")) {
  new Chart(document.getElementById("myChart") as HTMLCanvasElement, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Differential Pressure",
          data: [14, 10, 15, 5, 2, 3],
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
          data: [10, 16, 9, 10, 3, 8.5],
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
          data: [12, 13, 7, 12, 0, 10],
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
            stepSize: 5,
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

if (document.getElementById("myBar")) {
  new Chart(document.getElementById("myBar") as HTMLCanvasElement, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Pressure",
          data: [12],
          borderColor: color.active,
          backgroundColor: color.active,
          barPercentage: 0.6,
          borderWidth: 2,
        },
        {
          label: "Motor current fan",
          data: [15],
          borderColor: color.orange,
          backgroundColor: color.orange,
          barPercentage: 0.6,
          borderWidth: 2,
        },
        {
          label: "Motor Current Rotary Feeder",
          data: [10],
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
            stepSize: 5,
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
          data: [14, 10, 15, 5, 2, 3],
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
          data: [10, 16, 9, 10, 3, 8.5],
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
          data: [12, 13, 7, 12, 0, 10],
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
          data: [6, 12, 8, 10, 7, 0],
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
            stepSize: 5,
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
          data: [14, 10, 15, 5, 2, 3],
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
          data: [10, 16, 9, 10, 3, 8.5],
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
          data: [12, 13, 7, 12, 0, 10],
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
          data: [6, 12, 8, 10, 7, 0],
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
            stepSize: 5,
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
          data: [12, 13, 7, 12, 0, 10],
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
          data: [6, 12, 8, 10, 7, 0],
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
            stepSize: 5,
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
          data: [10, 16, 9, 10, 3, 8.5],
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
          data: [12, 13, 7, 12, 0, 10],
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
            stepSize: 5,
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
          data: [14, 10, 15, 5, 2, 3],
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
          data: [6, 12, 8, 10, 7, 0],
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
            stepSize: 5,
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
          data: [10, 16, 9, 10, 3, 8.5],
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
          data: [6, 12, 8, 10, 7, 0],
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
            stepSize: 5,
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

document.querySelectorAll(".choice-child").forEach((elt) => {
  elt.addEventListener("click", (e) => {
    e.preventDefault();
    let value: string | null | undefined =
      elt.querySelector("span:last-child")?.textContent;
    if (value && value === "Overview") {
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
