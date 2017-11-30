var alerts = document.querySelectorAll('.alert');

function addListeners() {
  for (var i = 0; i < alerts.length; i++) {
    alerts[i].addEventListener('click', handleClick);
  }
}

function handleClick(e) {
  e.target.classList.add('fade-out');
  setTimeout(function() {
    e.target.style.display = 'none';
  }, 500);
}

function hideAlerts() {
  setTimeout(function() {
    for (var i = 0; i < alerts.length; i++) {
      alerts[i].style.display = 'none';
    }
  }, 4000)
}

addListeners();
hideAlerts();