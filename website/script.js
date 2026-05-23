// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('#hero');
const navLinks = document.querySelectorAll('.navbar nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  if (window.scrollY >= hero.offsetHeight - navbar.offsetHeight) {
    navbar.classList.add('fixed-top');
  } else {
    navbar.classList.remove('fixed-top');
  }

  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - navbar.offsetHeight - 10;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document
        .querySelector(`.navbar nav ul li a[href="#${id}"]`)
        ?.classList.add('active');
    }
  });
});

// Smooth scroll
const scrollLinks = document.querySelectorAll('.navbar nav ul li a, .hero-button');

scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - navbar.offsetHeight,
      behavior: 'smooth'
    });
  });
});

// Hero button animation
const heroButton = document.querySelector('.hero-button');
window.addEventListener('load', () => {
  setTimeout(() => heroButton.classList.add('show'), 500);
});

// Project card scroll animation
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.3 });
projectCards.forEach(card => observer.observe(card));

// About section scroll animation — declare BEFORE using
const aboutSection = document.querySelector('.about-text');
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.3 });
if (aboutSection) aboutObserver.observe(aboutSection);

// -------------------- Chatbot --------------------
const chatbotBtn = document.getElementById('chatbot-button');
const chatbotModal = document.getElementById('chatbot-modal');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInputEl = document.getElementById('chatbot-input');
const chatbotMessagesEl = document.getElementById('chatbot-messages');

const LOCAL_RESPONSES = {
  help: `Available commands:\n- resume : Get a link to my resume\n- skills : See my skills and tools\n- projects : Learn about my projects\n- email : Send me a message`,
  skills: `My skills include: AWS, Terraform, Python, JavaScript, HTML, CSS, DynamoDB, Lambda, API Gateway, CloudFront, CloudWatch, IAM, S3, and Git.`,
  projects: `I've built:\n• Portfolio Website — serverless AWS stack with Terraform\n• Weather App — real-time forecast app with vanilla JS`,
  resume: `You can view my resume here: <a href="#" target="_blank">Resume (link coming soon)</a>`,
  email: `Feel free to reach me at: <a href="mailto:your@email.com">your@email.com</a>`
};

const recognizedCommands = Object.keys(LOCAL_RESPONSES);

function scrollChatToBottom() {
  setTimeout(() => {
    chatbotMessagesEl.scrollTop = chatbotMessagesEl.scrollHeight;
  }, 50);
}

function formatMessage(text) {
  return text.replace(/\n/g, '<br>');
}

function showWelcome() {
  if (chatbotMessagesEl.innerHTML.trim() === '') {
    chatbotMessagesEl.innerHTML += `
      <div class="bot-msg">
        <span class="msg-label">Chatbot</span>
        <div class="msg-text">Hi! I'm Hunter's chatbot. Type <strong>"help"</strong> to see what I can do.</div>
      </div>`;
    scrollChatToBottom();
  }
}

chatbotBtn.addEventListener('click', () => {
  chatbotModal.style.display = 'flex';
  showWelcome();
});

chatbotClose.addEventListener('click', () => {
  chatbotModal.style.display = 'none';
});

chatbotInputEl.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || chatbotInputEl.value.trim() === '') return;

  const userMessage = chatbotInputEl.value.trim();
  const lowerMsg = userMessage.toLowerCase();

  chatbotMessagesEl.innerHTML += `
    <div class="user-msg">
      <span class="msg-label">You</span>
      <div class="msg-text">${formatMessage(userMessage)}</div>
    </div>`;
  chatbotInputEl.value = '';
  scrollChatToBottom();

  const reply = LOCAL_RESPONSES[lowerMsg] ||
    `I don't recognize that command.<br>Type <strong>"help"</strong> to see available options.`;

  chatbotMessagesEl.innerHTML += `
    <div class="bot-msg">
      <span class="msg-label">Chatbot</span>
      <div class="msg-text">${formatMessage(reply)}</div>
    </div>`;
  scrollChatToBottom();
});