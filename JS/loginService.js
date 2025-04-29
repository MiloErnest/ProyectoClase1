document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert('Hola estos son tus datos: email: ' + email + 'pass: ' + password)

    let mensaje = ''
    let tipoAlerta = ''
    if (email === '' || password === '') {
        mensaje = 'Por favor completa todos los campos.';
        tipoAlerta = 'warning'
    }
    else if (email === 'prueba@gmail.com' && password === '123456') {
        mensaje = 'Inicio de sesion exitoso.'
        tipoAlerta = 'success'
    }
    else {
        mensaje = 'Correo o contraseña incorrectos'
        tipoAlerta = 'danger'
    }
    let alerta = `
        <div class="alert alert-${tipoAlerta} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    document.getElementById('mensaje').innerHTML = alerta;
})