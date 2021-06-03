const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'dramaticadb',
    password: 'lZWQ9DR81FjopoI1',
    database: 'dramaticadb',
    port:3306
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3001, () => {
    console.log("running on port 3001");
})


app.get('/api/getPlays', (req, res) => {
    const sql = "SELECT Title FROM works ORDER BY Title Asc"; 
    db.query(sql, (err,result) => {
          res.send(result);

    });
}) 


app.get('/api/getTranslatedPlays', (req, res) => {
    const sql = "SELECT DISTINCT works.Title, works.workID AS 'WorkID' FROM dramaticadb.worksgreek INNER JOIN works ON works.WorkID=worksgreek.WorkID ORDER BY works.Title"; 
    db.query(sql, (err,result) => {
          res.send(result);

    });
}) 

app.get('/api/getTranslations', (req, res) => {
    let id = req.query.id;
    const sql = "select WorkID,GreekWorkID,Translator,Title from worksgreek where workID=?"; 
    db.query(sql,[id], (err,result) => {
          res.send(result);

    });
}) 


app.get('/api/getGreekPlays', (req, res) => {
    const sql = "SELECT Title, Translator, GreekWorkID, WorkID FROM worksgreek WHERE WorkID IS NOT NULL ORDER BY Title Asc "; 
    db.query(sql, (err,result) => {
          res.send(result);

    }); 
}) 

app.get('/api/getGreekPlays2', (req, res) => {
    const sql = "SELECT Title, Translator, GreekWorkID, WorkID FROM worksgreek WHERE WorkID IS NOT NULL AND Translator!='all' ORDER BY Title Asc "; 
    db.query(sql, (err,result) => {
          res.send(result);

    }); 
}) 

// app.post("/api/insert", (req,res) => {

//     const movieName = req.body.movieName;
//     const movieReview = req.body.movieReview; 

//     const sqlInsert ="INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err,result) => {
//           console.log(result);
//     });
   
   
// });

app.get('/api/getGreekChapters', (req, res) => {
    let id = req.query.id;
    const sql = "SELECT Section, Chapter, Description FROM chaptersgreek WHERE GreekWorkID = ? "; 
    db.query(sql, [id], (err,result) => {
          res.send(result);

    });
}) 

app.get('/api/getGreekDescription', (req, res) => {
    let id = req.query.id;
    let act = req.query.act;
    let chapter = req.query.chapter;
    var filter = [id, act,chapter];
    const sql = "SELECT Description FROM chaptersgreek WHERE GreekWorkID = ? AND Section = ? AND Chapter = ?"; 
    db.query(sql, filter, (err,result) => {
          res.send(result);

    });
}) 


app.get('/api/getGreekCharacters', (req, res) => {
    let id = req.query.id;
    const sql = "SELECT CharName FROM charactersgreek WHERE GreekWorkID = ? AND CharName!='blank' order by CharName"; 
    db.query(sql, [id], (err,result) => {
          res.send(result);

    });
}) 
app.get('/api/getGreekText', (req, res) => {
    let id = req.query.id;
    let id2 = req.query.id;
    let act = req.query.act;
    const sql = "SELECT  PlainText,Alias,chaptersgreek.Description,paragraphsgreek.Chapter,paragraphsgreek.Section FROM dramaticadb.paragraphsgreek JOIN charactersgreek ON charactersgreek.GreekCharID=paragraphsgreek.GreekCharID JOIN chaptersgreek ON chaptersgreek.Chapter=paragraphsgreek.Chapter AND chaptersgreek.Section=paragraphsgreek.Section where paragraphsgreek.GreekWorkID=? AND chaptersgreek.GreekWorkID=? AND  chaptersgreek.Section=? order by paragraphsgreek.GreekParagraphID";
    db.query(sql, [id,id2,act],(err,result) => {
          res.send(result);
    });
}) 

app.get('/api/getEnglishText', (req, res) => {
    let id2 = req.query.id2;
    let id3 = req.query.id2;
    let act = req.query.act;
    const sql="SELECT  PlainText,Abbrev,chapters.Description,paragraphs.Chapter,paragraphs.Section FROM dramaticadb.paragraphs JOIN characters ON characters.CharID=paragraphs.CharID JOIN chapters ON chapters.Chapter=paragraphs.Chapter AND chapters.Section=paragraphs.Section where paragraphs.WorkID=? AND chapters.WorkID=? AND chapters.Section=? order by paragraphs.ParagraphID";
    db.query(sql, [id2,id3,act],(err,result) => {
          res.send(result);
    });
}) 

