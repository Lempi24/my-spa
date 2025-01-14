let pageUrls = {
    about: '/index.html?about',
    contact:'/index.html?contact'
   };
   function OnStartUp() {
    popStateHandler();
   }
   OnStartUp();
   document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
   });
   document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
   });
   function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
   }
   function RenderContactPage() {
    // Generowanie losowej CAPTCHA
    const num1 = Math.floor(Math.random() * 10); // Pierwsza liczba (0-9)
    const num2 = Math.floor(Math.random() * 10); // Druga liczba (0-9)
    const correctAnswer = num1 + num2; // Poprawna odpowiedź

    document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>
    <form id="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>

        <!-- CAPTCHA -->
        <div class="captcha-container">
            <label for="captcha">What is ${num1} + ${num2}?</label>
            <input type="text" id="captcha" name="captcha" required>
        </div>

        <button type="submit">Send</button>
    </form>`;

    // Obsługa i walidacja formularza
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Zapobiegamy domyślnemu wysłaniu formularza

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const captcha = document.getElementById('captcha').value.trim();

        // Walidacja formularza
        if (!name) {
            alert('Name is required.');
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!message) {
            alert('Message is required.');
            return;
        }

        if (parseInt(captcha) !== correctAnswer) { // Walidacja losowej CAPTCHA
            alert('Incorrect CAPTCHA answer. Please try again.');
            return;
        }

        // Jeśli wszystkie pola są poprawne
        alert('Thank you for your message!');
        this.reset(); // Czyszczenie formularza
    });
}


   function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact){ RenderContactPage(); }
    if(loc === pageUrls.about){ RenderAboutPage(); }
   }
   window.onpopstate = popStateHandler;
   document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
   });

   