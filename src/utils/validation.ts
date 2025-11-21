import { Response } from 'express';

export const validateParams = (params: Record<string, string | undefined>, res: Response): params is Record<string, string> => {
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      res.status(400).json({
        success: false,
        error: `Missing required parameter: ${key}`,
        timestamp: new Date().toISOString(),
      });
      return false;
    }
  }
  return true;
};
