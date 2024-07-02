import { ErrorObject, resultData } from "./type";
type GraphDataType = number[][];

export let GraphData = async (): Promise<GraphDataType> => {
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

  // recuperer les données ici....
   await fetch("http://localhost:8000/rms_data")
    .then((data) => data.json())
    .then((r) => {
      let datas: resultData[] | ErrorObject = r;

      if( Array.isArray(datas)){
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
      } else{
        console.log("Nothing to send")
      }
    });

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
