import { Chart, registerables } from "chart.js";
import "./style.css";
import color from "./color";

const elements: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".choice-child");

Chart.register(...registerables);

new Chart(document.getElementById("myChart") as HTMLCanvasElement, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Offline orders",
        data: [14, 10, 15, 5, 2, 3],
        borderColor: color.active,
        backgroundColor: color.active,
        borderWidth: 2,
        tension: 0.25,
        pointBorderWidth:0,
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: color.active,
      },
      {
        label: "Online orders",
        data: [10, 16, 9, 10, 0, 9],
        borderColor: color.orange,
        backgroundColor: color.orange,
        borderWidth: 2,
        tension: 0.25,
        pointBorderWidth:0,
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: color.orange,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    layout:{
      padding: {
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border:{
          color: color.border,
        }
      },
      y: {
        grid: {
          display: true,
          color: color.border,
        },
        ticks: {
          stepSize: 5,
          color: "#0008"
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
      tooltip:{
      }
    },
  },
});

new Chart (document.getElementById("myBar") as HTMLCanvasElement, {
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
        label: "Motor Current 1",
        data: [15],
        borderColor: color.orange,
        backgroundColor: color.orange,
        barPercentage: 0.6,
        borderWidth: 2,
      },
      {
        label: "Motor Current 2",
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
    layout:{
      padding: {
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border:{
          color: "#0000",
        }
      },
      y: {
        grid: {
          display: false,
          color: color.border,
        },
        ticks: {
          stepSize: 5,
          color: "#0000"
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
      tooltip:{
      }
    },
  },
})

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
