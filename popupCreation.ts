let popupCreation = (creationDate: string) => {
  let popup = document.createElement("div");
  popup.classList.add("popup");

  let close = document.createElement("div");
  close.classList.add("close");
  close.innerHTML = `<svg width="22.5" height="22.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.192 6.34399L11.949 10.586L7.70703 6.34399L6.29303 7.75799L10.535 12L6.29303 16.242L7.70703 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z"
            fill="#0007" />
        </svg>`;

  let type = document.createElement("div");
  type.classList.add("type");
  let p1 = document.createElement("p");
  p1.innerHTML = "New Anomaly detected !";
  let p2 = document.createElement("p");
  p2.innerHTML = "at, " + creationDate;
  type.appendChild(p1);
  type.appendChild(p2);

  // permet de rassambler tout
  popup.appendChild(close);
  popup.appendChild(type);

  return popup;
};

export default popupCreation;
