const express = require("express");
const serverless = require("serverless-http");


const app = express();
// const Port = 8000;

// app.listen(Port, _ => {
//   console.log("app running on Port", Port);
// });
const Status = {
  safe: true
};

// app.use(express.json());
// app.use()


const router = express.Router();

router.get("/", (request, response) => {
  console.log("GET:", request.body);
  response
    .status(200)
    .json({
      "Status": (Status.safe === true ? "Safe" : "Unsafe")
    });
});

router.post("/", (request, response) => {
  console.log("POST:", request.body);
  if(request.body.Status === "Safe") {
    Status.safe = true;
  }
  else {
    Status.safe = false;
  }

  response.send();
});



app.use("/.netlify/functions/server", express.json(), router);
module.exports.handler = serverless(app);