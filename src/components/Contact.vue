<template>
  <div class="contact-container">
    <h2>Contact Me</h2>
    <form @submit.prevent="sendEmail">
      <input
        type="text"
        v-model="form.name"
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        v-model="form.email"
        placeholder="Your Email"
        required
      />
      <textarea
        v-model="form.message"
        placeholder="Your Message"
        required
      ></textarea>
      <button type="submit">Send</button>
      <p v-if="status" :class="statusClass">{{ status }}</p>
    </form>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  name: 'ContactForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      status: '',
      statusClass: '',
      // Set your EmailJS credentials here
      serviceID: 'service_y36rsqk',
      templateID: 'template_3769e6e',
      publicKey: 'tbx28ecxgtDxcPRP1'
    };
  },
  methods: {
    async sendEmail() {
      try {
        await emailjs.send(
          this.serviceID,
          this.templateID,
          {
            from_name: this.form.name,
            from_email: this.form.email,
            message: this.form.message
          },
          this.publicKey
        );

        this.status = 'Message sent successfully!';
        this.statusClass = 'success';
        this.resetForm();
      } catch (error) {
        this.status = 'Failed to send message. Please try again.';
        this.statusClass = 'error';
        console.error('EmailJS error:', error);
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        message: ''
      };
    }
  }
};
</script>

<style scoped>
/* Ensure padding doesn't mess up widths */
* {
  box-sizing: border-box;
}

.contact-container {
  /* Scalability: Takes up 90% of screen until it hits 600px */
  width: 90%; 
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  
  /* Glassmorphism Effect for space theme */
  background: rgba(15, 23, 42, 0.4); /* Dark, semi-transparent blue/black */
  backdrop-filter: blur(10px); /* Blurs the space background slightly behind the box */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle glowing border */
  border-radius: 12px;
  
  text-align: center;
  color: #ffffff; /* Makes text white */
  font-family: inherit; /* Forces it to use your website's cool font */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Adds depth */
}

h2 {
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem; /* Automatically spaces out the inputs */
  width: 100%;
}

input, textarea {
  width: 100%;
  padding: 1rem;
  /* Transparent inputs that fit the theme */
  background: rgba(255, 255, 255, 0.05); 
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-family: inherit; /* Inherits your website font */
  font-size: 1rem;
  transition: all 0.3s ease; /* Smooth hover/focus effects */
}

input::placeholder, textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Make inputs glow slightly when typing */
input:focus, textarea:focus {
  outline: none;
  border-color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

textarea {
  min-height: 150px;
  resize: vertical; /* Allows user to drag down, but not sideways */
}

button {
  padding: 1rem 1.5rem;
  width: 100%;
  /* Sleek ghost button design */
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

/* Inverts button colors when hovering */
button:hover {
  background-color: #ffffff;
  color: #000000;
}

.success {
  color: #4ade80; /* Brighter green for dark mode */
  margin-top: 1rem;
}

.error {
  color: #f87171; /* Brighter red for dark mode */
  margin-top: 1rem;
}

/* --- Mobile Responsive Adjustments --- */
@media (max-width: 600px) {
  .contact-container {
    width: 95%; /* Takes up more of the screen on small phones */
    margin: 1.5rem auto;
    padding: 1.5rem;
  }
}
</style>