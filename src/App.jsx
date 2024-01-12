import { useEffect, useState } from "react"
import soundPic from './assets/reuirement/sound_max_fill.svg';
import copyPic from './assets/reuirement/Copy.svg';
import exchange from './assets/reuirement/Horizontal_top_left_main.svg';
import sort from './assets/reuirement/Expand_down.svg';
import languages from './assets/languages.js';

import './App.css'

function App() {


  //this states responsible for displaying and displaying the langoages selector dropdown
  const [selectorDisplay, setSelectorDesplay] = useState({ display: 'none' })
  const [selectorDisplaytranslate, setSelectorDesplaytranslate] = useState({ display: 'none' })

  //this state responsible for counting the text length of textarea
  const [textAreaLength, setTextAreaLingth] = useState(0)

  //this state responsible for changing the text that we want to translate
  const [text, setText] = useState('Hello, how are you')

  //this state resposible for taking the translete text response
  const [translatedtext, setTranslatedText] = useState('')

  //this state responsible for changing the text we need to translate language
  const [textLanguage, setTextLanguage] = useState({ label: languages[0].label, code: languages[0].code });

  //this state responsible for changing the translate text we have get by response
  const [translateLanguage, settranslateLanguage] = useState({ label: languages[1].label, code: languages[1].code });

  //this state responsible for changing the state of translate action so whene we change it's value the useEffect replay and will take the new parameteres like the translate language and the text language 
  const [translate, setTranslate] = useState(true)


  const handlConverLanguage=()=>{
    const index = textLanguage;
    setTextLanguage()
    translateLanguage()
  }



  //useEffect so we have a default text to translate the useEffect replay 
  useEffect(() => {

    fetch('https://api.mymemory.translated.net/get?q=' + text.replace(/ /g, '%20') + '&langpair=' + textLanguage.code + '|' + translateLanguage.code)
      .then(response => response.json())
      .then(data => {
        setTranslatedText(data.responseData.translatedText)
      })
      .catch(error => {
        console.log(error)
      })
  }, [translate, translateLanguage, textLanguage])


  //whene we change textarea value, the text state take a new value and we count how many caracters we have
  const handleTextChange = (e) => {
    setTextAreaLingth(e.target.value.length);
    setText(e.target.value)
  }


  //this function responsible for closing the text language selector drop down and take a new text language value
  const handleChoseLtextanguage = (e) => {
    setTextLanguage({ code: e.target.id, label: e.target.value })
    setSelectorDesplay({ display: 'none' })
  }

  //this function responsible for closing the translate language selector drop down and take a new translate language value
  const handleChoseLtranslateanguage = (e) => {
    settranslateLanguage({ code: e.target.id, label: e.target.value })
    setSelectorDesplaytranslate({ display: 'none' })
  }



  return (
    <div className="container">
      {/*text language drop down */}
      <div className="langages" id="languageDropDow" style={selectorDisplay}>
        <ul>
          <div style={{ display: 'flex', justifyContent: 'end', padding: '10px', color: '#c5c5c5ea' }}>
            <i class="fa-solid fa-xmark" style={{ width: '30px', padding: '4px', border: '2px solid #c5c5c5ea', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }} onClick={() => setSelectorDesplay({ display: 'none' })}></i>
          </div>
          {
            languages.map((item, index) => (
              <li key={index.code}>
                <input type="button" id={item.code} value={item.label} onClick={handleChoseLtextanguage} />
              </li>
            ))
          }
        </ul>
      </div>
      {/*translate language drop down */}
      <div className="langagesTranslat" id="languageDropDow" style={selectorDisplaytranslate}>
            <ul>
              <div style={{ display: 'flex', justifyContent: 'end', padding: '10px', color: '#c5c5c5ea' }}>
                <i class="fa-solid fa-xmark" style={{ width: '30px', padding: '4px', border: '2px solid #c5c5c5ea', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }} onClick={() => setSelectorDesplaytranslate({ display: 'none' })}></i>
              </div>
              {
                languages.map((item, index) => (
                  <li key={index.code}>
                    <input type="button" id={item.code} value={item.label} onClick={handleChoseLtranslateanguage} />
                  </li>
                ))
              }
            </ul>
          </div>
      {/* text section */}
      <div className="textSection">
        <div className="language_nav">
           {/* languages navbar */}
          <button>Detect Language</button>
          <button> {textLanguage.label} </button>
          <button>Frensh</button>
          <button style={{display:'flex',alignItems:'center'}} onClick={() => setSelectorDesplay({ display: 'block' })}> {languages[0].label} <img src={sort} alt="" /> </button>
        </div>
        <div className="text_input" >
          <p className="caracters_number" style={{ color: '#656b74ea', position: 'absolute', left: '90%', top: '90%', fontSize: '12px' }}  > {textAreaLength}/500</p>
          <textarea name="" id="" cols="30" rows="10" value={text} maxLength={500} onChange={handleTextChange} ></textarea>
        </div>
        <div className="buttom_elements">
          <div className="left_elements">
            <img src={soundPic} alt="" />
            <img src={copyPic} alt="" />
          </div>
          <div className="right_eleemnts">
            <button onClick={() => setTranslate(!translate)}>
              Translate
            </button>
          </div>
        </div>
      </div>


        {/* translated text section */}
      <div className="translateTextSection">
        <div className="language_nav">
          {/* languages navbar */}
          <button> {translateLanguage.label} </button>
          <button>Frensh</button>
          <button style={{display:'flex',alignItems:'center'}} onClick={() => setSelectorDesplaytranslate({ display: 'block' })}>{languages[0].label }  <img src={sort} alt="" /></button>
          <img id="exchange" src={exchange} alt=""  />
        </div>
        <div className="translateTextSection_body">
          <p>
            {translatedtext}
          </p>
        </div>
        <div className="translateTextSection_bottom_elemnts">
          <div className="left_elements">
            <img src={soundPic} alt="" />
            <img src={copyPic} alt="" />
          </div>
        </div>
      </div>



    </div>
  )
}

export default App
