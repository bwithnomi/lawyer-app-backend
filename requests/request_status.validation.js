import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    checkSchema({
      request_id: {
        isLength: {
          errorMessage: 'request_id cannot be empty',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      status: {
        isLength: {
          errorMessage: 'status is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
    })
  ];
}
