import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';
// import './popper.min.js';
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import FormData from 'form-data';

// import 
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>



const PlayGreekAll = () => {

  console.log('aaa')
  const [greekChapters, setGreekChapters] = useState([]);
  const [greekCharacters, setGreekCharacters] = useState([]);

  // const [chapterr,setChapter] = useState(1);
  // setChapter(chapter+1)
  const location = useLocation();
  const title = location.state.title;
  const translator = location.state.translator;
  const id = location.state.id;
  const id2 = location.state.id2;
  const id3 = location.state.id3;
  const totalActs = location.state.totalActs;
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekChapters', {
      params: {
        id:id
      }
    })
    .then((response) => {
      setGreekChapters(response.data);  
    })
  },);

  
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekCharacters', {
      params: {
        id:id
      }
    })
    .then((response) => {
      setGreekCharacters(response.data);  
    })
  }, []);
  let tempSection = 0;
  return (
    <div> 
      <h2 className="title-1">{title} - {translator}</h2> 
      <br></br>
      <br></br>
      
      <div class="container">
        <div class="row">
          <div class="col-8">
          
          <h5>Έργο χωρισμένο σε πράξεις</h5>
          <br></br>

          {greekChapters.map( (val,counter)=> {
            if (val.Section != tempSection){
               tempSection = val.Section;
              return <div className="" key={counter}> <br></br><div><Link className="link-3" to ={{
                pathname: '/greek/playAll',
                state: {id:id,id2:id2,id3:id3,act:val.Section,chapter:val.Chapter,totalActs:totalActs}
              }}>Πράξις {val.Section}</Link></div> Σκηνή {val.Chapter}. {val.Description}</div>
            }
            else {
               return <div className="" key={counter}>Σκηνή {val.Chapter}. {val.Description}</div>
            }
           
          })}
           <br></br>
          {/* {greekChapters.map( (val,counter)=> {
            return <div className="" key={counter}>Σκηνή {val.Chapter}. {val.Description}</div>
          })} */}

          </div>
          <div class="col-4">
          <h5>Χαρακτήρες</h5>
          <br></br>
          <br></br>
          {greekCharacters.map( (val,counter)=> {
            return <div className="" key={counter}>{val.CharName}</div>
          })}

          </div>
        </div>
      </div>
     
      
    </div>
    )
}

