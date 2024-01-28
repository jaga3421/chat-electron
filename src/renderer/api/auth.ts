/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const signIn = async (
  phoneNumber: string,
  countryCode: string,
  verifyCode: string,
  appCheckToken: string,
  deviceId: string,
) => {
  const response = await axios.post('https://staging.api.vama.com/signin_sms', {
    phone_number: phoneNumber,
    country_code: countryCode,
    verify_code: verifyCode,
    app_check_token: appCheckToken,
    device_id: deviceId,
  });

  return response.data;
};
