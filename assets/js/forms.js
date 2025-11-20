document.addEventListener('DOMContentLoaded', function() {
    // Validação e envio do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulação de envio
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            this.reset();
        });
    }

    // Validação e envio do formulário de cadastro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showMessage('As senhas não coincidem!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('A senha deve ter pelo menos 6 caracteres!', 'error');
                return;
            }
            
            const terms = document.getElementById('terms').checked;
            if (!terms) {
                showMessage('Você deve aceitar os termos de uso!', 'error');
                return;
            }
            
            // Simulação de cadastro
            showMessage('Cadastro realizado com sucesso! Bem-vindo ao Best Burger!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Máscara para telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    });

    function showMessage(message, type) {
        const messageDiv = document.getElementById('formMessage') || createMessageDiv();
        messageDiv.className = `form-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    function createMessageDiv() {
        const div = document.createElement('div');
        div.id = 'formMessage';
        const form = document.querySelector('form');
        form.parentNode.insertBefore(div, form);
        return div;
    }
});