import { ErrorObject, resultData } from "./type";
type GraphDataType = number[][];

let dataExport = (
  like: string,
  data: resultData[] | ErrorObject
): GraphDataType => {
  // creation des variables contenant chaque element
  // ---------------------
  let MotorCurrentFanData: number[] = [];
  let MotorCurrentRotaryFeederData: number[] = [];
  let MotorTorqueFanData: number[] = [];
  let MotorTorqueRotaryFeederData: number[] = [];
  let EnvironmentalTempertureData: number[] = [];
  let HumidityData: number[] = [];
  let InletTemperatureData: number[] = [];
  let OutletTemperatureData: number[] = [];
  let InletPressureData: number[] = [];
  let OutletPressureData: number[] = [];
  let DifferentialPressureData: number[] = [];

  let datas: resultData[] | ErrorObject = data;

  if (Array.isArray(datas)) {
    if (like === "allData") {
      datas.forEach((element) => {
        DifferentialPressureData.push(element.pression_rms);
        MotorCurrentFanData.push(element.courant_moteur1_rms);
        MotorCurrentRotaryFeederData.push(element.courant_moteur2_rms);
        MotorTorqueFanData.push(element.charge_moteur1_rms);
        MotorTorqueRotaryFeederData.push(element.charge_moteur2_rms);
        EnvironmentalTempertureData.push(element.env_temperature_rms);
        HumidityData.push(element.humidite_rms);
        InletTemperatureData.push(element.inlet_temperature_rms);
        OutletTemperatureData.push(element.outlet_temperature_rms);
        InletPressureData.push(element.inlet_pressure_rms);
        OutletPressureData.push(element.outlet_pressure_rms);
      });
    } else if (like === "all") {
      let tempData: resultData[] = [...datas];
      let tempData2: resultData[][] = [];
      let finalData: number[] = [];
      let lastData = tempData[tempData.length - 1];

      let tempDataDay: resultData[] = tempData.filter((elt) => {
        return (
          parseInt(elt.date.slice(0, 4)) ===
            parseInt(lastData.date.slice(0, 4)) &&
          parseInt(elt.date.slice(5, 7)) ===
            parseInt(lastData.date.slice(5, 7)) &&
          parseInt(elt.date.slice(8, 10)) ===
            parseInt(lastData.date.slice(8, 10))
        );
      });
      for (let i = 1; i <= 24; i++) {
        let tempDataMin: resultData[] = tempDataDay.filter((elt) => {
          let iMoins = i - 1;
          return (
            parseInt(elt.timestamp[0] + elt.timestamp[1]) < i &&
            parseInt(elt.timestamp[0] + elt.timestamp[1]) >= iMoins
          );
        });
        tempData2.push(tempDataMin);
      }

      tempData2.forEach((elts) => {
        let d = 0,
          mcf = 0,
          mcr = 0,
          mtf = 0,
          mtr = 0,
          et = 0,
          h = 0,
          it = 0,
          ot = 0,
          ip = 0,
          op = 0;
        elts.forEach((elt) => {
          d += elt.pression_rms;
          mcf += elt.courant_moteur1_rms;
          mcr += elt.courant_moteur2_rms;
          mtf += elt.charge_moteur1_rms;
          mtr += elt.charge_moteur2_rms;
          et += elt.env_temperature_rms;
          h += elt.humidite_rms;
          it += elt.inlet_temperature_rms;
          ot += elt.outlet_temperature_rms;
          ip += elt.inlet_pressure_rms;
          op += elt.outlet_pressure_rms;
        });

        if (elts.length) {
          DifferentialPressureData.push(d / elts.length);
          MotorCurrentFanData.push(mcf / elts.length);
          MotorCurrentRotaryFeederData.push(mcr / elts.length);
          MotorTorqueFanData.push(mtf / elts.length);
          MotorTorqueRotaryFeederData.push(mtr / elts.length);
          EnvironmentalTempertureData.push(et / elts.length);
          HumidityData.push(h / elts.length);
          InletTemperatureData.push(it / elts.length);
          OutletTemperatureData.push(ot / elts.length);
          InletPressureData.push(ip / elts.length);
          OutletPressureData.push(op / elts.length);
        } else {
          DifferentialPressureData.push(0);
          MotorCurrentFanData.push(0);
          MotorCurrentRotaryFeederData.push(0);
          MotorTorqueFanData.push(0);
          MotorTorqueRotaryFeederData.push(0);
          EnvironmentalTempertureData.push(0);
          HumidityData.push(0);
          InletTemperatureData.push(0);
          OutletTemperatureData.push(0);
          InletPressureData.push(0);
          OutletPressureData.push(0);
        }
      });
    } else if (like === "hour") {
      let tempData: resultData[] = [...datas];
      let tempData2: resultData[][] = [];
      let finalData: number[] = [];
      let lastData = tempData[tempData.length - 1];

      let tempDataHour: resultData[] = tempData.filter((elt) => {
        return (
          parseInt(elt.timestamp.slice(0, 2)) ===
            parseInt(lastData.timestamp.slice(0, 2)) &&
          parseInt(
            elt.date[elt.date.length - 2] + elt.date[elt.date.length - 1]
          ) ===
            parseInt(
              lastData.date[elt.date.length - 2] +
                lastData.date[elt.date.length - 1]
            )
        );
      });

      for (let i = 1; i <= 6; i++) {
        let tempDataMin: resultData[] = tempDataHour.filter((elt) => {
          let iMoins = i - 1;
          return (
            parseInt(elt.timestamp.slice(3, 5)) < i * 10 &&
            parseInt(elt.timestamp.slice(3, 5)) >= iMoins * 10
          );
        });
        tempData2.push(tempDataMin);
      }

      tempData2.forEach((elts) => {
        let d = 0,
          mcf = 0,
          mcr = 0,
          mtf = 0,
          mtr = 0,
          et = 0,
          h = 0,
          it = 0,
          ot = 0,
          ip = 0,
          op = 0;
        elts.forEach((elt) => {
          d += elt.pression_rms;
          mcf += elt.courant_moteur1_rms;
          mcr += elt.courant_moteur2_rms;
          mtf += elt.charge_moteur1_rms;
          mtr += elt.charge_moteur2_rms;
          et += elt.env_temperature_rms;
          h += elt.humidite_rms;
          it += elt.inlet_temperature_rms;
          ot += elt.outlet_temperature_rms;
          ip += elt.inlet_pressure_rms;
          op += elt.outlet_pressure_rms;
        });
        if (elts.length) {
          DifferentialPressureData.push(d / elts.length);
          MotorCurrentFanData.push(mcf / elts.length);
          MotorCurrentRotaryFeederData.push(mcr / elts.length);
          MotorTorqueFanData.push(mtf / elts.length);
          MotorTorqueRotaryFeederData.push(mtr / elts.length);
          EnvironmentalTempertureData.push(et / elts.length);
          HumidityData.push(h / elts.length);
          InletTemperatureData.push(it / elts.length);
          OutletTemperatureData.push(ot / elts.length);
          InletPressureData.push(ip / elts.length);
          OutletPressureData.push(op / elts.length);
        } else {
          DifferentialPressureData.push(0);
          MotorCurrentFanData.push(0);
          MotorCurrentRotaryFeederData.push(0);
          MotorTorqueFanData.push(0);
          MotorTorqueRotaryFeederData.push(0);
          EnvironmentalTempertureData.push(0);
          HumidityData.push(0);
          InletTemperatureData.push(0);
          OutletTemperatureData.push(0);
          InletPressureData.push(0);
          OutletPressureData.push(0);
        }
      });
    } else if (like === "minute") {
      let tempData: resultData[] = [...datas];
      let tempData2: resultData[][] = [];
      let finalData: number[] = [];
      let lastData = tempData[tempData.length - 1];

      let tempDataHour: resultData[] = tempData.filter((elt) => {
        return (
          parseInt(elt.timestamp.slice(0, 2)) ===
            parseInt(lastData.timestamp.slice(0, 2)) &&
          parseInt(
            elt.date[elt.date.length - 2] + elt.date[elt.date.length - 1]
          ) ===
            parseInt(
              lastData.date[elt.date.length - 2] +
                lastData.date[elt.date.length - 1]
            ) &&
          parseInt(elt.timestamp.slice(3, 5)) ===
            parseInt(lastData.timestamp.slice(3, 5))
        );
      });

      for (let i = 1; i <= 6; i++) {
        let tempDataMin: resultData[] = tempDataHour.filter((elt) => {
          let iMoins = i - 1;
          return (
            parseInt(
              elt.timestamp[elt.timestamp.length - 2] +
                elt.timestamp[elt.timestamp.length - 1]
            ) <
              i * 10 &&
            parseInt(
              elt.timestamp[elt.timestamp.length - 2] +
                elt.timestamp[elt.timestamp.length - 1]
            ) >=
              iMoins * 10
          );
        });
        tempData2.push(tempDataMin);
      }

      tempData2.forEach((elts) => {
        let d = 0,
          mcf = 0,
          mcr = 0,
          mtf = 0,
          mtr = 0,
          et = 0,
          h = 0,
          it = 0,
          ot = 0,
          ip = 0,
          op = 0;
        elts.forEach((elt) => {
          d += elt.pression_rms;
          mcf += elt.courant_moteur1_rms;
          mcr += elt.courant_moteur2_rms;
          mtf += elt.charge_moteur1_rms;
          mtr += elt.charge_moteur2_rms;
          et += elt.env_temperature_rms;
          h += elt.humidite_rms;
          it += elt.inlet_temperature_rms;
          ot += elt.outlet_temperature_rms;
          ip += elt.inlet_pressure_rms;
          op += elt.outlet_pressure_rms;
        });
        if (elts.length) {
          DifferentialPressureData.push(d / elts.length);
          MotorCurrentFanData.push(mcf / elts.length);
          MotorCurrentRotaryFeederData.push(mcr / elts.length);
          MotorTorqueFanData.push(mtf / elts.length);
          MotorTorqueRotaryFeederData.push(mtr / elts.length);
          EnvironmentalTempertureData.push(et / elts.length);
          HumidityData.push(h / elts.length);
          InletTemperatureData.push(it / elts.length);
          OutletTemperatureData.push(ot / elts.length);
          InletPressureData.push(ip / elts.length);
          OutletPressureData.push(op / elts.length);
        } else {
          DifferentialPressureData.push(0);
          MotorCurrentFanData.push(0);
          MotorCurrentRotaryFeederData.push(0);
          MotorTorqueFanData.push(0);
          MotorTorqueRotaryFeederData.push(0);
          EnvironmentalTempertureData.push(0);
          HumidityData.push(0);
          InletTemperatureData.push(0);
          OutletTemperatureData.push(0);
          InletPressureData.push(0);
          OutletPressureData.push(0);
        }
      });
    }
  } else {
    console.log("Nothing to send");
  }

  return [
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
  ];
};

export default dataExport;
