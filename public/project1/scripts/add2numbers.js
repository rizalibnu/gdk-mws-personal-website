/**
 * calculator
 */
const form = document.querySelector('form');
form.onsubmit = e => {
  e.preventDefault()
  const angka = document.querySelectorAll('input');
  const i1= angka[0].value ; //angka pertama
  const i2= angka[1].value ; //angka kedua
  angka[2].value= parseInt(i1) + parseInt(i2);
}

/**
 * resize content wrapper
 */
const setContentWrapperHeight = () => {
  const contentWrapper = document.getElementById('contentWrapper');
  const menu = document.querySelector('.menu');
  const footer = document.querySelector('.footer');
  const contentWrapperHeight = window.innerHeight - (menu.clientHeight + footer.clientHeight);
  contentWrapper.style.minHeight = `${contentWrapperHeight}px`;
}
setContentWrapperHeight();
window.onresize = () => {
  setContentWrapperHeight();
};