const PlayGreek = () => {

  const [greekChapters, setGreekChapters] = useState([]);
  const [greekCharacters, setGreekCharacters] = useState([]);

  // const [chapterr,setChapter] = useState(1);
  // setChapter(chapter+1)
  const location = useLocation();
  const title = location.state.title;
  const translator = location.state.translator;
  const id = location.state.id;
  const id2 = location.state.id2;
  const totalActs = location.state.totalActs;
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekChapters', {
      params: {
        id:id
      }
    })
    .then((response) => {
      setGreekChapters(response.data);  
    })
  }, []);

  
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekCharacters', {
      params: {
        id:id
      }
    })
    .then((response) => {
      setGreekCharacters(response.data);  
    })
  }, []);
  let tempSection = 0;
  return (
    <div> 
      <h2 className="title-1">{title} - {translator}</h2> 
      <br></br>
      <br></br>
      
      <div class="container">
        <div class="row">
          <div class="col-8">
          
          <h5>Έργο χωρισμένο σε πράξεις</h5>
          <br></br>

          {greekChapters.map( (val,counter)=> {
            if (val.Section != tempSection){
               tempSection = val.Section;
              return <div className="" key={counter}> <br></br><div><Link className="link-3" to ={{
                pathname: '/greek/play',
                state: {id:id,id2:id2,act:val.Section,chapter:val.Chapter,totalActs:totalActs}
              }}>Πράξις {val.Section}</Link></div> Σκηνή {val.Chapter}. {val.Description}</div>
            }
            else {
               return <div className="" key={counter}>Σκηνή {val.Chapter}. {val.Description}</div>
            }
           
          })}
           <br></br>
          {/* {greekChapters.map( (val,counter)=> {
            return <div className="" key={counter}>Σκηνή {val.Chapter}. {val.Description}</div>
          })} */}

          </div>
          <div class="col-4">
          <h5>Χαρακτήρες</h5>
          <br></br>
          <br></br>
          {greekCharacters.map( (val,counter)=> {
            return <div className="" key={counter}>{val.CharName}</div>
          })}

          </div>
        </div>
      </div>
     
      
    </div>
    )
}
const TextGreekAll = () => {
 

  const [greekText, setGreekText] = useState([]);
  const [englishText, setEnglishText] = useState([]);
  const [allTexts, setAllTexts] = useState([]);
  const [greekDescription, setGreekDescription] = useState([]);

  // const [englishPage, setEnglishPage] = useState(1);

  const location = useLocation();
  const act = location.state.act;
  const chapter = location.state.chapter;
  const id = location.state.id;
  const id2 = location.state.id2;
  const id3 = location.state.id3;
  const id4= 'belliesromeo';
  const totalActs = location.state.totalActs;

  // let currentChapter=1;

 


  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekDescription', {
      params: {
        id:id,
        act:act,
        chapter:chapter
      }
    })
    .then((response) => {
      setGreekDescription(response.data);  
    })
  }, []);



  useEffect(() => {
    Axios.get('http://localhost:3001/api/getTwoTranslations', {
      params: {
        id:id,
        id2:id2,
        id3:id3,
        act:act
      }
    })
    .then((response) => {
      setAllTexts(response.data);  
      // console.log(response.data);
    })
  }, []);


  let chapterCount=5;


 let currentChapterGreek=0;
 let currentChapterEnglish=0;
  let i=1;
  let chapterFlag=false;
  return (
    <div> 
       <br></br>
       <br></br>
      <h4  className="chapterTitles">Πράξις {act}</h4>
   
      <hr color= "#7a1818"></hr>
     <div class="container">
       {/* <div class="row"> */}
        
         {/* <div class="col-sm"> */}
           
         {allTexts.map( (val,counter)=> {
            let textEn=val.EnText;
            textEn= textEn.replace(/\[p]/g, '\n');
            let textGr=val.GrText;
            textGr= textGr.replace(/\[p]/g, '\n');
            let textGr2=val.GrText2;
            textGr2= textGr2.replace(/\[p]/g, '\n');
            let aliasGr=val.AliasGR+':';
            let aliasGr2=val.AliasGR2+':';
            if (val.AliasGR==='blank'){
             aliasGr="";
             textGr="";
            }
            if (val.AliasGR2==='blank'){
              aliasGr2="";
              textGr2="";
             }
          if (currentChapterEnglish==val.Chapter){
              
               return <div class="row"><div class = "col-sm"><div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div></div><div class = "col-sm"><div className="" key={counter}><span className="Abbrev">{aliasGr}</span> {textGr}</div></div><div class = "col-sm"><div className="" key={counter}><span className="Abbrev">{aliasGr2}</span> {textGr2}</div></div></div>
           }
           else{
             currentChapterEnglish++;
             if (currentChapterEnglish==1){
              let descrEn=val.EnTitle;
               descrEn= descrEn.replace(/&#8217;/g, '\'');
               let descrGr=val.GrTitle;
               let descrGr2=val.GrTitle2;

               return< div class="row">
                 <div class="col-sm">
                   <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
                   <h4  className="chapterTitles-4" ><span>{descrEn}</span></h4>
                   <div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div>
                 </div>
                 <div class="col-sm">
                   <h4  className="chapterTitles-3"> Σκηνή {currentChapterEnglish}</h4>
                   <h4  className="chapterTitles-4" ><span>{descrGr}</span></h4>
                  <div className="" key={counter}><span className="Abbrev">{val.AliasGR}:</span> {textGr}</div>
                 </div>
                 <div class="col-sm">
                   <h4  className="chapterTitles-3"> Σκηνή {currentChapterEnglish}</h4>
                   <h4  className="chapterTitles-4" ><span>{descrGr2}</span></h4>
                  <div className="" key={counter}><span className="Abbrev">{val.AliasGR2}:</span> {textGr2}</div>
                 </div>
                 <hr color= "#7a1818"></hr>
             </div>
             
             }
             else{
               let descrEn=val.EnTitle;
               descrEn= descrEn.replace(/&#8217;/g, '\'');
               let descrGr=val.GrTitle;
               let descrGr2=val.GrTitle2;


               
             return <div> 
             < div class="row">
             <hr color= "#7a1818"></hr>
             <div class="col-sm">
               <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
               <h4 className="chapterTitles-4">{descrEn}</h4>
               <br></br>
               <div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div>
             </div>
             <div class="col-sm">
               <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
               <h4 className="chapterTitles-4">{descrGr}</h4>
              <div className="" key={counter}><span className="Abbrev">{val.AliasGR}:</span> {textGr}</div>
             </div>
             <div class="col-sm">
               <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
               <h4 className="chapterTitles-4">{descrGr2}</h4>
              <div className="" key={counter}><span className="Abbrev">{val.AliasGR2}:</span> {textGr2}</div>
             </div>
             <hr color= "#7a1818"></hr>
             </div>
             </div>
             
           }
           }
           }
         )}
        
       <hr></hr>
     </div>
   </div>
 
   )

}


const TextGreek = () => {
 

  const [greekText, setGreekText] = useState([]);
  const [englishText, setEnglishText] = useState([]);
  const [allTexts, setAllTexts] = useState([]);
  const [greekDescription, setGreekDescription] = useState([]);

  // const [englishPage, setEnglishPage] = useState(1);

  const location = useLocation();
  const act = location.state.act;
  const chapter = location.state.chapter;
  const id = location.state.id;
  const id2 = location.state.id2;
  const totalActs = location.state.totalActs;

  // let currentChapter=1;

 


  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekDescription', {
      params: {
        id:id,
        act:act,
        chapter:chapter
      }
    })
    .then((response) => {
      setGreekDescription(response.data);  
    })
  }, []);



  useEffect(() => {
    Axios.get('http://localhost:3001/api/getAllTexts', {
      params: {
        id:id,
        id2:id2,
        act:act
      }
    })
    .then((response) => {
      setAllTexts(response.data);  
    })
  }, []);


  let chapterCount=5;


 let currentChapterGreek=0;
 let currentChapterEnglish=0;
  let i=1;
  let chapterFlag=false;

  
  return (
   <div> 
      <br></br>
      <br></br>
     <h4  className="chapterTitles">Πράξις {act}</h4>
  
     <hr color= "#7a1818"></hr>
    <div class="container">
      {/* <div class="row"> */}
       
        {/* <div class="col-sm"> */}
          
        {allTexts.map( (val,counter)=> {
           let textEn=val.EnText;
           textEn= textEn.replace(/\[p]/g, '\n');
           let textGr=val.GrText;
           textGr= textGr.replace(/\[p]/g, '\n');
           let aliasGr=val.Alias+':';
           if (val.Alias==='blank'){
            aliasGr="";
            textGr="";
           }
         if (currentChapterEnglish==val.Chapter){
             
              return <div class="row"><div class = "col-sm"><div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div></div><div class = "col-sm"><div className="" key={counter}><span className="Abbrev">{aliasGr}</span> {textGr}</div></div></div>
          }
          else{
            currentChapterEnglish++;
            if (currentChapterEnglish==1){
             let descrEn=val.EnTitle;
              descrEn= descrEn.replace(/&#8217;/g, '\'');
              let descrGr=val.GrTitle;
              return< div class="row">
                <div class="col-sm">
                  <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
                  <h4  className="chapterTitles-4" ><span>{descrEn}</span></h4>
                  <div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div>
                </div>
                <div class="col-sm">
                  <h4  className="chapterTitles-3"> Σκηνή {currentChapterEnglish}</h4>
                  <h4  className="chapterTitles-4" ><span>{descrGr}</span></h4>
                 <div className="" key={counter}><span className="Abbrev">{val.Alias}:</span> {textGr}</div>
                </div>
                <hr color= "#7a1818"></hr>
            </div>
            
            }
            else{
              let descrEn=val.EnTitle;
              descrEn= descrEn.replace(/&#8217;/g, '\'');
              let descrGr=val.GrTitle;
            return< div class="row">
            <hr color= "#7a1818"></hr>
            <div class="col-sm">
              <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
              <h4 className="chapterTitles-4">{descrEn}</h4>
              <div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div>
            </div>
            <div class="col-sm">
              <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
              <h4 className="chapterTitles-4">{descrGr}</h4>
             <div className="" key={counter}><span className="Abbrev">{val.Alias}:</span> {textGr}</div>
            </div>
            <hr color= "#7a1818"></hr>
            </div>
          }
          }
          }
        )}
       
      <hr></hr>
    </div>
  </div>

  )
}

// const Plays = () => {

//   const [playTitleList, setPlayTitleList] = useState([]);

//    useEffect(() => {
//     Axios.get('http://localhost:3001/api/getPlays').then((response) => {
//       setPlayTitleList(response.data);  
//     })
//   }, []);
  
//   return (
//   <div class="link-2"> 
//     <h3 className="title-1">All Plays written by William Shakespeare</h3>
//     <br></br>
//     {playTitleList.map( (val,counter)=> {
//     return <div className="playTitles" key={counter}><Link to = {{
//       pathname: '/plays/play',
//             state: { title:val.Title, id:val.WorkID}
//            }}> {val.Title}</Link></div>
//   })}
  

//    </div>
//   )
// }

// const Play = () => {

//   const location = useLocation();
//   const title = location.state.title;
//   const id=location.state.id;
//   console.log(id)

//   const [englishText, setEnglishText] = useState([]);

//   useEffect(() => {
//     Axios.get('http://localhost:3001/api/getEnglishText', {
//       params: {
//         id2:id,
//       }
//     })
//     .then((response) => {
//       setEnglishText(response.data);  
//       console.log(response.data)
//     })
//   }, []);


//   let chapterCount=5;


//  let currentChapterGreek=0;
//  let currentChapterEnglish=0;
//   let i=1;
//   let chapterFlag=false;

  
//   return (
//    <div> 
//       <br></br>
//       <br></br>
//      <h4  className="chapterTitles">Πράξις</h4>
  
//      <hr color= "#7a1818"></hr>
//     <div class="container">
//       {/* <div class="row"> */}
       
//         {/* <div class="col-sm"> */}
          
//         {englishText.map( (val,counter)=> {
//            let textEn=val.PlainText;
//            textEn= textEn.replace(/\[p]/g, '\n');

//          if (currentChapterEnglish==val.Chapter){
             
//               return <div class="row"><div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div></div>
//           }
//           else{
//             currentChapterEnglish++;
//             if (currentChapterEnglish==1){
//              let descrEn=val.EnTitle;
//               descrEn= descrEn.replace(/&#8217;/g, '\'');
//               return< div class="row">
//                   <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
//                   <h4  className="chapterTitles-4" ><span>{descrEn}</span></h4>
//                   <div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div>
//                 <hr color= "#7a1818"></hr>
//             </div>
            
//             }
//             else{
//               let descrEn=val.EnTitle;
//               descrEn= descrEn.replace(/&#8217;/g, '\'');
//             return< div class="row">
//             <hr color= "#7a1818"></hr>
//               <h4  className="chapterTitles-3"> Chapter {currentChapterEnglish}</h4>
//               <h4 className="chapterTitles-4">{descrEn}</h4>
//               <div className="" key={counter}><span className="Abbrev">{val.Abbrev}:</span> {textEn}</div>
//             <hr color= "#7a1818"></hr>
//             </div>
//           }
//           }
//           }
//         )}
       
//       <hr></hr>
//     </div>
//   </div>

//   )
  
// }

const TranslatedGreek = () => {


  const [playTitleList, setPlayTitleList] = useState([]);
  const [greekPlayTitleList, setGreekPlayTitleList] = useState([]);

  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptionTitle, setSelectedOptionTitle] = useState("-");
  // const [greekPlayTitleList, setGreekPlayTitleList] = useState([]);
  const title="";

 let play;
  useEffect(() => {
    play=selectedOption;
    Axios.get('http://localhost:3001/api/getTranslations', {
      params: {
        id:selectedOption
      }
    })
    .then((response) => {
      setGreekPlayTitleList(response.data);  
    })
    
  }, [selectedOption]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getTranslatedPlays').then((response) => {
      setPlayTitleList(response.data);  
    })
  }, []);



  //  useEffect(() => {
  //   Axios.get('http://localhost:3001/api/getGreekPlays').then((response) => {
  //     // console.log(1);
  //     setGreekPlayTitleList(response.data);  
  //   })
  // }, []);
  return (

      <div> 
        <div className="title-1"><img src="logo.png"></img></div>
        <h4 className="title-2">Tanslated William Shakespeare Plays</h4>
        <hr color= "#7a1818"></hr>
        <h3 className="title-1">Plays in Greek language</h3>
        <br></br>
        <div className="center">

        <Dropdown class="">
        <Dropdown.Toggle id="dropdown-custom-1" className="btn btn-secondary dropdown1" >Select a Play</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown1 ">
      {playTitleList.map( (val,counter)=> {
        
          return <div>
           
            <Dropdown.Item className= 'playTitles' key={counter}  onClick={ () => {setSelectedOptionTitle(val.Title); setSelectedOption(val.WorkID)}}
            >{val.Title}</Dropdown.Item> </div>
           
        })}
        
         </Dropdown.Menu>
         </Dropdown>{' '}
         <div className="pd-left">
        <button className="btn btn-secondary dropdown1 "> {selectedOptionTitle} </button>
        </div>

         </div>
         <div className="center">
      
         <Dropdown class="">
           
        <Dropdown.Toggle id="dropdown-custom-1" className="btn btn-secondary dropdown1" >Select a Translation</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown1 ">
         
      {greekPlayTitleList.map( (val,counter)=> {
        
        if (val.GreekWorkID === "allromeo"){
          return <div className="link-2"><Dropdown.Item> <Link to={{
            pathname: '/greekAll',
            state: { title:val.Title, translator:val.Translator, id:'vikelasromeo', id2:val.WorkID,id3:'belliesromeo'}
           }}className= 'playTitles' key={counter}>{val.Translator}</Link></Dropdown.Item>
             </div>
        }
        else{
          return <div className="link-2"><Dropdown.Item> <Link to={{
            pathname: '/greek',
            state: { title:val.Title, translator:val.Translator, id:val.GreekWorkID, id2:val.WorkID}
           }}className= 'playTitles' key={counter}>{val.Translator}</Link></Dropdown.Item>
             </div>
      }
            
        })}

        </Dropdown.Menu>
         </Dropdown>{' '}
     </div>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>

      </div>
  )
}

