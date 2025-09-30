import express from 'express';
import pino from 'pino';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

app.get('/', (req, res) => {
    logger.info('Received request for /');
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
