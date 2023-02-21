
import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    checkSchema({
      displayName: {
        isLength: {
          errorMessage: 'Name is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      idToken: {
        isLength: {
          errorMessage: 'token id is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      accessToken: {
        isLength: {
          errorMessage: 'access token is required',
          // Multiple options would be expressed as an array
          options: { min: 1 },
        },
      },
      email: {
        isEmail: {
          errorMessage: 'Invalid email address',
        }
      },
      photoURL: {
        isLength: {
          errorMessage: 'Profile photo is required',
          // Multiple options would be expressed as an array
          options: { min: 7 },
        },
      },
    })
  ];
}
