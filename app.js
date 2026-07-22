const express = require("express");
const cors = require("cors");
const app = express();

// CORS Configuration (ከማንኛውም Origin ጥያቄዎችን ይቀበላል)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

const testRouter = require("./api/test");
const sequelize = require("./config/database");

// Models
require("./models/User");
require("./models/Price");
require("./models/provider");
require("./models/Item");

// Routes
const authRoutes = require("./api/routes/auth.routes");
const pricesRouter = require("./api/prices");
const providerRouter = require("./api/routes/Provider");
const itemRoutes = require("./api/routes/Item");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use("/api/auth", authRoutes);
app.use("/api/test", testRouter);
app.use("/api/prices", pricesRouter);
app.use("/api/providers", providerRouter);
app.use('/api/items', itemRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

// Database connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => console.error("❌ Database connection failed:", err));

// Sync all models
sequelize.sync()
  .then(() => console.log("✅ All tables synced!"))
  .catch(err => console.error("❌ Sync failed:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});