import { useEffect, useState, useRef } from "react"
import soundPic from './assets/reuirement/sound_max_fill.svg';
import copyPic from './assets/reuirement/Copy.svg';
import exchange from './assets/reuirement/Horizontal_top_left_main.svg';
import sort from './assets/reuirement/Expand_down.svg';
import languages from './assets/languages.js';
import logo from './assets/reuirement/logo.svg';


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
  const [translateLanguage, setTranslateLanguage] = useState({ label: languages[1].label, code: languages[1].code });

  //this state responsible for changing the state of translate action so whene we change it's value the useEffect replay and will take the new parameteres like the translate language and the text language 
  const [translate, setTranslate] = useState(true)

  //gite the current value of text area
  const copytextarea = useRef(null)
  const copytranslatearea = useRef(null)


  //text copied popup message
  const [copiesMessage,setCopiedMessage] = useState({display:'none'})


  const handlConverLanguage=()=>{
    setTextLanguage(translateLanguage);
    setTranslateLanguage(textLanguage);
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
    setTranslateLanguage({ code: e.target.id, label: e.target.value })
    setSelectorDesplaytranslate({ display: 'none' })
  }


  //text to speech
  const handlTextTospeech=()=>{
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      // Set the language code
      utterance.lang = textLanguage.code;

      // Optionally, you can set additional properties of the utterance, like rate, pitch, etc.

      synth.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }

  }

  //translated text to speech
  const handlTranslatedTextTospeech=()=>{
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(translatedtext);

      // Set the language code
      utterance.lang = translateLanguage.code;

      // Optionally, you can set additional properties of the utterance, like rate, pitch, etc.

      synth.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }

  }


  const handlcCopieText = ()=>{
    if(copytextarea.current){
      copytextarea.current.select();
      document.execCommand('copy');
      setCopiedMessage({display:'flex'});
      setTimeout(()=>
      setCopiedMessage({display:'none'}),2000)
    }
  }
  const handlcCopieTranslatedText = ()=>{
    if(copytranslatearea.current){
      copytranslatearea.current.select();
      document.execCommand('copy');
      setCopiedMessage({display:'flex'});
      setTimeout(()=>
      setCopiedMessage({display:'none'}),2000)
    }
  }

  




  return (
    <>
    <div className="all">
      
    </div>
    <div className="container">
      <div className="text_copied_Popup" style={copiesMessage}>
        <i className="fa-regular fa-circle-check"></i><p>Text has been copied</p>
      </div>
      {/*text language drop down */}
      <div className="langages" id="languageDropDow" style={selectorDisplay}>
        <ul>
          <div style={{ display: 'flex', justifyContent: 'end', padding: '10px', color: '#c5c5c5ea' }}>
            <i className="fa-solid fa-xmark" style={{ width: '30px', padding: '4px', border: '2px solid #c5c5c5ea', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }} onClick={() => setSelectorDesplay({ display: 'none' })}></i>
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
                <i className="fa-solid fa-xmark" style={{ width: '30px', padding: '4px', border: '2px solid #c5c5c5ea', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }} onClick={() => setSelectorDesplaytranslate({ display: 'none' })}></i>
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
          <button >Detect Language</button>
          <button style={{backgroundColor:'#3b414bea',color:'#c5c5c5ea'}}> {textLanguage.label} </button>
          <button>Frensh</button>
          <button style={{display:'flex',alignItems:'center'}} onClick={() => setSelectorDesplay({ display: 'block' })}> {languages[0].label} <img src={sort} alt="" /> </button>
        </div>
        <div className="text_input" >
          <p className="caracters_number" style={{ color: '#656b74ea', position: 'absolute', left: '90%', top: '90%', fontSize: '12px' }}  > {textAreaLength}/500</p>
          <textarea ref={copytextarea} name="" id="" cols="30" rows="10" value={text} maxLength={500} onChange={handleTextChange} ></textarea>
        </div>
        <div className="buttom_elements">
          <div className="left_elements">
            <img src={soundPic} onClick={handlTextTospeech} alt="" />
            <img src={copyPic} onClick={handlcCopieText} alt="" />
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
          <button style={{backgroundColor:'#3b414bea',color:'#c5c5c5ea'}}> {translateLanguage.label} </button>
          <button>Frensh</button>
          <button style={{display:'flex',alignItems:'center'}} onClick={() => setSelectorDesplaytranslate({ display: 'block' })}>{languages[0].label }  <img src={sort} alt="" /></button>
          <img id="exchange" src={exchange} alt="" onClick={handlConverLanguage}  />
        </div>
        <div className="translateTextSection_body">
          <textarea name="" ref={copytranslatearea} id="" value={translatedtext} cols="30" rows="10" disabled={true}></textarea>
        </div>
        <div className="translateTextSection_bottom_elemnts">
          <div className="left_elements">
            <img src={soundPic} onClick={handlTranslatedTextTospeech} alt="" />
            <img src={copyPic} alt="" onClick={handlcCopieTranslatedText} />
          </div>
        </div>
      </div>



    </div>
    </>)
}

export default App
