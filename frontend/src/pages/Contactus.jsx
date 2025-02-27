import { useRef } from "react";
import emailjs from "@emailjs/browser"

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          alert("Message sent successfully!");
          console.log(result.text);
        },
        (error) => {
          alert("Failed to send message. Try again later.");
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <input type="text" name="user_name" placeholder="Your Name" required />
      <input type="email" name="user_email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
};
