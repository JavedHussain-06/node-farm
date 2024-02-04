require("dotenv").config();
const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT;

// ************************** USING ROUTES ****************************

const PRODUCTS_DETAIL = require("./Routers/products");
const { get } = require("http");
app.use("/api/v1/products", PRODUCTS_DETAIL);

app.use((req,res,next) =>{
console.log("Hello from middleware")
next();
})

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString()
  next()
})

// *********************************************************************

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestAt : req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Data not found!⚠️",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Data not found!⚠️",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      message: "Updated successfully",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Data not found!⚠️",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

app.route("/api/v1/tours")
.get(getAllTours)
.post(addTour);

app.route("/api/v1/tour/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
