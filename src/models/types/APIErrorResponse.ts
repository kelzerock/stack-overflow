export type ValidationError = {
  field: string;
  failures: string[];
};

export type APIErrorResponse = {
  statusCode: number;
  endpoint: string;
  message: string;
  errors?: ValidationError[];
};
