document.querySelector('.nav--selector').addEventListener('click', function () {
  var nav = document.querySelector('.nav--navigation')
  var children = nav.querySelectorAll('.nav--item')
  if (nav.style.display === 'none' || nav.style.display === '') {
    for (var i = 0; i < children.length; i++) {
      children[i].classList.remove('fade-out-short')
      children[i].classList.add('fade-in-short')
    }
    nav.style.display = 'block'
  }
  else {
    for (var i = 0; i < children.length; i++) {
      children[i].classList.remove('fade-in-short')
      children[i].classList.add('fade-out-short')
    }
    setTimeout(function(){nav.style.display = 'none'}, 420)
  }
})