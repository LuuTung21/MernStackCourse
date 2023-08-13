// Function to handle 404 Not Found errors
const notFound = (req, res, next) => {
    // Create a new Error object with a message indicating the requested URL is not found
    const error = new Error(`Not Found - ${req.originalUrl}`);

    // Set the HTTP status code to 404 (Not Found)
    res.status(404);

    // Pass the error object to the next middleware function in the chain
    next(error);
}

// Function to handle errors in the application
const errorHandler = (err, req, res, next) => {
    // Determine the status code based on the response status code or set it to 500 (Internal Server Error) if not available
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Extract the error message from the error object
    const message = err.message;

    // Check if the error is of type "CastError" and has a kind of "ObjectId"
    if (err.name === "CastError" && err.kind === "ObjectId") {
        // If it's a CastError with ObjectId, set the status code to 404 (Not Found) and provide a custom error message
        statusCode = 404;
        message = "Resource not found";
    }

    // Respond to the client with a JSON object containing the error message and the stack trace (if in development mode)
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}

export {
    notFound,
    errorHandler
};