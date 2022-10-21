import "./css/index.css"
import IMask from "imask"

//---------- CORES & LOGOS -------
//pegar os elementos na pagina html
const cCColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const cCColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const logo = document.querySelector(".cc-logo span:nth-child(2) img")

//tipos de cartões com cores e logos
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

//setCardType("apple")
globalThis.setCardType = setCardType

//------- MÁSCARAS NOS CAMPOS ---------------------
//cvc
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasKed = IMask(securityCode, securityCodePattern)

//mês e ano de Expiração
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMaskd = IMask(expirationDate, expirationDatePattern)

//número do cartão (expressões regulares)
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6\d{0,15}/,
      cardtype: "rocketseat",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^16\d{0,14}/,
      cardtype: "apple",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask)
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
