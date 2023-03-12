
import { checkSchema, validationResult, body } from 'express-validator';

export const rules = () => {
  return [
    body('role').notEmpty().withMessage('role is required'),
    body('lawyer_type').custom((value, {req} )=> {
      if (req.body.role == 'lawyer' && req.body.lawyer_type == "") {
        return false;
      }

      return true;
    }).withMessage('lawyer type is required for lawyers'),
    body('court_type').custom((value, {req} )=> {
      if (req.body.role == 'lawyer' && req.body.court_type == "") {
        return false;
      }

      return true;
    }).withMessage('court type is required'),
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
