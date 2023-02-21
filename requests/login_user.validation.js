
import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    checkSchema({
      email: {
        isEmail: {
          errorMessage: 'Invalid email address',
        }
      },
      password: {
        isLength: {
          errorMessage: 'Please enter your password',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
    })
  ];
}
