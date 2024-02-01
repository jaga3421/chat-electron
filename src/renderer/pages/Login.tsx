/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-named-as-default */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnknownAction } from '@reduxjs/toolkit';
import { signInAsync, isTokenValid } from '../slices/authSlice';
import { RootState } from '../store/rootReducer';

import logo from '../assets/signup.svg';
import Button from '../components/Button';
import PhoneInput from '../components/PhoneInput';

// TODO: Get this from store
const prefix = '+1';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const hasValidToken = useSelector(isTokenValid);

  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmit = () => {
    const phone = prefix + phoneNumber?.replace(/[^a-zA-Z0-9]/g, '');
    dispatch(
      signInAsync({
        phoneNumber: phone,
        countryCode: 'US',
        verifyCode: '12345',
        appCheckToken: '12345',
        deviceId: '12345',
      }) as unknown as UnknownAction,
    );
  };

  useEffect(() => {
    if (hasValidToken) {
      navigate('/chatHome');
    }
  }, [authState.status, hasValidToken, navigate]);

  return (
    <div className="full-screen flex flex-col center-this relative">
      <img src={logo} alt="logo" />
      {/*  eslint-disable-next-line react/no-unescaped-entities */}
      <h3 className="mt-24 text-dark">What's your Phone Number?</h3>
      <PhoneInput
        autoFocus
        className="mt-24"
        prefix={prefix}
        placeholder="Phone Number"
        onSubmit={onSubmit}
        uponChange={(v) => {
          setPhoneNumber(v);
        }}
      />
      <Button
        type="primary"
        className="mt-24"
        onClick={onSubmit}
        disabled={phoneNumber === ''}
        loading={authState.status === 'loading'}
      >
        Next
      </Button>
      {authState.status === 'failed' && (
        <div className="mt-24 err-message">{authState.error}</div>
      )}{' '}
    </div>
  );
}
