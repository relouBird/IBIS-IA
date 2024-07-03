export interface anomaliesData {
    date: string,
    timestamp: string,
    variable: string,
    valeur_predite: number,
    valeur_lue: number,
    difference: number,
    seuil: number,
    taux_changement: number,
    rul: number
}

export interface resultData {
    date: string,
    timestamp: string,
    courant_moteur1_rms: number,
    courant_moteur2_rms: number,
    charge_moteur1_rms: number,
    charge_moteur2_rms: number,
    env_temperature_rms: number,
    inlet_temperature_rms: number,
    outlet_temperature_rms: number,
    inlet_pressure_rms: number,
    outlet_pressure_rms: number,
    pression_rms: number,
    humidite_rms: number,
}

export interface ErrorObject {
    error?: string;
}

export type chartDataType = [string[], number[][]]