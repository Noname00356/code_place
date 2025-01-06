const express = require("express");
const app = express();

let CP = [];

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: CP.length });
});
  
app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {comments: CP });
  else res.json( {comments: CP.slice( start )});
});
  
app.post("/post", (req, res) => {
  const radio1 = req.body.radio1;
  const code = req.body.code;
  const date = req.body.date;
  const name = req.body.name;
  const comment = req.body.comment;
  console.log( [radio1, code, date, name, comment] );
  // 本来はここでDBMSに保存する
  CP.push( { radio1: radio1, date: date, code: code, name: name, comment: comment } );
  res.json( {number: CP.length } );
});


app.get("/cp", (req,res) => {
    console.log("GET /CP");
    res.json( {test: "GET /CP" });
});

app.post("/cp", (req,res) => {
    console.log("POST /CP");
    res.json( {test: "POST /CP"});
})

app.get("/cp/:id", (req,res) => {
    console.log( "GET /CP/" + req.params.id );
    res.json( {test: "GET /CP/" + req.params.id });
});

app.put("/cp/:id", (req,res) => {
    console.log( "PUT /CP/" + req.params.id );
    res.json( {test: "PUT /CP/" + req.params.id });
});

app.delete("/cp/:id", (req,res) => {
    console.log( "DELETE /CP/" + req.params.id );
    res.json( {test: "DELETE /CP/" + req.params.id });
});

app.listen(8000, () => console.log("Example app listening on port 8000!"));