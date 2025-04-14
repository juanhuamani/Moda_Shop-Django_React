export class ValidationError extends Error {
    constructor(message, details) {
      super(message);
      this.name = "ValidationError";
      this.details = details;
      this.statusCode = 400;
    }
  }
  
  export class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotFoundError";
      this.statusCode = 404;
    }
  }
  
  export class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = "AuthError";
      this.statusCode = 401;
    }
  }