const express = require("express");
const app = express();

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
const providerRouter = require("./api/routes/provider");
const itemRoutes = require('./api/routes/Item');
app.use("/api/auth", authRoutes);
app.use("/api/test", testRouter);
app.use("/api/prices", pricesRouter);
app.use("/api/providers", providerRouter);
app.use('/api/items', itemRoutes);
const PORT = 3000;

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