app.get('/api/getAllTexts', (req, res) => {
    let id = req.query.id;
    let id2 = req.query.id;
    let id3 = req.query.id2;
    let act = req.query.act;
    const sql="SELECT paragraphsgreek.Section,paragraphsgreek.Chapter,paragraphs.CharLine, characters.Abbrev, paragraphs.PlainText  AS 'EnText',paragraphsgreek.CharLine, Alias, paragraphsgreek.PlainText  AS 'GrText', chaptersgreek.Description AS 'GrTitle', chapters.Description AS 'EnTitle' FROM dramaticadb.paragraphsgreek INNER JOIN paragraphs ON paragraphsgreek.CharLine=paragraphs.CharLine INNER JOIN characters ON paragraphs.CharID=characters.CharID INNER JOIN charactersgreek ON paragraphsgreek.GreekCharID=charactersgreek.GreekCharID INNER JOIN chapters ON (chapters.Chapter=paragraphsgreek.Chapter AND chapters.Section=paragraphsgreek.Section) INNER JOIN chaptersgreek ON (chaptersgreek.Chapter=paragraphsgreek.Chapter AND chaptersgreek.Section=paragraphsgreek.Section) where paragraphsgreek.GreekWorkID=? AND chaptersgreek.GreekWorkID=? AND chapters.WorkID=? AND chaptersgreek.Section=?";
    db.query(sql, [id,id2,id3,act],(err,result) => {
          res.send(result);
    });
}) 

app.get('/api/getTwoTranslations', (req, res) => {
    let id = req.query.id;
    let id2 = req.query.id;
    let id3 = req.query.id2;
    let id4 = req.query.id3;
    let id5 = req.query.id3;
    let act = req.query.act;
    const sql="SELECT pg1.Section,pg1.Chapter,paragraphs.CharLine, characters.Abbrev, paragraphs.PlainText AS 'EnText', cg1.Alias AS 'AliasGR',cg2.Alias AS 'AliasGR2',  pg1.PlainText AS 'GrText', pg2.PlainText AS 'GrText2',chaptersgreek.Description AS 'GrTitle',chg2.Description AS 'GrTitle2', chapters.Description AS 'EnTitle' FROM dramaticadb.paragraphsgreek pg1 INNER JOIN paragraphs ON pg1.CharLine=paragraphs.CharLine INNER JOIN characters ON paragraphs.CharID=characters.CharID INNER JOIN charactersgreek cg1 ON pg1.GreekCharID=cg1.GreekCharID INNER JOIN chapters ON (chapters.Chapter=pg1.Chapter AND chapters.Section=pg1.Section) INNER JOIN chaptersgreek ON (chaptersgreek.Chapter=pg1.Chapter AND chaptersgreek.Section=pg1.Section) INNER JOIN paragraphsgreek pg2 ON pg2.CharLine= pg1.CharLine INNER JOIN chaptersgreek chg2 ON (chg2.Chapter=pg1.Chapter AND chg2.Section=pg1.Section) INNER JOIN charactersgreek cg2 ON pg2.GreekCharID=cg2.GreekCharID where pg1.GreekWorkID=? AND chaptersgreek.GreekWorkID=? AND chapters.WorkID=? AND pg2.GreekWorkID =?  AND chg2.GreekWorkID =?  AND chaptersgreek.Section=?";
    db.query(sql, [id,id2,id3,id4,id5,act],(err,result) => {
          res.send(result);
    });
}) 
                                                                                                                                                                                                                                                                                                                                             
app.get('/api/searchWord', (req, res) => {
     let word = req.query.word;
     let replacement = '%'+word+'%';
     let replacement2 = '%'+word+'%';
    // let word2 = req.query.word2;
    const sql="SELECT Title,Section,Chapter,Translator,Abbrev as 'Char',PlainText FROM dramaticadb.paragraphs INNER JOIN works ON works.WorkID=paragraphs.WorkID INNER JOIN characters ON characters.CharID=paragraphs.CharID where paragraphs.CharID!='xxx' && paragraphs.CharID!='chorus-rj' && works.WorkID='romeojuliet' && PlainText LIKE ? UNION ALL SELECT Title,Section,Chapter,Translator,Alias AS 'Char',PlainText FROM dramaticadb.paragraphsgreek INNER JOIN worksgreek ON worksgreek.GreekWorkID=paragraphsgreek.GreekWorkID INNER JOIN charactersgreek ON charactersgreek.GreekCharID=paragraphsgreek.GreekCharID where paragraphsgreek.GreekCharID!='xxx' && worksgreek.WorkID='romeojuliet' && PlainText like ? ORDER BY Title, Section, Chapter ASC";
    db.query(sql,[replacement,replacement2],(err,result) => {
    res.send(result);
    });
}) 

