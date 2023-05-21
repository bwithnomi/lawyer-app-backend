import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    checkSchema({
      lawyer: {
        isLength: {
          errorMessage: 'lawyer cannot be empty',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      title: {
        isLength: {
          errorMessage: 'title is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      description: {
        isLength: {
          errorMessage: 'description is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
    })
  ];
}
