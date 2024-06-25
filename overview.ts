import tableElement from "./tableElement";
import { anomaliesData, resultData } from "./type";

let roundLikeYouThink = (numb: number, times: number): string => {
  let iterator = 1;
  for (let i = 1; i <= times; i++) {
    iterator *= 10;
  }
  return (Math.round(numb * iterator) / iterator).toString();
};

// recuperer les données ici....
fetch("http://localhost:8000/anomalies")
  .then((data) => data.json())
  .then((r) => {
    let datas: anomaliesData[] = r;
    let tableData = document.querySelector("table")!;
    datas.forEach((element) => {
      let line = tableElement(
        element.date,
        element.timestamp,
        element.variable,
        element.valeur_predite,
        element.valeur_lue,
        element.difference,
        element.seuil,
        element.taux_changement,
        element.rul
      );
      tableData.appendChild(line);
    });
  });

fetch("http://localhost:8000/rms_data")
  .then((data) => data.json())
  .then((r) => {
    let datas: resultData[] = r;

    // ajouter des details recent dans l'appli
    //------------------------------------------
    let lastData = datas[datas.length - 1];

    document.querySelectorAll(".details-card").forEach((card) => {
      if (
        card.querySelector(".details-name")?.textContent?.trim() == "Pressure"
      ) {
        card.querySelector(".details-value span")!.textContent =
          roundLikeYouThink(lastData.pression_rms, 3);
      } else if (
        card.querySelector(".details-name")?.textContent?.trim() ==
        "motor current Rotary feeder"
      ) {
        card.querySelector(".details-value span")!.textContent =
          roundLikeYouThink(lastData.courant_moteur2_rms, 3);
      } else if (
        card.querySelector(".details-name")?.textContent?.trim() ==
        "motor current fan"
      ) {
        card.querySelector(".details-value span")!.textContent =
          roundLikeYouThink(lastData.courant_moteur1_rms, 3);
      }

      let time: string = lastData.timestamp.slice(0, 5) + " " + lastData.date;
      card.querySelector(".details-time span:nth-child(2)")!.textContent =
        lastData.timestamp.slice(0, 5);
      card.querySelector(".details-time span:nth-child(3)")!.textContent =
        lastData.date;
    });
  });
