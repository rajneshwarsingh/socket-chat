/*
 * @file: response.js
 * @description: It contain function layer for api response status with data.
 * @author: Rajneshwar Singh
 */

export const successAction = (statusCode, data, message = 'Success') => {
  return { statusCode, data, message };
};

export const failAction = (statusCode, data, message = 'Fail') => {
  return { statusCode, data, message };
};
