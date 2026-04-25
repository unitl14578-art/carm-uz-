const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// 📦 БАЗА ДАННЫХ (в памяти)
// ======================
let cars = [];

// ======================
// 🚗 ПОЛУЧИТЬ ВСЕ АВТО
// ======================
app.get("/api/cars", (req, res) => {
  res.json(cars);
});

// ======================
// ➕ ДОБАВИТЬ АВТО
// ======================
app.post("/api/add", (req, res) => {
  const car = {
    id: Date.now(),
    model: req.body.model,
    price: req.body.price,
    desc: req.body.desc,
    image: req.body.image || null
  };

  cars.push(car);

  res.json({
    success: true,
    message: "Car added",
    car
  });
});

// ======================
// 🤖 AI ОЦЕНКА АВТО (GEMINI)
// ======================
const GEMINI_KEY = "AIzaSyCAV9opAV789eJKQGVpvDhhi4tZOldtOmE";

app.post("/api/ai", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
Ты авто-оценщик.
Дай:
- среднюю цену
- состояние
- рекомендации

Авто: ${text}
`
              }
            ]
          }
        ]
      }
    );

    const result =
      response.data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      result
    });

  } catch (error) {
    res.json({
      success: false,
      result: "AI error"
    });
  }
});

// ======================
// 🌐 SERVER START
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚗 SERVER RUNNING ON PORT " + PORT);
});