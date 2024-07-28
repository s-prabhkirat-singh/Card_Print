const express = require("express");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const cors = require("cors");
let app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log("Base Route");
});

app.use("/api", adminRoutes, categoryRoutes, attributeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
