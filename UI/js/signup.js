/* eslint-disable no-undef */
const signUp = (e) => {
  e.preventDefault();
  // get all user input
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;

  // sign up || api endpoint URL
  const url = 'https://pacific-eyrie-25629.herokuapp.com/auth/signup';
  // Make a post request to sign up endpoint

  const formData = {
    firstname,
    lastname,
    email,
    address,
    password,
  };

  fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        const userData = JSON.stringify({
          id: body.data.registerUser.id,
          username: body.data.registerUser.lastName,
          token: body.data.token
        });
        localStorage.setItem('user', userData);
      }
      if (body.data.registerUser.isAdmin) {
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      }
    }).catch(err => err);
};

const signupbtn = document.getElementById('submit');
signupbtn.addEventListener('click', signUp);
