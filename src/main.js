import "./css/index.css"

const cCColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const cCColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const logo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    rocketseat: ["#8747C6", "#6E29DF"],
    apple: ["#D21316", "#FC625D"],
    default: ["black", "gray"],
  }

  cCColor01.setAttribute("fill", colors[type][0])
  cCColor02.setAttribute("fill", colors[type][1])
  logo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("apple")

//globalThis.setCardType = setCardType
