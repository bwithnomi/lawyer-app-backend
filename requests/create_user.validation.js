
import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    checkSchema({
      name: {
        isLength: {
          errorMessage: 'Name is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      email: {
        isEmail: {
          errorMessage: 'Invalid email address',
        }
      },
      password: {
        isLength: {
          errorMessage: 'Password should be at least 7 chars long',
          // Multiple options would be expressed as an array
          options: { min: 7 },
        },
      },
    })
  ];
}
