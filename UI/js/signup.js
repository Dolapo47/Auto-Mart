/* eslint-disable no-undef */

const signUp = (e) => {
  e.preventDefault();
  // get all user input
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;
  const adminSecret = document.getElementById('adminSecret').value;

  console.log(firstname);
  // sign up || api endpoint URL
  const url = 'https://pacific-eyrie-25629.herokuapp.com/auth/signin';
  // Make a post request to sign up endpoint

  const formData = {
    firstname,
    lastname,
    email,
    address,
    password,
    adminSecret,
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
          id: body.data.registerUser.rows[0].id,
          lastname: body.data.registerUser.rows[0].lastname,
          firstname: body.data.registerUser.rows[0].firstname,
          token: body.data.token
        });
        localStorage.setItem('user', userData);
      }
      if (body.data.registerUser.rows[0].isAdmin) {
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
