export const responseGenerator = (data, success = true, message = '', code = 200, extraData = {}) => {
  return {success, message, data, code, ...extraData}
};