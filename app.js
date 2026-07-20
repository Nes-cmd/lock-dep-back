const express = require("express");
const app = express();
<<<<<<< HEAD
app.use(express.json());  // ← ADD THIS LINE

const testRouter = require("./api/test");
const sequelize = require("./config/database");
const User = require("./models/User");
const Price = require("./models/Price");
const pricesRouter = require('./api/prices');

const PORT = 3000;

app.use("/api/test", testRouter);
app.use('/api/prices', pricesRouter);

sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('X Database connection failed:', err));

sequelize.sync()
  .then(() => console.log('All tables synced!'))
  .catch(err => console.error('X Sync failed:', err));

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
=======
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
>>>>>>> 504946d74c74b791905177076c33407988b014df
});