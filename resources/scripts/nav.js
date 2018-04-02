document.querySelector('.nav--selector').addEventListener('click', () => {
  const nav = document.querySelector('.nav--navigation')
  const children = nav.querySelectorAll('.nav--item')
  if (nav.style.display === 'none' || nav.style.display === '') {
    children.forEach(child => {
      child.classList.remove('fade-out-short')
      child.classList.add('fade-in-short')
    })
    nav.style.display = 'block'
  } else {
    children.forEach(child => {
      child.classList.remove('fade-in-short')
      child.classList.add('fade-out-short')
    })
    setTimeout(() => { nav.style.display = 'none' }, 420)
  }
})
