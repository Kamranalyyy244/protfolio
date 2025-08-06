
// toggle icon navbar

    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');


    menuIcon.addEventListener('click', function () {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {

    sections.forEach(sec => {
        let top  = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if(top >= offset && top < offset + height ){
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*= '+ id + ']').classList.add('active');
            })
        }
    })

    // sticky header
    let header = document.querySelector('header')

    header.classList.toggle('sticky',window.scrollY > 100)

    // remove toggle icon and navbar when click navbar links (scroll)

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}
    // Form Submit
const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  Toastify({
    text: "Sending...",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #f39c12, #f1c40f)",
    },
  }).showToast();

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        Toastify({
          text: "Message sent successfully!",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Failed: " + json.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #e74c3c, #c0392b)",
          },
        }).showToast();
      }
    })
    .catch((error) => {
      Toastify({
        text: "Something went wrong!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #e74c3c, #c0392b)",
        },
      }).showToast();
    })
    .finally(() => {
      form.reset();
    });
});

