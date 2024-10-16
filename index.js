import express from 'express';
import bodyParser from 'body-parser';
import geminiRouter from './routes/gemini.route.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import fileRouter from './routes/file.route.js';
import messageRouter from './routes/message.route.js';
import profileImageRouter from './routes/profileImage.route.js';
import queryRouter from './routes/query.route.js';
import cors from 'cors';
import { connectDB } from './db/index.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 9097;
//middlewares
app.use(
	cors({
		origin: '*',
		credentials: true,
	}),
);
app.use((req, res, next) => {
	// console.log(req);
	next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/v1/gemini', geminiRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/file', fileRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/message', profileImageRouter);
app.use('/api/v1/query', queryRouter);

//database connection
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log('Listening to the port');
		});
	})
	.catch((error) => console.log(error));
