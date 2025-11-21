import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

export const errorHandler = (err: Error | AxiosError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Handle Axios errors (from service calls)
  if ('isAxiosError' in err && err.isAxiosError) {
    const axiosError = err as AxiosError;
    
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      return res.status(axiosError.response.status).json(axiosError.response.data);
    } else if (axiosError.request) {
      // The request was made but no response was received
      return res.status(503).json({
        success: false,
        message: 'Service unavailable. Please try again later.',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Handle other errors
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
};
