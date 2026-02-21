<template>
  <ContactView
    title="Get In Touch"
    :emailConfig="{
      serviceID: 'service_y36rsqk',
      templateID: 'template_3769e6e', 
      userID: 'tbx28ecxgtDxcPRP1'
    }"
    @success="handleSuccess"
  />
</template>

<script>
import ContactView from '@/components/Contact.vue';

export default {
  components: { ContactView },
  methods: {
    handleSuccess() {
      // Optional success handler
      console.log('Email sent successfully!');
    }
  }
};
</script>