import { useNavigate } from 'react-router-dom';
import logo from '../assets/signup.svg';
import Button from '../components/Button';
import PhoneInput from '../components/PhoneInput';

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = () => {
    console.log('submit');
    navigate('/chat');
  };
  return (
    <div className="full-screen flex flex-col center-this">
      <img src={logo} alt="logo" />

      {/*  eslint-disable-next-line react/no-unescaped-entities */}
      <h3 className="mt-24 text-dark">What's your Phone Number?</h3>

      <PhoneInput
        autoFocus
        className="mt-24"
        prefix="+1"
        placeholder="Phone Number"
        onChange={(v) => {
          console.log(v);
        }}
      />

      <Button type="primary" className="mt-24" onClick={onSubmit}>
        Next
      </Button>
    </div>
  );
}
