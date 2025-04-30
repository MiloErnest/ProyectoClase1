const APP_CONFIG = {
    API_ENDPOINT: 'https://reqres.in/api/login',
    ALERT_TIMEOUT: 5000
  };
  
  const DOM_ELEMENTS = {
    loginForm: document.getElementById('login-form'),
    emailInput: document.getElementById('email'),
    passwordInput: document.getElementById('password'),
    messageContainer: document.getElementById('mensaje'),
    submitButton: document.querySelector('#login-form button[type="submit"]')
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    if (DOM_ELEMENTS.loginForm) {
      DOM_ELEMENTS.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = DOM_ELEMENTS.emailInput.value.trim();
        const password = DOM_ELEMENTS.passwordInput.value.trim();
  
        if (!email || !password) {
          showAlert('warning', 'Por favor complete todos los campos.');
          return;
        }
  
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showAlert('warning', 'Por favor ingrese un correo válido.');
          return;
        }
  
        try {
          DOM_ELEMENTS.submitButton.disabled = true;
          DOM_ELEMENTS.submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
  
          const response = await fetch(APP_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.error || 'Credenciales inválidas');
          }
  
          showAlert('success', 'Inicio de sesión exitoso. Redirigiendo...');
          console.log('Token recibido:', data.token);
          
        } catch (error) {
          const errorMessage = error.message.includes('user not found') 
            ? 'Usuario no encontrado' 
            : error.message.includes('Credenciales inválidas') 
              ? 'Correo o contraseña incorrectos' 
              : 'Error en el servicio';
          showAlert('danger', errorMessage);
        } finally {
          DOM_ELEMENTS.submitButton.disabled = false;
          DOM_ELEMENTS.submitButton.innerHTML = 'Iniciar sesión';
        }
      });
    }
  });
  
  function showAlert(type, message) {
    const alertId = `alert-${Date.now()}`;
    DOM_ELEMENTS.messageContainer.innerHTML = `
      <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  
    setTimeout(() => {
      const alertElement = document.getElementById(alertId);
      if (alertElement) {
        new bootstrap.Alert(alertElement).close();
      }
    }, APP_CONFIG.ALERT_TIMEOUT);
  }