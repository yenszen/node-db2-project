const express = require("express");
const db = require("../data/db-config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await db("cars");
    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Databbase error" });
  }
});

router.get("/:VIN", async (req, res) => {
  const { VIN } = req.params;

  try {
    const car = await db("cars").where({ VIN });
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Databbase error" });
  }
});

router.post("/", async (req, res) => {
  const carInfo = req.body;

  try {
    const newCar = await db("cars").insert(carInfo);
    res.status(201).json(newCar);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Databbase error" });
  }
});

module.exports = router;
