import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We’d love to hear from you! Whether you have feedback, feature ideas, or need support — we’re here to help.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-card">
          <h2>Send a Message</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contact-details-card">
            <h2>Reach Us Directly</h2>
            <br></br>
            <p><strong>Email:</strong> support@tabletalkapp.com</p>
            <p><strong>Phone:</strong> +1 (587) 123-4567</p>
            <br></br><br></br><br></br>
            <p>
                <strong>Twitter:</strong> <a href="https://media.tenor.com/wPudCfjCrD8AAAAM/penguin-hello.gif">@tabletalkapp</a>
            </p>
            <p>
                <strong>Instagram:</strong> <a href="https://media.tenor.com/wPudCfjCrD8AAAAM/penguin-hello.gif">@tabletalkapp</a>
            </p>
            <p>
                <strong>LinkedIn:</strong> <a href="https://media.tenor.com/wPudCfjCrD8AAAAM/penguin-hello.gif">TableTalk on LinkedIn</a>
            </p>
        </div>
      </div>
    </div>
  );
}
