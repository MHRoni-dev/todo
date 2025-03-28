export type ErrorCode = 
"AUTH_LOGIN_001" | 
"AUTH_LOGIN_002" | 
"AUTH_LOGIN_003" |
"AUTH_REGISTER_001" |
"AUTH_REGISTER_002" |
"AUTH_REGISTER_003" |
"AUTH_CHECK_001" 

type ErrorDetails = {
  code: string,
  message: string,
  statusCode: number
};

export type ErrorTable = {
  [key in ErrorCode]: ErrorDetails;
};
  
 

export const  errorTable: ErrorTable = {
  "AUTH_LOGIN_001": {
    "code": "AUTH_LOGIN_001",
    "message": "User Data validation failed",
    "statusCode": 400
  },
  "AUTH_LOGIN_002": {
    "code": "AUTH_LOGIN_002",
    "message": "User not found",
    "statusCode": 401
  },
  "AUTH_LOGIN_003": {
    "code": "AUTH_LOGIN_003",
    "message": "Password is incorrect",
    "statusCode": 401
  },
  "AUTH_REGISTER_001": {
    "code": "AUTH_REGISTER_001",
    "message": "User Data validation failed",
    "statusCode": 400
  },
  "AUTH_REGISTER_002": {
    "code": "AUTH_REGISTER_002",
    "message": "User already exists",
    "statusCode": 400
  },
  "AUTH_REGISTER_003": {
    "code": "AUTH_REGISTER_003",
    "message": "Everything was correct but user could not be created, maybe database is down",
    "statusCode": 500
  },
  "AUTH_CHECK_001": {
    "code": "AUTH_CHECK_001",
    "message": "token not found",
    "statusCode": 401
  },

}


