import {
  NUMBERS,
  ALPHABET_UPPERCASE,
  ALPHABET_LOWERCASE,
  SPECIAL_CHARACTERS,
} from "./data"

export type PasswordGeneratorSettings = {
  length: number
  isNumber: boolean
  isUpperCaseAlphabet: boolean
  isLowerCaseAlphabet: boolean
  isSpecialCharacters: boolean
}

export const generatePassword = (settings: PasswordGeneratorSettings) => {
  const settingsString = `${settings.isNumber ? NUMBERS : ""}${
    settings.isUpperCaseAlphabet ? ALPHABET_UPPERCASE : ""
  }${settings.isLowerCaseAlphabet ? ALPHABET_LOWERCASE : ""}${
    settings.isSpecialCharacters ? SPECIAL_CHARACTERS : ""
  }`

  let password = ""
  for (var i = 0; i <= settings.length; i++) {
    var randomNumber = cryptoRandomNumber(settingsString.length)
    password += settingsString.substring(randomNumber, randomNumber + 1)
  }

  return password
}

export const cryptoRandomNumber = (number: number) => {
  const typedArray = new Uint16Array(1)
  const randomValue = crypto.getRandomValues(typedArray)[0]
  const randomFloat = randomValue / Math.pow(2, 16)
  const randomNumber = Math.floor(randomFloat * number)
  return randomNumber
}
