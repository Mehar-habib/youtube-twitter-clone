const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await Promise.resolve(requestHandler(req, res, next));
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const errorMessage = error.message || "Something went wrong";
            res.status(statusCode).json({
                message: errorMessage,
                success: false,
            });
        }
    };
};

export default asyncHandler;
