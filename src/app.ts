import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './mongodb/connectDb/connect';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
import InstitutionRouter from './route/institution.route'
import errorHandlerMiddleware from './middleware/error-handler';
import notFoundMiddleware from './middleware/notFound';


// Configure CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus:  204,
};

// Middleware configurations
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
app.use(morgan('tiny'));

// Routes configuration
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



app.use("/api/v1/", InstitutionRouter)


app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

// Start the server
const port = process.env.PORT ||  5000;
const mongoURI = process.env.MONGO_URI;


if (!mongoURI) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1); // Terminate the application
}

const startServer = async () => {
  try {
    await connectDB(mongoURI);
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}..`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
