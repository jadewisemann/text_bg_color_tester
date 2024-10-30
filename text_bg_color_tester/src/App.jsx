import { useState, useEffect } from 'react'

import { fetchFromJson, isValidColor, removeDuplicates, generateRandomColor, isDuplicateColor } from './utils'

import LoremIpsum from './components/LoremIpsum'
import ColorSelectionButton from './components/ColorSelectionButton'
import FontSelector from './components/FontSelector'

import './App.css'
import './style/fonts/ibm-plex-sans.css'
import './style/fonts/noto-sans-kr.css'

const localStorageColors = JSON.parse(localStorage.getItem('colors')) || [
  { textColor: 'black', bgColor: 'yellow' },
  { textColor: 'white', bgColor: 'blue' },
]

// todo
// 동적 폰트 셀렉터


function App() {  
  
  const [jsonColors, setJsonColors] = useState([])
  const [colors, setColors] = useState(localStorageColors);

  const [textColor, setTextColor] = useState('black');
  const [bgColor, setBgColor] = useState('white');

  const [newTextColor, setNewTextColor] =useState('')
  const [newBgColor, setNewBgColor] = useState('')
  
  const [fonts, setFonts] = useState([])
  const [selectedFont, setSelectedFont] = useState( 'ibm-plex-sans' ) 
  

  useEffect(() => {

    const loadColors = async () => {
      const loadedJsonColors = await fetchFromJson('/color-combination.json');
      setJsonColors(loadedJsonColors)
      setColors(removeDuplicates([...loadedJsonColors, ...localStorageColors]))
    };

    const loadFontFamilies = async () => {
      const loadedJsonFonts = await fetchFromJson('/fonts.json');
      setFonts(loadedJsonFonts)
    };

    loadColors();
    loadFontFamilies();
  }, []);

  const handleFontChange = (font) => {
    setSelectedFont(font);
  };


  const resetLocalStorage = (defaultColors) => {
    localStorage.removeItem('colors');
    localStorage.setItem('colors', JSON.stringify(defaultColors))
  };
  
  const setToDefault = (defaultColors) => {
    setColors(defaultColors);
    setTextColor('black')
    setBgColor('white')
  }
  
  const resetButtonHandler = () => {
    resetLocalStorage(jsonColors)
    setToDefault(jsonColors)
  }

  const handleColorChange = (paramTextColor, paramBgColor) => {
    if (isValidColor(paramTextColor) && isValidColor(paramBgColor)) {
      setTextColor(paramTextColor);
      setNewTextColor(paramTextColor)
      setBgColor(paramBgColor)
      setNewBgColor(paramBgColor)
    }
  };
  
  const addColor = () => {
    if (!isValidColor(newTextColor) || !isValidColor(newBgColor)){
      return alert("hex error")
    } 
    if (isDuplicateColor(colors, newTextColor, newBgColor)) { 
      return alert("duplicate colors")
    }
    
    const updatedColors = [...colors, { textColor: newTextColor, bgColor: newBgColor }];
    setColors(updatedColors); 
    localStorage.setItem('colors', JSON.stringify(updatedColors));
    setNewTextColor('');
    setNewBgColor('');
  }

  const removeColor = (colors, paramTextColor, paramBgColor) => {
    const updatedColors = colors.filter(color => {
      return !(color.textColor === paramTextColor && color.bgColor === paramBgColor)
    });

    setColors(updatedColors)
  }
  
  const removeColorHandler = () => {
    if (newTextColor === textColor && newBgColor === bgColor) {
      removeColor(colors, newTextColor, newBgColor)
      setNewBgColor('')
      setNewTextColor('')
    }
  }

  
  const randomButtonHandler = () => {
    const randomBgColor = generateRandomColor()
    const randomTextColor = generateRandomColor()
    handleColorChange(randomTextColor, randomBgColor);
    setNewTextColor(randomTextColor);
    setNewBgColor(randomBgColor);
  }


  

  return (
    <>
      <h1>title</h1>
      <div>font name</div>
      <div>font selector</div>
      <FontSelector fonts={fonts} onFontChange={handleFontChange} selectedFont={selectedFont}/>
      <div>example selector</div>
      <div className={`test-text ${selectedFont}`} style={{ background: bgColor, color: textColor}}>
        <p className='test-text' style={{ }}>
          Aa Bb Cc Dd 가나다라마바사 ABC 12345!@#$% <br/>
          QUICK BROWN FOX JUMPS OVER THE LAZY DOG <br/>
          quick brown fox jumps over the lazy dog <br/>
          키스의 고유조건은 입술끼리 만나야 하고 기술은 필요치 않다.<br/>
          1234567890!@#$%^&*()
        </p>
        <LoremIpsum sentenceCount={3} className='test-text' style={{   }} />
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

        <button onClick={() => randomButtonHandler()}> random </button>
      </div>
      

      <div className="input-container">
        <div>
          <label>Text Color:</label>
          <input
            type="color"
            value={newTextColor}
            onChange={(e) => {
              setNewTextColor(e.target.value);
              handleColorChange(e.target.value, bgColor);
            }}
          />
          <input
            type="text"
            placeholder="#000000"
            value={newTextColor}
            onChange={(e) => {
              const value = e.target.value;
              setNewTextColor(value);
              handleColorChange(value, bgColor);
            }}
            maxLength={7}
          />
        </div>

        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={newBgColor}
            onChange={(e) => {
              setNewBgColor(e.target.value);
              handleColorChange(textColor, e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="#FFFFFF"
            value={newBgColor}
            onChange={(e) => {
              const value = e.target.value;
              setNewBgColor(value);
              handleColorChange(textColor, value);
            }}
            maxLength={7}
          />
        </div>

        <button onClick={addColor}>Add Color</button>
        <button onClick={removeColorHandler}> remove Color</button>
      </div>
      
      <div>
        <button onClick={resetButtonHandler} style={{ marginTop: '20px' }}>
          Reset Colors
        </button>
      </div>
    </>
  )
}

export default App
