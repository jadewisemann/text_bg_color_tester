import { useState } from 'react'
import './App.css'

function App() {

  const [textColor, setTextColor] = useState('black')
  const [bgColor, setBgColor] = useState('yellow')

  const changeColor = (paramTextColor, paramBgColor) => {
    setTextColor(paramBgColor);
    setBgColor(paramTextColor)
  }
  return (
    <>
      <h1>Text Bg Color Tester</h1>
      <div className="card" style={{
        background: bgColor
      }}>
        <p style={{
          color: textColor
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <p className="read-the-docs">
        click to change color
      </p>
      <p className="">
        <button onClick={() => changeColor('yellow', 'black')}>
          yellow + black
        </button>

        <button onClick={() => changeColor('red', 'brown')}>
          red + blown
        </button>
        
        <button onClick={() => changeColor('black', 'white')}>
          black + white
        </button>
      </p>
    </>
  )
}

export default App