app.get('/api/searchWordAdvanced', (req, res) => {
    
    let id=req.query.id;
    let charName=req.query.charName;
    let section=req.query.section;
    let chapter=req.query.chapter;
    let word = req.query.word;

    let id1;
    let id2;
    if (id==="all"){
        id1='worksgreek.GreekWorkID is not null';
        id2='worksgreek.GreekWorkID is not null';
    }
    else{
        id1='worksgreek.GreekWorkID="'+id+'"';
        id2='worksgreek.GreekWorkID="'+id+'"';
    }

    let charName1;
    let charName2;
    if (charName==="all"){
        charName1='characters.CharID is not null';
        charName2='characters.CharID is not null';
    }
    else{
       charName1='characters.CharID="'+charName+'"';
       charName2='characters.CharID="'+charName+'"';
    }

    let section1;
    let section2;
    if (section==="all"){
        section1='paragraphsgreek.Section is not null';
        section2='paragraphsgreek.Section is not null';
    }
    else{
        section1='paragraphsgreek.Section="'+section+'"';
        section2='paragraphsgreek.Section="'+section+'"';
    }

    let chapter1;
    let chapter2;
    if (chapter==="all"){
        chapter1='paragraphsgreek.Chapter is not null';
        chapter2='paragraphsgreek.Chapter is not null';
    }
    else{
        chapter1='paragraphsgreek.Chapter="'+chapter+'"';
        chapter2='paragraphsgreek.Chapter="'+chapter+'"';
    }


    let replacement = '%'+word+'%';
    let replacement2 = '%'+word+'%';
   
   // let word2 = req.query.word2;
   const sql= `SELECT Title,paragraphsgreek.Section,paragraphsgreek.Chapter,worksgreek.Translator,Alias as 'Char', paragraphsgreek.PlainText as 'TextGr',paragraphs.PlainText as 'TextEn' FROM dramaticadb.paragraphsgreek INNER JOIN worksgreek ON worksgreek.GreekWorkID=paragraphsgreek.GreekWorkID INNER JOIN charactersgreek ON charactersgreek.GreekCharID=paragraphsgreek.GreekCharID INNER JOIN characters ON characters.CharID=charactersgreek.CharID INNER JOIN paragraphs ON paragraphs.CharLine=paragraphsgreek.CharLine where ${id1} && ${charName1} && ${section1} && ${chapter1} && characters.CharID!='xxx' && paragraphsgreek.PlainText like ? UNION ALL  SELECT Title,paragraphsgreek.Section,paragraphsgreek.Chapter,worksgreek.Translator,Alias as 'Char', paragraphsgreek.PlainText as 'TextGr',paragraphs.PlainText as 'TextEn' FROM dramaticadb.paragraphsgreek INNER JOIN worksgreek ON worksgreek.GreekWorkID=paragraphsgreek.GreekWorkID INNER JOIN charactersgreek ON charactersgreek.GreekCharID=paragraphsgreek.GreekCharID INNER JOIN characters ON characters.CharID=charactersgreek.CharID INNER JOIN paragraphs ON paragraphs.CharLine=paragraphsgreek.CharLine where ${id2} && ${charName2} && ${section2} && ${chapter2} && characters.CharID!='xxx' && paragraphs.PlainText like ? ORDER BY Title, Section, Chapter ASC`;
   db.query(sql,[replacement,replacement2],(err,result) => {
   res.send(result);
   });
}) 


app.get('/api/getCharacters', (req, res) => {
    const sql ="SELECT Distinct charactersgreek.CharID,characters.CharName FROM dramaticadb.charactersgreek INNER JOIN characters on characters.CharID=charactersgreek.CharID where charactersgreek.CharID!='xxx'"; 
    db.query(sql, (err,result) => {
          res.send(result);

    }); 
}) 



app.get('/api/getActs', (req, res) => {
    const sql ="SELECT Distinct Section FROM dramaticadb.chaptersgreek;"; 
    db.query(sql, (err,result) => {
          res.send(result);

    }); 
}) 

app.get('/api/getScenes', (req, res) => {
    const sql ="SELECT Distinct Chapter FROM dramaticadb.chaptersgreek;"; 
    db.query(sql, (err,result) => {
          res.send(result);

    }); 
}) 
    

// app.get('/api/foo', (req, res) => {
//     // let id=req.query.id;
//     // let id1;
//     // if (id==="all"){
//     //     id1='CharID is not null';
     
//     // }

//     let id1='CharID is not null';
//     const sql =`SELECT characters.CharName FROM dramaticadb.characters where ${id1}`;
//     db.query(sql,(err,result) => {
//           res.send(result);

//     }); 
// }) 

app.post('/api/login', (req,res) => {
    let username=req.body.username;
    let password=req.body.password;

    db.query(
        "SELECT * FROM loginsystem WHERE Username=? AND Password = ?",
        [username,password],
        (err,result) => {
            if (err) {
                res.send({err:err});
            }

            if (result.length >0 ) {
                res.send(result);
            }
            else{
                res.send({message:"Wrong username/password combination!"});
            }
        }
    );
});

// app.post("/api/insert", (req,res) => {

//     const movieName = req.body.movieName;
//     const movieReview = req.body.movieReview; 

//     const sqlInsert ="INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err,result) => {
//           console.log(result);
//     });
   
   
// });

