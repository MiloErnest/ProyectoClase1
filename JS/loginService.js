document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  alert('Hola estos son tus datos: email: ' + email + 'pass: ' + password)
  login(email, password)
})


function login(email, password) {
  localStorage.removeItem('token')
  let message = ''
  let alertType = ''
  const REQRES_ENPOINT = 'https://reqres.in/api/login'
  fetch(REQRES_ENPOINT, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
          'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify({ email, password })
  })
      .then((response) => {
          if (response.status == 200) {
              alertType = 'success'
              message = 'Inicio de sesión exitoso'
              alertBuilder(alertType, message)
              localStorage.setItem('token', 'qwertyuiopasdfghjkl')
              setTimeout(() => {
                  location.href = 'admin/Dashboard.html';

              }, 2000)//2000ms = 2s
          }
          else {
              alertType = 'danger'
              message = 'correo o contraseña invalida'
              alertBuilder(alertType, message)
          }
          console.log('respuesta de servicio', response)
          
      })
      .catch((error) => {
          alertType = 'danger'
          message = 'Correo o contraseña invalida'
          console.log('error en el servicio', error)
          alertBuilder(alertType, message)
      })


}

function alertBuilder(alertType, message) {
  const alert = `
      <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  document.getElementById('mensaje').innerHTML = alert;
}