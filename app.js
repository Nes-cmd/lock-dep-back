const express = require("express");
const app = express();
const testRouter = require("./api/test");
const sequelize = require("./config/database");
const User = require("./models/User");

app.use(express.json());

const authRoutes = require("./api/routes/auth.routes");
app.use("/api/auth", authRoutes);
app.use("/api/test", testRouter);

const PORT = 3000;

sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => console.error("❌ Database connection failed:", err));

sequelize.sync()
  .then(() => console.log("✅ User table synced!"))
  .catch(err => console.error("❌ Sync failed:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});