const Search = () => {
  
  
  const [value, setValue] = useState(),
  onInput = ({target:{value}}) => setValue(value),
  onFormSubmit = e => {
    e.preventDefault()
    setValue()
  }
 
  let empty=true;
  const [searchedWord, setSearchedWord] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(searchedWord)
    Axios.get('http://localhost:3001/api/searchWord', {
      params: {
       word:searchedWord
      }
    })
    .then((response) => {
      setSearchResults(response.data); 
      if (response.data.length===0){   
        empty=true;
      }
      else{
        empty=false;
      }
    })
    
  }, [searchedWord]);


  return (
    <div > 
      <div>
    <h2 className="center3 pd-bottom">Search for a word </h2> 
              <div className="center2">
              <Form inline onSubmit={onFormSubmit}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2 center4" onChange={onInput} value={value}/>
              <Button onClick={ () => setSearchedWord(value)} variant="outline-info btn-secondary btn searchButton">Search</Button>
    
              </Form>
              </div>
              </div>
           

     <h2 className="center">Search Results for : {value}</h2> 


     <table className="table mg-left">
     <thead className="thBGColor" >
      <tr>
        <th className="thColor" scope="col">#</th>
        <th className="thColor" scope="col">Title</th>
        <th className="thColor" scope="col">Scene</th>
        <th className="thColor" scope="col">Character</th>
        <th className="thColor" scope="col">Text</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map( (val,counter)=> {
        let translator="";
        let text=val.PlainText;
        let praksis = romanize(val.Section);
        text= text.replace(/\[p]/g, '\n');
     
        if (val.Translator ===null){
          translator="";
        }
        else{
          translator="-"+val.Translator;
        }
        return <tr>
          <th scope="row">{counter}</th>
          <td>{val.Title}{translator}</td>
          <td>{praksis},{val.Chapter}</td>
          <td>{val.Char}</td>
         
          <td><div id="cell">{getHighlightedText(text,searchedWord)}</div></td>
      
        </tr>
      }    
    )}
      </tbody>
    </table>
        



        </div>
    )

    
}


