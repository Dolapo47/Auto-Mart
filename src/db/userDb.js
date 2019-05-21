import bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    email: 'Dolapo@andela.com',
    first_name: 'dolapo',
    last_name: 'adeleye',
    password: bcrypt.hash('dolapo', 8),
    address: '12 epic tower road lagos',
    isAdmin: true,
  },

  {
    id: 2,
    email: 'ayo@andela.com',
    first_name: 'ayo',
    last_name: 'adeleye',
    password: bcrypt.hash('ayomide2018@@', 10),
    address: '12 epic tower road lagos',
    isAdmin: true,
  },
];


export default users;
