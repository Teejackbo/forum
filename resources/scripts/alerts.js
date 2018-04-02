const alerts = document.querySelectorAll('.alert')

addListeners = () => { alerts.forEach(alert => alert.addEventListener('click', handleClick)) }

const handleClick = e => {
  e.target.classList.add('fade-out')
  setTimeout(() => { e.target.style.display = 'none' }, 500)
}

const hideAlerts = () => {
  setTimeout(() => { alerts.forEach(alert => { alert.style.display = 'none' }) }, 4000)
}

addListeners()
hideAlerts()
