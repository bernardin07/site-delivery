document.addEventListener('DOMContentLoaded', function() {
    const burgerSelect = document.getElementById('burger');
    const accompanimentCheckboxes = document.querySelectorAll('input[name="accompaniments"]');
    const orderSummary = document.getElementById('orderSummary');
    const totalPrice = document.getElementById('totalPrice');
    const orderForm = document.getElementById('orderForm');

    const prices = {
        'duplo-carnes': 18.90,
        'x-tudo': 22.90,
        'x-grandao': 20.90,
        'x-salada': 19.90,
        'best-burger': 24.90,
        'x-grandinho': 17.90,
        'refrigerante': 3.00,
        'batata-pequena': 15.90,
        'batata-grande': 25.90,
        'bacon-cheddar': 10.00
    };

    const names = {
        'duplo-carnes': 'Duplo Carnes',
        'x-tudo': 'X-Tudo',
        'x-grandao': 'X-Grandão',
        'x-salada': 'X-Salada + Fritas',
        'best-burger': 'Best Burger',
        'x-grandinho': 'X-Grandinho',
        'refrigerante': 'Refrigerante',
        'batata-pequena': 'Batata Pequena',
        'batata-grande': 'Batata Grande',
        'bacon-cheddar': 'Bacon + Cheddar'
    };

    function updateOrderSummary() {
        const selectedBurger = burgerSelect.value;
        const selectedAccompaniments = Array.from(accompanimentCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let summaryHTML = '';
        let total = 0;

        if (selectedBurger) {
            summaryHTML += `<p><strong>${names[selectedBurger]}</strong> - R$ ${prices[selectedBurger].toFixed(2)}</p>`;
            total += prices[selectedBurger];
        }

        if (selectedAccompaniments.length > 0) {
            summaryHTML += '<p><strong>Acompanhamentos:</strong></p>';
            selectedAccompaniments.forEach(acc => {
                summaryHTML += `<p>• ${names[acc]} - R$ ${prices[acc].toFixed(2)}</p>`;
                total += prices[acc];
            });
        }

        if (summaryHTML === '') {
            summaryHTML = '<p>Selecione um hambúrguer para ver o resumo</p>';
        }

        orderSummary.innerHTML = summaryHTML;
        totalPrice.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Event listeners
    burgerSelect.addEventListener('change', updateOrderSummary);
    accompanimentCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateOrderSummary);
    });

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    // Envio do formulário
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedBurger = burgerSelect.value;
        if (!selectedBurger) {
            alert('Por favor, selecione um hambúrguer!');
            return;
        }

        const formData = new FormData(this);
        const customerName = formData.get('customerName');
        const phone = formData.get('phone');
        const deliveryAddress = formData.get('deliveryAddress');

        if (!customerName || !phone || !deliveryAddress) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        // Simulação de envio do pedido
        const orderData = {
            burger: selectedBurger,
            accompaniments: Array.from(accompanimentCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value),
            customer: {
                name: customerName,
                phone: phone,
                address: deliveryAddress,
                observations: formData.get('observations')
            },
            total: totalPrice.textContent
        };

        console.log('Pedido enviado:', orderData);
        
        // Mostrar mensagem de sucesso
        showSuccessMessage();
    });

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <h3>🎉 Pedido Realizado com Sucesso!</h3>
            <p>Seu pedido foi recebido e será entregue em aproximadamente 30-45 minutos.</p>
            <p>Você receberá uma confirmação via WhatsApp no número informado.</p>
        `;
        successDiv.style.display = 'block';
        
        orderForm.parentNode.insertBefore(successDiv, orderForm);
        orderForm.style.display = 'none';
        
        // Scroll para a mensagem
        successDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Redirecionar após 5 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    }

    // Inicializar resumo
    updateOrderSummary();
});