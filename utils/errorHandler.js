import { BaseError } from "./ErrorHandler.helper.js";
import { logger } from "./winstonLogger.helper.js";
class ErrorHandler {
  async handleError(err) {
    await logger.error(
      'Error message from the centralized error-handling component',
      err,
    );
  }
  
  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
 }
 export const errorHandler = new ErrorHandler();