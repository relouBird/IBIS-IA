

let tableElement = (
  date: string,
  timestamp: string,
  variable: string,
  predicted_value: number,
  actual_value: number,
  difference: number,
  threshold: number,
  change_rate: number,
  rul: number
): HTMLTableRowElement => {
  // creation de la ligne de data
  let tabElt = document.createElement("tr");

  // creation de colonne qui gere la date
  let dateHandle = document.createElement("td");
  dateHandle.textContent = date;

  // creation de colonne qui gere la date d'erreur
  let dateHandleStamp = document.createElement("td");
  dateHandleStamp.textContent = timestamp.slice(0,5);

  // creation de colonne qui gere la variable
  let varHandle = document.createElement("td");
  varHandle.textContent = variable;

  // creation de colonne qui gere la valeur predite
  let p = Math.round(predicted_value*1000000) / 1000000
  let preditHandle = document.createElement("td");
  preditHandle.textContent = p.toString();

  // creation de colonne qui gere la valeur lue
  let a = Math.round(actual_value*1000000) / 1000000
  let actualHandle = document.createElement("td");
  actualHandle.textContent = a.toString();

  // creation de colonne qui gere la difference
  let d = Math.round(difference*1000000) / 1000000
  let diffHandle = document.createElement("td");
  diffHandle.textContent = d.toString();

  // creation de colonne qui gere le taux  de rafraichissement
  let c = Math.round(change_rate*1000000) / 1000000
  let rateHandle = document.createElement("td");
  rateHandle.textContent = c.toString();

  // creation de colonne qui gere le taux  de rafraichissement
  let t = Math.round(threshold*1000000) / 1000000
  let thresholdHandle = document.createElement("td");
  thresholdHandle.textContent = t.toString();

  // creation de colonne qui gere le rul
  let r = Math.round(rul*1000000) / 1000000
  let rulHandle = document.createElement("td");
  rulHandle.textContent = r.toString();

  // ajout de tout les elements dans la ligne
  tabElt.appendChild(dateHandle);
  tabElt.appendChild(dateHandleStamp);
  tabElt.appendChild(varHandle);
  tabElt.appendChild(preditHandle);
  tabElt.appendChild(actualHandle);
  tabElt.appendChild(diffHandle);
  tabElt.appendChild(rateHandle);
  tabElt.appendChild(thresholdHandle);
  tabElt.appendChild(rulHandle);

  return tabElt;
};

export default tableElement;
