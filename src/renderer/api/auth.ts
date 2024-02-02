/* eslint-disable import/prefer-default-export */
import axios from 'axios';

require('dotenv').config();

const LOGIN_API = process.env.REACT_APP_LOGIN_URL;

if (!LOGIN_API) {
  throw new Error('The LOGIN_API environment variable is not defined!');
}

export const signIn = async (
  phoneNumber: string,
  countryCode: string,
  verifyCode: string,
  appCheckToken: string,
  deviceId: string,
) => {
  const response = await axios.post(LOGIN_API, {
    phone_number: phoneNumber,
    country_code: countryCode,
    verify_code: verifyCode,
    app_check_token: appCheckToken,
    device_id: deviceId,
  });

  return response.data;
};
