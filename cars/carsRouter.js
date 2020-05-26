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

    if (car.length > 0) {
      res.status(200).json(car);
    } else {
      res
        .status(404)
        .json({ message: "The car with specified VIN does not exist" });
    }
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
    res
      .status(400)
      .json({ message: "Please include make, model and mileage information" });
  }
});

router.put("/:VIN", async (req, res) => {
  const { VIN } = req.params;
  const changes = req.body;

  try {
    const updated = await db("cars")
      .where({ VIN })
      .update(changes);

    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/:VIN", async (req, res) => {
  const { VIN } = req.params;

  try {
    const deleted = await db("cars")
      .where({ VIN })
      .del();

    deleted
      ? res.status(200).json({ message: "Car info removed" })
      : res
          .status(404)
          .json({ message: "Car with specified VIN does not exist" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Databbase error" });
  }
});

module.exports = router;
