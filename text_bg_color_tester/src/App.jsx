import { useState, useEffect } from 'react'

import LoremIpsum from './components/LoremIpsum'
import ColorSelectionButton from './components/ColorSelectionButton'

import './App.css'
import './IBM_Plex_Sans.css'

const initialColors = JSON.parse(localStorage.getItem('colors')) || [
  { textColor: 'black', bgColor: 'yellow' },
  { textColor: 'white', bgColor: 'blue' },
]

function App() {  
  
  const [colors, setColors] = useState(initialColors);
  const [textColor, setTextColor] = useState('white');
  const [bgColor, setBgColor] = useState('black');

  const [newTextColor, setNewTextColor] =useState('')
  const [newBgColor, setNewBgColor] =useState('')

  // useEffect(() => {
  //   fetch('/color-combination.json')
  //     .then(response => response.json())
  //     .then(data => setColors(...data))
  //     .catch(error => console.error('Failed to load colors:', error));
  // }, []);
  

  const handleColorChange = (paramTextColor, paramBgColor) => {
    setTextColor(paramBgColor);
    setBgColor(paramTextColor)
  };

  const addColor = () => {
    if (newTextColor && newBgColor) {
      const updatedColors = [...colors, { textColor: newTextColor, bgColor: newBgColor }];
      setColors(updatedColors); 
      localStorage.setItem('colors', JSON.stringify(updatedColors));
      setNewTextColor('');
      setNewBgColor('');
    }
  }

  const generateRandomCombination = () => {
    const randomTextColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    const randomBgColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    handleColorChange(randomTextColor, randomBgColor);
  };

  return (
    <>
      <h1>Text Bg Color Tester</h1>
      <div className="card" style={{  background: bgColor}}>
        <p className='test-text ibm-plex-sans-medium' style={{ color: textColor  }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
  
        <p className='test-text ibm-plex-sans-bold' style={{ color: textColor  }}>
          위기와 의혹에서 여성에 14일 경우의, 제대로 분쟁이는 질서로 하지, 확실하다. 압박의 11분 던지다 씨 보이는 주인은, 필요하다. 이대로 야당을 체제를 한자의 시장이어도 수출과 늘다. 촉구를 입시의 이번에 지시는 있다 코너와 계기에게 가장이 강조하다. 불구할 국제무대의, 한복판의 있어 집중으로 남자를 업계가 이는 만연한다. 하여 단계가 과거로, 주석직에 위험한 고려하다. "주민의 느림보에 남은 방지한 혈액마다 간접이 고철을 지역의 지나게 미묘하다" "씨 폭발의 달리어서 방식이 회관과 배우다 고에 없지만 주다" 이의 투하된, 뇌의 서로 동원으로 거기에게 확장 생각된 결코 해결한다.
        </p>

        <LoremIpsum sentenceCount={3} className='test-text ibm-plex-sans-bold' style={{ color: textColor  }} />
      </div>
      
      <p className="read-the-docs">
        click to change color
      </p>
      
      <div className='button-container'>
        {colors.map((color, index) => (
          <ColorSelectionButton
            key={index}
            textColor={color.textColor}
            bgColor={color.bgColor}
            changeColor={handleColorChange}
          />
        ))}

        <button onClick={() => generateRandomCombination()}> random </button>
      </div>
      
      <div className="input-container">
        <input
          type="color"
          value={newTextColor}
          onChange={(e) => {
            setNewTextColor(e.target.value);
            handleColorChange(e.target.value, bgColor);
          }}
        />
        <input
          type="color"
          value={newBgColor}
          onChange={(e) => {
            setNewBgColor(e.target.value);
            handleColorChange(textColor, e.target.value);
          }}
        />
        <button onClick={addColor}>Add Color</button>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Text Color (e.g., #000000)"
          value={newTextColor}
          onChange={(e) => {
            setNewTextColor(e.target.value);
            handleColorChange(e.target.value, bgColor);
          }}
          maxLength={7}
        />
        <input
          type="text"
          placeholder="Background Color (e.g., #FFFFFF)"
          value={newBgColor}
          onChange={(e) => {
            setNewBgColor(e.target.value);
            handleColorChange(textColor, e.target.value);
          }}
          maxLength={7}
        />
        <button onClick={addColor}>Add Color</button>
      </div>

    </>
  )
}

export default App
