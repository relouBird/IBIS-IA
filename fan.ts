import { ErrorObject, resultData } from "./type";

import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("http://127.0.0.1:7000/");

const elements: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".choice-child");

let roundLikeYouThink = (numb: number, times: number): string => {
  let iterator = 1;
  for (let i = 1; i <= times; i++) {
    iterator *= 10;
  }
  return (Math.round(numb * iterator) / iterator).toString();
};

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


socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("rms_data",(data: {data: resultData[] | ErrorObject})=>{
  let datas: resultData[] | ErrorObject = data.data;

    if (Array.isArray(datas)) {
      // ajouter des details recent dans l'appli
      //------------------------------------------
      let lastData = datas[datas.length - 1];

      document.querySelectorAll(".details-card").forEach((card) => {
        if (
          card.querySelector(".details-name")?.textContent?.trim() ==
          "Motor Current Fan"
        ) {
          card.querySelector(".details-value span")!.textContent =
            roundLikeYouThink(lastData.courant_moteur1_rms, 3);
        } else if (
          card.querySelector(".details-name")?.textContent?.trim() ==
          "Motor Torque Fan"
        ) {
          card.querySelector(".details-value span")!.textContent =
            roundLikeYouThink(lastData.charge_moteur1_rms, 3);
        } else if (
          card.querySelector(".details-name")?.textContent?.trim() ==
          "Environmental Temperature"
        ) {
          card.querySelector(".details-value span")!.textContent =
            roundLikeYouThink(lastData.env_temperature_rms, 3);
        } else if (
          card.querySelector(".details-name")?.textContent?.trim() == "Humidity"
        ) {
          card.querySelector(".details-value span")!.textContent =
            roundLikeYouThink(lastData.humidite_rms, 3);
        }

        let time: string = lastData.timestamp.slice(0, 5) + " " + lastData.date;
        card.querySelector(".details-time span:nth-child(2)")!.textContent =
          lastData.timestamp.slice(0, 5);
        card.querySelector(".details-time span:nth-child(3)")!.textContent =
          lastData.date;
      });
    } else {
      // document.querySelector(".loading")?.classList.remove("hidden");
    }
})


socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

