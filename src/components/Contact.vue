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
.contact-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 8px;
  text-align: center;
}

input, textarea {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: #18334f;
  color: yellow;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0c1928;
}

.success {
  color: #4CAF50;
  margin-top: 1rem;
}

.error {
  color: #F44336;
  margin-top: 1rem;
}
/* --- Mobile Responsive Adjustments --- */
@media (max-width: 600px) {
  .contact-container {
    margin: 1rem auto; /* Reduces the outside margin so it fits better on screen */
    padding: 1.5rem 1rem; /* Shrinks the inside padding to give the text boxes more room */
    width: 95%; /* Ensures the box doesn't touch the absolute edges of the phone screen */
  }

  input, textarea {
    padding: 1rem; /* Slightly larger padding makes text boxes easier to tap on phones */
  }

  button {
    width: 100%; /* Stretches the button across the whole form */
    padding: 1rem; /* Makes the tap target larger for thumbs */
    font-size: 1.1rem; /* Slightly larger text for the button */
  }
}
</style>
