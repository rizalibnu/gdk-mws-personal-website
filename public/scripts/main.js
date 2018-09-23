/**
 * Copyright get current year
 */
const today = new Date();
const year = today.getFullYear();
document.getElementById("copy-year").innerHTML = year;