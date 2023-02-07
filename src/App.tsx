import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { generatePassword, PasswordGeneratorSettings } from "./generatePassword"

function App() {
  const [password, setPassword] = useState("f4934$#$#3r3erqw")
  const [isCopied, setIsCopied] = useState(false)
  const [settings, setSettings] = useState<PasswordGeneratorSettings>({
    length: 16,
    isNumber: true,
    isUpperCaseAlphabet: true,
    isLowerCaseAlphabet: true,
    isSpecialCharacters: true,
  })

  const handlePasswordOnClick = useCallback(() => {
    navigator.clipboard.writeText(password)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [password])

  const handleInputOnChange = (e: ChangeEvent) => {
    const { name, valueAsNumber, checked } = e.target as EventTarget &
      HTMLInputElement
    setSettings((values) => ({
      ...values,
      [name]: isNaN(valueAsNumber) ? checked : valueAsNumber,
    }))
  }

  const generateNewPassword = useCallback(() => {
    setPassword(generatePassword(settings))
    setIsCopied(false)
  }, [settings])

  useEffect(() => {
    generateNewPassword()
    if (
      !(
        settings.isNumber ||
        settings.isUpperCaseAlphabet ||
        settings.isLowerCaseAlphabet ||
        settings.isSpecialCharacters
      )
    ) {
      setSettings((values) => ({
        ...values,
        isNumber: true,
      }))
    }
  }, [settings])

  return (
    <div className="App">
      <h1>06/27 - Password Generator</h1>

      <div className="password_container" title="click on password to copy">
        <div className="password_box" onClick={handlePasswordOnClick}>
          <span className="password">{password}</span>
        </div>
        <span className="pawword_copy">
          (
          {isCopied
            ? "password copied to clipboard 🎉"
            : "click on password to copy 👆"}
          )
        </span>
      </div>
      <div className="input_container">
        <div>Adjust the settings according to your need</div>
        <div className="input_item">
          <label htmlFor="length">Password Length ({settings.length})</label>
          <input
            className="input"
            type="range"
            min={8}
            max={128}
            id="length"
            name="length"
            value={settings.length}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="input_item">
          <label htmlFor="isNumber">Numbers</label>
          <input
            className="input"
            type="checkbox"
            id="isNumber"
            name="isNumber"
            checked={settings.isNumber}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="input_item">
          <label htmlFor="isUpperCaseAlphabet">Alphabets (uppercase)</label>
          <input
            className="input"
            type="checkbox"
            id="isUpperCaseAlphabet"
            name="isUpperCaseAlphabet"
            checked={settings.isUpperCaseAlphabet}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="input_item">
          <label htmlFor="isLowerCaseAlphabet">Alphabets (lowercase)</label>
          <input
            className="input"
            type="checkbox"
            id="isLowerCaseAlphabet"
            name="isLowerCaseAlphabet"
            checked={settings.isLowerCaseAlphabet}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="input_item">
          <label htmlFor="isSpecialCharacters">Special Characters</label>
          <input
            className="input"
            type="checkbox"
            id="isSpecialCharacters"
            name="isSpecialCharacters"
            checked={settings.isSpecialCharacters}
            onChange={handleInputOnChange}
          />
        </div>
      </div>
      <button className="generate_password" onClick={generateNewPassword}>
        Generate New Password
      </button>
    </div>
  )
}

export default App