function romanize (num) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
const getHighlightedText = (text, highlight) => {
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (<span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b className="highlight">{part}</b> : part)}</span>);
}

const AdvancedSearch = () => {

  const [value, setValue] = useState(),
  onInput = ({target:{value}}) => setValue(value),
  onFormSubmit = e => {
    e.preventDefault()
    setValue()
  }

  let empty=true;

  const [searchedWord, setSearchedWord] = useState();
   const [searchResults, setSearchResults] = useState([]);



  const [playTitleList, setPlayTitleList] = useState([]);
  const [greekPlayTitleList, setGreekPlayTitleList] = useState([]);
  const [charList, setCharList] = useState([]);
  const [actList, setActList] = useState([]);
  const [sceneList, setSceneList] = useState([]);


  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedOptionTitle, setSelectedOptionTitle] = useState("All Plays");
  
  const [selectedOption2, setSelectedOption2] = useState("all");
  const [selectedOptionCharacter, setSelectedOptionCharacter] = useState("All Characters");

  const [selectedOption3, setSelectedOption3] = useState("all");
  const [selectedOptionAct, setSelectedOptionAct] = useState("All Acts");

  const [selectedOption4, setSelectedOption4] = useState("all");
  const [selectedOptionScene, setSelectedOptionScene] = useState("All Scenes");

  

  // let play;
  // useEffect(() => {
    
  //   Axios.get('http://localhost:3001/api/getTranslations', {
  //     params: {
  //       id:selectedOption
  //     }
  //   })
  //   .then((response) => {
  //     setGreekPlayTitleList(response.data);  
  //   })
    
  // }, [selectedOption]);

  useEffect(() => {

    Axios.get('http://localhost:3001/api/searchWordAdvanced', {
      params: {
       id:selectedOption,
       charName:selectedOption2,
       section:selectedOption3,
       chapter:selectedOption4,
       word:searchedWord
      }
    })
    .then((response) => {
      setSearchResults(response.data); 
      console.log(response.data)
    })
    
  }, [searchedWord,selectedOptionTitle,selectedOptionCharacter,selectedOptionScene,selectedOptionAct]);



  useEffect(() => {
    Axios.get('http://localhost:3001/api/getGreekPlays2').then((response) => {
      setPlayTitleList(response.data);  
    })
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getCharacters').then((response) => {
      setCharList(response.data);  
    })
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getActs').then((response) => {
      setActList(response.data);  
    })
  }, []);


  useEffect(() => {
    Axios.get('http://localhost:3001/api/getScenes').then((response) => {
      setSceneList(response.data);  
    })
  }, []);


  return (
   <div> 
     <div class="container">
      <div class="row">
        <h2 className="center3 pd-bottom">Advanced Search</h2> 
      
      </div>
      <hr color= "#7a1818"></hr>

      <div class="row">
      <div class="col-sm-5"> 
 
     <Dropdown id="first" >
        <Dropdown.Toggle id="dropdown-custom-1" className="btn btn-secondary dropdown3" >Select Play</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown1 ">
        <Dropdown.Item className= 'playTitles' onClick={ () => {setSelectedOptionTitle("All Plays"); setSelectedOption("all")}}>All Plays</Dropdown.Item>
      {playTitleList.map( (val,counter)=> {
          let title=val.Title+"-"+val.Translator;
          return <div>
           
            <Dropdown.Item className= 'playTitles' key={counter}  onClick={ () => {setSelectedOptionTitle(title); setSelectedOption(val.GreekWorkID)}}
            >{val.Title} - {val.Translator}</Dropdown.Item> </div>
           
        })}
        
         </Dropdown.Menu>
         </Dropdown>{' '}
      
         <div className="pd-left border1" id="second">
         <span className="dropdown3 "> {selectedOptionTitle} </span>
        </div>
     
         </div>
         <div class="col-sm-5"> 

         <Dropdown id="first" >
        <Dropdown.Toggle id="dropdown-custom-1" className="btn btn-secondary dropdown3" >Select Character</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown1 ">
        <Dropdown.Item className= 'playTitles' onClick={ () => {setSelectedOptionCharacter("All Characters"); setSelectedOption2("all")}}>All Characters</Dropdown.Item>

      {charList.map( (val,counter)=> {
        
          return <div>
           
            <Dropdown.Item className= 'playTitles' key={counter}  onClick={ () => {setSelectedOptionCharacter(val.CharName); setSelectedOption2(val.CharID)}}
            >{val.CharName}</Dropdown.Item> </div>
           
        })}
        
         </Dropdown.Menu>
         </Dropdown>{' '}
      
         <div className="pd-left border1" id="second">
         <span className="dropdown3  "> {selectedOptionCharacter} </span>
        </div>
     

         </div>
      
         </div>
        <br></br>
         <div class="row">
      <div class="col-sm-3"> 
 
     <Dropdown id="first" >
        <Dropdown.Toggle id="dropdown-custom-1" className="btn btn-secondary dropdown3" >Select Act</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown1 ">
        <Dropdown.Item className= 'playTitles' onClick={ () => {setSelectedOptionAct("All Acts"); setSelectedOption3("all")}}>All Acts</Dropdown.Item>
      {actList.map( (val,counter)=> {
        let praksis = romanize(val.Section);
          return <div>
           
            <Dropdown.Item className= 'playTitles' key={counter}  onClick={ () => {setSelectedOptionAct(praksis); setSelectedOption3(praksis)}}
            >{praksis}</Dropdown.Item> </div>
           
        })}
        
         </Dropdown.Menu>
         </Dropdown>{' '}
      
         <div className="pd-left border1" id="second">
         <span className="dropdown3 "> {selectedOptionAct} </span>
        </div>
     
         </div>
         <div class="col-sm-3.5"> 

         <Dropdown id="first" >
        <Dropdown.Toggle id="dropdown-custom-1" className="btn btn-secondary dropdown3" >Select Scene</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown1 ">
        <Dropdown.Item className= 'playTitles' onClick={ () => {setSelectedOptionScene("All Scenes"); setSelectedOption4("all")}}>All Scenes</Dropdown.Item>

      {sceneList.map( (val,counter)=> {
        
          return <div>
           
            <Dropdown.Item className= 'playTitles' key={counter}  onClick={ () => {setSelectedOptionScene(val.Chapter); setSelectedOption4(val.Chapter)}}
            >{val.Chapter}</Dropdown.Item> </div>
           
        })}
        
         </Dropdown.Menu>
         </Dropdown>{' '}
      
         <div className="pd-left border1" id="second">
         <span className="dropdown3 "> {selectedOptionScene} </span>
        </div>
        

         </div>

         <div className="col-sm-5">
           <div className="pd-left2">
         <Form inline onSubmit={onFormSubmit}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2 center4 dropdown3 " onChange={onInput} value={value}/>
              <Button onClick={ () => setSearchedWord(value)} variant="outline-info btn-secondary btn searchButton dropdown3">Search</Button>
    
              </Form>
         </div>
         </div>
       
         </div>
         <hr color= "#7a1818"></hr>
         <br></br>
         <table className="table mg-left">
     <thead className="thBGColor" >
      <tr>
        <th className="thColor" scope="col">#</th>
        <th className="thColor" scope="col">Title</th>
        <th className="thColor" scope="col">Scene</th>
        <th className="thColor" scope="col">Character</th>
        <th className="thColor" scope="col">English Text</th>
        <th className="thColor" scope="col">Greek Text</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map( (val,counter)=> {
        let translator="";
        let textGr=val.TextGr;
        textGr= textGr.replace(/\[p]/g, '\n');
        let textEn=val.TextEn;
        textEn= textEn.replace(/\[p]/g, '\n');
        let praksis=romanize(val.Section);
        // let regex = new RegExp('('+searchedWord+')', 'ig');
        // text = text.replace(regex, '<span class="highlight">$1</span>');
        // let cell;
        // cell=document.querySelector('#cell')
        // cell.innerHTML = text
       
        return <tr>
          <th scope="row">{counter}</th>
          <td>{val.Title}-{val.Translator}</td>
          <td>{praksis},{val.Chapter}</td>
          <td>{val.Char}</td>
          <td><div id="cell">{getHighlightedText(textEn,searchedWord)}</div></td>
          <td><div id="cell">{getHighlightedText(textGr,searchedWord)}</div></td>
     
      
        </tr>
      }    
    )}
      </tbody>
    </table>
        
     </div>
     </div>

   )
}



