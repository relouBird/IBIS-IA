const elements3: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".choice-child");


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
      }else if (value && value === "Rotary Feeder") {
        window.location.href = "./feeder.html";
      }
    });
  });