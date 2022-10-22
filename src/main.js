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

//------- MÁSCARAS NOS CAMPOS & Regex ---------------------
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
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

//-------- INTERAGINDO COM A INTERFACE DO CARTÃO ----------
//desativar o recarrgar a pag
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

//mensagem da ação do botão
const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("cartão adicionado")
})

//nome de usuário
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "Fulano da Silva" : cardHolder.value
})

//cvc
securityCodeMasKed.on("accept", () => {
  updateSecurityCode(securityCodeMasKed.value)
})
function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "1234" : code
}

//número do cartão
cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

//data de Expiração
expirationDateMaskd.on("accept", () => {
  updateExpirationDate(expirationDateMaskd.value)
})
function updateExpirationDate(date) {
  const ccExpirationDate = document.querySelector(".cc-extra .value")
  ccExpirationDate.innerText = date.length === 0 ? "02/32" : date
}
