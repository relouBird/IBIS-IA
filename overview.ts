import { ifError } from "assert";
import tableElement from "./tableElement";
import { ErrorObject, anomaliesData, resultData } from "./type";
import { error, table } from "console";

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
    let tableData = document.querySelector("table");

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
      tableData?.appendChild(line);
    });

    // recuperation du select
    let select1:HTMLSelectElement | null = document.querySelector(".anomalies-tab select");
    select1?.addEventListener("change", () => {
      if (select1.value === "all") {
        // rien du tout
        console.log(datas);
        if (tableData?.rows.length) {
          for (var i = tableData?.rows.length - 1; i >= 0; i--) {
            if (tableData.rows[i].getElementsByTagName("th").length === 0) {
              tableData.deleteRow(i);
            }
          }
        }
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
          tableData?.appendChild(line);
        });
      } else if (select1.value === "minute") {
        let tempData = [...datas];
        let d: anomaliesData[] = [];

        for (let h = 0; h <= 23; h++) {
          for (let m = 0; m <= 59; m++) {
            let p: anomaliesData[];
            p = tempData.filter((data) => {
              return (
                parseInt(data.timestamp[3] + data.timestamp[4]) == m &&
                parseInt(data.timestamp[0] + data.timestamp[1]) == h
              );
            });
            if (p.length !== 0) {
              let tempValue: anomaliesData = {
                date: p[0].date,
                difference: 0,
                rul: 0,
                seuil: 0,
                taux_changement: 0,
                timestamp: p[0].timestamp.slice(0, 5),
                valeur_lue: 0,
                valeur_predite: 0,
                variable: p[0].variable,
              };
              let diffTab: number = 0;
              let rulTab: number = 0;
              let seuilTab: number = 0;
              let tauxTab: number = 0;
              let vlTab: number = 0;
              let vpTab: number = 0;
              for (let i = 0; i < p.length; i++) {
                diffTab += p[i].difference;
                rulTab += p[i].rul;
                seuilTab += p[i].seuil;
                tauxTab += p[i].taux_changement;
                vlTab += p[i].valeur_lue;
                vpTab += p[i].valeur_predite;
              }
              tempValue.difference = diffTab / p.length;
              tempValue.rul = rulTab / p.length;
              tempValue.seuil = seuilTab / p.length;
              tempValue.taux_changement = tauxTab / p.length;
              tempValue.valeur_lue = vlTab / p.length;
              tempValue.valeur_predite = vpTab / p.length;
              d.push(tempValue);
            }
          }
        }

        console.log(d);
        if (tableData?.rows.length) {
          for (var i = tableData?.rows.length - 1; i >= 0; i--) {
            if (tableData.rows[i].getElementsByTagName("th").length === 0) {
              tableData.deleteRow(i);
            }
          }
        }
        d.forEach((element) => {
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
          tableData?.appendChild(line);
        });
      } else if (select1.value === "hour") {
        let tempData = [...datas];
        let f: anomaliesData[] = [];

        for (let d = 1; d <= 30; d++) {
          for (let h = 0; h <= 23; h++) {
            let p: anomaliesData[];
            p = tempData.filter((data) => {
              return (
                parseInt(
                  data.date[data.date.length - 2] +
                    data.date[data.date.length - 1]
                ) == d && parseInt(data.timestamp[0] + data.timestamp[1]) == h
              );
            });
            if (p.length !== 0) {
              let tempValue: anomaliesData = {
                date: p[0].date,
                difference: 0,
                rul: 0,
                seuil: 0,
                taux_changement: 0,
                timestamp: p[0].timestamp.slice(0, 3) + "00",
                valeur_lue: 0,
                valeur_predite: 0,
                variable: p[0].variable,
              };
              let diffTab: number = 0;
              let rulTab: number = 0;
              let seuilTab: number = 0;
              let tauxTab: number = 0;
              let vlTab: number = 0;
              let vpTab: number = 0;
              for (let i = 0; i < p.length; i++) {
                diffTab += p[i].difference;
                rulTab += p[i].rul;
                seuilTab += p[i].seuil;
                tauxTab += p[i].taux_changement;
                vlTab += p[i].valeur_lue;
                vpTab += p[i].valeur_predite;
              }
              tempValue.difference = diffTab / p.length;
              tempValue.rul = rulTab / p.length;
              tempValue.seuil = seuilTab / p.length;
              tempValue.taux_changement = tauxTab / p.length;
              tempValue.valeur_lue = vlTab / p.length;
              tempValue.valeur_predite = vpTab / p.length;
              f.push(tempValue);
            }
          }
        }

        console.log(f);
        if (tableData?.rows.length) {
          for (var i = tableData?.rows.length - 1; i >= 0; i--) {
            if (tableData.rows[i].getElementsByTagName("th").length === 0) {
              tableData.deleteRow(i);
            }
          }
        }
        f.forEach((element) => {
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
          tableData?.appendChild(line);
        });
      } else if (select1.value === "day") {
        let tempData = [...datas];
        let f: anomaliesData[] = [];

        for (let m = 1; m <= 12; m++) {
          for (let d = 1; d <= 30; d++) {
            let p: anomaliesData[];
            p = tempData.filter((data) => {
              return (
                parseInt(
                  data.date[data.date.length - 2] +
                    data.date[data.date.length - 1]
                ) == d &&
                parseInt(
                  data.date[data.date.length - 5] +
                    data.date[data.date.length - 4]
                ) == m
              );
            });
            if (p.length !== 0) {
              let tempValue: anomaliesData = {
                date: p[0].date,
                difference: 0,
                rul: 0,
                seuil: 0,
                taux_changement: 0,
                timestamp: "23:59",
                valeur_lue: 0,
                valeur_predite: 0,
                variable: p[0].variable,
              };
              let diffTab: number = 0;
              let rulTab: number = 0;
              let seuilTab: number = 0;
              let tauxTab: number = 0;
              let vlTab: number = 0;
              let vpTab: number = 0;
              for (let i = 0; i < p.length; i++) {
                diffTab += p[i].difference;
                rulTab += p[i].rul;
                seuilTab += p[i].seuil;
                tauxTab += p[i].taux_changement;
                vlTab += p[i].valeur_lue;
                vpTab += p[i].valeur_predite;
              }
              tempValue.difference = diffTab / p.length;
              tempValue.rul = rulTab / p.length;
              tempValue.seuil = seuilTab / p.length;
              tempValue.taux_changement = tauxTab / p.length;
              tempValue.valeur_lue = vlTab / p.length;
              tempValue.valeur_predite = vpTab / p.length;
              f.push(tempValue);
            }
          }
        }

        console.log(f);
        if (tableData?.rows.length) {
          for (var i = tableData?.rows.length - 1; i >= 0; i--) {
            if (tableData.rows[i].getElementsByTagName("th").length === 0) {
              tableData.deleteRow(i);
            }
          }
        }
        f.forEach((element) => {
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
          tableData?.appendChild(line);
        });
      }
    });
  });

fetch("http://localhost:8000/rms_data")
  .then((data) => data.json())
  .then((r) => {
    let datas: resultData[] | ErrorObject = r;

    if (Array.isArray(datas)) {
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
    } else {
      document.querySelector(".loading")?.classList.remove("hidden");
    }
  });
