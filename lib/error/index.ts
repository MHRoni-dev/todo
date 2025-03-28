/**
 * Create an AppError to handle Errors efficiently and making error centralized
 * 
 * @param code - The Error Code from the ErrorTable that help developer to understand the error
 * @param message - The Error Message that will be shown to the user in production, give generic message to increase security
 * @param statusCode - The HTTP Status Code
 */

import { NextResponse } from 'next/server';
import { ErrorCode, errorTable, ErrorTable } from './errorTable';
import { config } from '@/config';
import { ZodIssue } from 'zod';
import logger from '../logger';

export default class AppError extends Error {
  code: keyof ErrorTable;
  statusCode: number;
  errors: ZodIssue[];

  constructor(code : ErrorCode, message: string, statusCode: number, errors? : ZodIssue[]) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors || [];
  }


}

export const SendErrorResponse = (error : AppError | Error) => {
  const isProduction = config.default.NODE_ENV === 'production';

  
  if(error instanceof AppError) {
    logger.error({...error, errorData : isProduction ? {} : errorTable[error.code]});
    return NextResponse.json({
      error : true,
      code : error.code ,
      message : error.message,
      statusCode : isProduction ? error.statusCode : errorTable[error.code].statusCode,
      errorData : isProduction ? {} : errorTable[error.code],
      errors : error.errors || [],
    }, {status : isProduction ? error.statusCode : errorTable[error.code].statusCode })
  }

  logger.error(error);
  return NextResponse.json({
    error : true,
    code : 'INTERNAL_SERVER_ERROR',
    message : error.message,
    statusCode : 500,
    errorData : {
      code : 'INTERNAL_SERVER_ERROR',
      message : error.message,
      statusCode : 500
    },
    errors : [],
  }, {status : 500})
}

