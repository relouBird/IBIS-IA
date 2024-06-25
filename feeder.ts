import { resultData } from "./type";

const elements3: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".choice-child");

let roundLikeYouThink = (numb: number, times: number): string => {
  let iterator = 1;
  for (let i = 1; i <= times; i++) {
    iterator *= 10;
  }
  return (Math.round(numb * iterator) / iterator).toString();
};

elements3.forEach((element) => {
  element.addEventListener("click", () => {
    elements3.forEach((element2) => {
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

fetch("http://localhost:3000/rms")
  .then((data) => data.json())
  .then((r) => {
    let datas: resultData[] = r;
    console.log(datas);

    // ajouter des details recent dans l'appli
    //------------------------------------------
    let lastData = datas[datas.length - 1];

    document.querySelectorAll(".details-card").forEach((card) => {
      if (
        card.querySelector(".details-name")?.textContent?.trim() ==
        "Motor Current Rotary Feeder"
      ) {
        card.querySelector(".details-value span")!.textContent =
          roundLikeYouThink(lastData.courant_moteur2_rms, 3);
      } else if (
        card.querySelector(".details-name")?.textContent?.trim() ==
        "Motor Torque Rotary Feeder"
      ) {
        card.querySelector(".details-value span")!.textContent =
          roundLikeYouThink(lastData.charge_moteur2_rms, 3);
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
  });