const Upload = () => {

const [file,setFile]=useState(null)

const upload = (e) => {
  e.preventDefault();
  let formData = new FormData();
  formData.append("text",file);
  // Axios.post('http://localhost:3001/api/upload',formData, {
  //   headers:{
  //     "Content-Type":"multipart/form-data",
  //   },
  // })
  Axios({
    method: "post",
    url: 'http://localhost:3001/api/upload',
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
      if (response.data ==="OK"){
      document.getElementById("errorMsg").innerHTML = "Upload Successful!";
      }
      else{
        document.getElementById("errorMsg").innerHTML = "Something went wrong!";
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

  return (
    <div>
      <h2 className="center3 pd-bottom">Upload a Translation </h2> 
    <br></br>
    <br></br>
      <div className="center pd-bottom">
      
      <input type="file" name="text" onChange={(e) => {setFile(e.target.files[0])}}  />
      <button className=" btn btn-secondary" onClick={(e)=>upload(e)}>Submit</button>
     
      </div>
      <h2 className="center3 pd-bottom" id="errorMsg"></h2>
    </div>
  );
}


// function useAuthenticate({ username, password}){

//   const [loginStatus,setLoginStatus] = useState("");

//   useEffect(() => {
//     const authenticate = async () => {
//       const message = await Axios.post('http://localhost:3001/api/login',{ username:username,password:password});
//       setLoginStatus(message);
//     }

//     authenticate();
//   }, []);

//   return loginStatus;
// };

// const SignIn = () => {
//   const [username,setUsername]=useState("");
//   const [password,setPassword]=useState("");
  
//   function login() {
//     const authenticated = useAuthenticate(username, password);

//     if(authenticated === ""){
//       const history = useHistory();
//       history.push("/search");
//     }
//   }

  // const login =() => {
  //   Axios.post('http://localhost:3001/api/login',{
  //     username:username,
  //     password:password
  //   }).then((response) => {
  //     if (response.data.message){
  //       setLoginStatus(response.data.message)
  //     }
  //     else{
  //       const history = useHistory();
  //       history.push("/search");
  //       // here username and password are confirmed
  //       //enter code here to access Routes
  //     }
  //   });
  //   }
  // var token=true;

  //  return (
  //   <div>
  //     <div className="title-1"><img src="logo.png"></img></div>
  //       <h4 className="title-2">Tanslated William Shakespeare Plays</h4>
  //       <hr color= "#7a1818"></hr>
  //     <br></br>
  //       <h3 className="center2">Login</h3>
  //       <div className="center3"> 
       
  //       <input
  //         type="text"
  //         placeholder="Username"
  //         onChange={(e) => {
  //           setUsername(e.target.value);
  //         }}
  //         />
          
  //          <input className="mg-left"
  //         type="password"
  //         placeholder="Password"
  //         onChange={(e) => {
  //           setPassword(e.target.value);
  //         }}
  //         />
        
  //         <button onClick={login} className="mg-left2 btn btn-secondary">Login</button>
  //         </div>
  //         <br></br>
  //         <br></br>
  //         <h3 className="center2">{loginStatus}</h3>
  //   </div>

  //  );
  // }


   const App =() => {
 
  
  return (
     <div><Router>
           <div>
          <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
              <Link to="/" className="link-1">Greek Translations</Link>
                <Link to="/search" className="link-1">Quick Search</Link>
                <Link to="/advancedSearch" className="link-1">Advanced Search</Link>
                <Link to="/upload" className="link-1">Upload</Link>
           
              </Nav>
          </Navbar>
        </div>
      {/* <Link to="/">Greek Translations</Link>
      <Link to="/theater">Theatrical Plays</Link>  */}

        <Switch>
        <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/advancedSearch">
            <AdvancedSearch />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route exact path="/greek">
           <PlayGreek title/>
          </Route> 
          <Route exact path="/greekAll">
           <PlayGreekAll title/>
          </Route> 
          <Route path="/greek/play">
           <TextGreek/>
          </Route> 
          <Route path="/greek/playAll">
           <TextGreekAll/>
          </Route> 
          <Route path="/">
           <TranslatedGreek/>
          </Route> 
        </Switch>

      </Router>
  
      </div>
  );
  
}

export default App;
