/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';

const messages = [
  'Hey there! Just wanted to say Im here to help. What can I do for you today?',
  'Oops, Im out right now. But dont worry, Ill catch up with you soon!',
  'Thanks for reaching out! I love hearing from you. Lets sort this out together.',
  'Hold tight, Im on it! Ill get back to you in a jiffy.',
  'Got your message loud and clear! Consider it done.',
  'Hmm, could you give me a bit more info? I want to make sure I get this right.',
  'Im diving into your request now. Lets get this sorted out!',
  'Good news! Your issue is all sorted. Let me know if theres anything else.',
  'Just checking in - did you get my last message? I dont want to leave you hanging.',
  'Oops, my bad if there was any inconvenience. Lets try again, shall we?',
  'Thanks for hanging in there. Your patience is like a superpower!',
  'Just so you know, Im on your case right now. Well get this sorted out together.',
  'Your feedback is like gold to us. Keep it coming!',
  'Could you clarify your last message? I want to make sure Im on the same page.',
  'Hey, Im here for you! Lets tackle this together.',
  'Oops, I didnt quite catch that. Could you say it again, maybe in a different way?',
  'Could you rephrase your question? I want to make sure I understand you correctly.',
  'Im really sorry, but I cant assist with that. But Im here for anything else you need!',
  'Thanks for understanding. Youre the best!',
  'Hope you have an amazing day! Remember, I am here if you need anything.',
];

function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return {
    id: uuidv4(),
    text: messages[randomIndex],
  };
}

export const randomMessage = getRandomMessage;
