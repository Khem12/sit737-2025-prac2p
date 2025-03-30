const fs = require('fs');
const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Ensure logs directory exists
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// Middleware to parse JSON requests
app.use(express.json());

// Configuring Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Function to validate input
const validateInput = (num1, num2) => {
    if (num1 === undefined || num2 === undefined) {
        return { valid: false, message: "Missing parameters. Please provide both num1 and num2." };
    }
    if (isNaN(num1) || isNaN(num2)) {
        return { valid: false, message: "Both parameters must be valid numbers." };
    }
    return { valid: true };
};

// Middleware for logging requests
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url} from ${req.ip}`);
    next();
});

// Add, Subtract, Multiply and Division Endpoints
const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b !== 0 ? a / b : 'error')
};

Object.keys(operations).forEach(operation => {
    app.get(`/${operation}`, (req, res) => {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const validation = validateInput(num1, num2);

        if (!validation.valid) {
            logger.error(`${operation.toUpperCase()} ERROR: ${validation.message}`);
            return res.status(400).json({ error: validation.message });
        }
        
        if (operation === 'divide' && num2 === 0) {
            logger.error("DIVIDE ERROR: Cannot divide by zero.");
            return res.status(400).json({ error: "Cannot be divided by Zero" });
        }

        const result = operations[operation](num1, num2);
        logger.info(`New ${operation} operation: ${num1} ${operation} ${num2} = ${result}`);
        res.json({ result });
    });
});

// Start the server
app.listen(port, () => {
    logger.info(`Calculator running at http://localhost:${port}`);
    console.log(`Hello I'm listening at http://localhost:${port}`);
});
