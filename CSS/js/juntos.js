let startDate = new Date(2026, 8, 17, 8, 56, 0);

// Recupera data salva no navegador, se existir
const savedDate = localStorage.getItem('tempoJuntosStartDate');
if (savedDate) {
    startDate = new Date(savedDate);
}

function updateTimer() {
    const now = new Date();

    if (now < startDate) {
        document.getElementById('years').textContent = '0';
        document.getElementById('months').textContent = '0';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    document.getElementById('years-label').textContent = years === 1 ? 'Ano' : 'Anos';
    document.getElementById('months-label').textContent = months <= 1 ? 'Mês' : 'Meses';
    document.getElementById('days-label').textContent = days === 1 ? 'Dia' : 'Dias';
    document.getElementById('hours-label').textContent = hours === 1 ? 'Hora' : 'Horas';
}

function toggleDatePicker() {
    const wrapper = document.getElementById('datePickerWrapper');
    wrapper.classList.toggle('active');
    
    const tzOffset = startDate.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(startDate - tzOffset)).toISOString().slice(0, 16);
    document.getElementById('startDateInput').value = localISOTime;
}

function saveNewDate() {
    const inputVal = document.getElementById('startDateInput').value;
    if (inputVal) {
        startDate = new Date(inputVal);
        localStorage.setItem('tempoJuntosStartDate', startDate.toISOString());
        updateTimer();
        document.getElementById('datePickerWrapper').classList.remove('active');
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 1.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(particle);
    }
}

// Eventos dos botões
document.getElementById('togglePickerBtn').addEventListener('click', toggleDatePicker);
document.getElementById('saveDateBtn').addEventListener('click', saveNewDate);

// Inicialização
createParticles();
updateTimer();
setInterval(updateTimer, 1000);