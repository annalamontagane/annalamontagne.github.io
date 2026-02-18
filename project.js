const sections = document.querySelectorAll('.project-main section');
const navLinks = document.querySelectorAll('.section-nav a');

// Create an intersection observer
const observerOptions = {
  rootMargin: '-2rem 0rem -90% 0rem', // 2rem = 32px
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      
      // Remove active from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active to matching link
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});