// const express = require('express');
// const winston = require('winston');
// const app = express();
// const port = 3000;

// // Middleware to parse JSON requests
// app.use(express.json());

// // Logger configuration
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'calculator-microservice' },
//     transports: [
//         new winston.transports.Console({ format: winston.format.simple() }),
//         new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'logs/combined.log' })
//     ]
// });

// // Function to validate input
// const validateInput = (num1, num2) => {
//     if (isNaN(num1) || isNaN(num2)) {
//         return { valid: false, message: "Please enter valid numbers." };
//     }
//     return { valid: true };
// };

// // Middleware for logging requests
// app.use((req, res, next) => {
//     logger.info(`Request: ${req.method} ${req.url} from ${req.ip}`);
//     next();
// });

// // Endpoint for Addition
// app.get('/add', (req, res) => {
//     const num1 = parseFloat(req.query.num1);
//     const num2 = parseFloat(req.query.num2);
//     const validation = validateInput(num1, num2);
//     if (!validation.valid) {
//         logger.error(validation.message);
//         return res.status(400).json({ error: validation.message });
//     }
//     const result = num1 + num2;
//     logger.info(`New addition operation created: ${num1} + ${num2} = ${result}`);
//     res.json({ result });
// });

// // Endpoint for Subtraction
// app.get('/subtract', (req, res) => {
//     const num1 = parseFloat(req.query.num1);
//     const num2 = parseFloat(req.query.num2);
//     const validation = validateInput(num1, num2);
//     if (!validation.valid) {
//         logger.error(validation.message);
//         return res.status(400).json({ error: validation.message });
//     }
//     const result = num1 - num2;
//     logger.info(`New subtraction operation created: ${num1} - ${num2} = ${result}`);
//     res.json({ result });
// });

// // Endpoint for Multiplication
// app.get('/multiply', (req, res) => {
//     const num1 = parseFloat(req.query.num1);
//     const num2 = parseFloat(req.query.num2);
//     const validation = validateInput(num1, num2);
//     if (!validation.valid) {
//         logger.error(validation.message);
//         return res.status(400).json({ error: validation.message });
//     }
//     const result = num1 * num2;
//     logger.info(`New multiplication operation created: ${num1} * ${num2} = ${result}`);
//     res.json({ result });
// });

// // Endpoint for Division
// app.get('/divide', (req, res) => {
//     const num1 = parseFloat(req.query.num1);
//     const num2 = parseFloat(req.query.num2);
//     const validation = validateInput(num1, num2);
//     if (!validation.valid) {
//         logger.error(validation.message);
//         return res.status(400).json({ error: validation.message });
//     }
//     if (num2 === 0) {
//         logger.error("Cannot be divide by zero.");
//         return res.status(400).json({ error: "Cannot be divide by zero." });
//     }
//     const result = num1 / num2;
//     logger.info(`New division operation created: ${num1} / ${num2} = ${result}`);
//     res.json({ result });
// });

// // Start the server
// app.listen(3000, () => {
//     logger.info('Server is listening on port 3000');
//     console.log('Server is listening on port 3000');
// });
