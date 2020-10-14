import express, { Request, Response } from "express";
import "express-async-errors";
import path from "path";
import cors from "cors";

import './database/connections';
import errorHandler from "./errors/handler";
import routes from "./routes";

const PORT = 3333;
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')))
app.use(errorHandler);


app.listen(PORT, () => {
	console.log(`The server is on http://localhost:${PORT}`);
});