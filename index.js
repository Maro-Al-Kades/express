const express = require("express")
const mongoose = require("mongoose")
const app = express();

const Article = require("./models/Article")

mongoose
  .connect(
    "mongodb+srv://maro:maro123@cluster0.gjjfwkb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then( () => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log(`error with connecting to DB server ${error}`);
  });



app.use(express.json());

app.get('/', (req, res) => { 
  res.send("<button>hello</button>")
})

app.get('/numbers', (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + "-";
  }

  res.render("numbers.ejs", {
    name: "maro",
    numbers: numbers,
  })
 })

app.get("/sayHello", (req, res) => {
  // res.send(`Hello! ${req.query.age}`)
  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "arabic",
  })
})


//! Articles EndPoints
app.post("/articles", async(req, res) => {
  const newArticle = new Article()

  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 100
  await newArticle.save();

  res.json(newArticle)
})

app.get("/articles", async(req, res) => {
  const articles = await Article.find();
  res.json(articles);
})






app.listen(3000, function () {
  console.log("your app is listening")
})

