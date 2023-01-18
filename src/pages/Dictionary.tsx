import React, { useEffect, useState } from 'react'
import { dictionary } from '../models/dictionary'
import { DictionaryService } from '../service/DictionaryService'

function Dictionary() {

    const [words, setWords]=useState<dictionary[]>([]);
    const [word, setWord] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading]=useState(false)
    const audio = new Audio(words[0]?.phonetics[1]?.audio);


    const handleForm=(e: any)=>{
        setLoading(true)
        e.preventDefault();
        let dictionaryService=new DictionaryService()
        dictionaryService.getAll(word)
            .then(res=>{
                setWords(res)
            })
            
            setLoading(false)
            setShow(true);

    }
    // console.log(words[1].meanings[0].definitions[0]);
    console.log(words);
    

  return (
    <>
    <div className='dictionary_bigdiv'>
        <div className='dictionary_div'>
            <h1>Dictionary</h1>
            <form onSubmit={(e)=>handleForm(e)}>
           <div>
           <i className="fa-solid fa-magnifying-glass"></i> &nbsp;
                <input placeholder='type a word' onChange={(e)=>setWord(e.target.value)}/>
           </div>
           {
            word.length ? <p style={{color:'grey'}}>x</p> : <p></p>
           }
                
            </form>
            {
                words.length ? <div>
                <div className='dictionary_results'>
                <div className='flex'>
                <div>
                <h2>
                     {words[0]?.word}&nbsp;
                     <span>{words[0]?.phonetic}</span>
                   </h2>
                   <span>
                     {words[0]?.meanings.map((item) => {
                       return <>{item?.partOfSpeech}/ </>;
                     })}
                   </span>
                </div>
                   <div>
                     {show && (
                       <button onClick={() => audio.play()}> <i className="fa-solid fa-microphone"></i></button>
                     )}
                   </div>
     
                </div>
                 </div>
                 <div  className='dictionary_results'>
                     <h5>Definition</h5>
                <span>
                {words[1]?.meanings.map((item) =>
               
               {
                   return <>{item?.definitions[0].definition}/ </>;
                   })}
                </span>
                    </div>
                </div> : 
                    <span className='span'>Type any existing word and press enter to get meaning, example, synonyms, etc.</span>
             
            }
           

        </div>

    </div>
    
    </>
  )
}

export default Dictionary