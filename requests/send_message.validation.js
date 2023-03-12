import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    checkSchema({
      message: {
        isLength: {
          errorMessage: 'Message cannot be empty',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      receiver_id: {
        isLength: {
          errorMessage: 'Please enter receiver id',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
    })
  ];
}
