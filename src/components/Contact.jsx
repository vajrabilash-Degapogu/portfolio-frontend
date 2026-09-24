import "../css/Contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-heading">
          <p className="contact-label">CONTACT</p>

          <h2>
            Let's <span>connect</span>
          </h2>

          <p>
            Feel free to connect with me through my website,
            GitHub, email or phone.
          </p>
        </div>

        <div className="contact-content">

          {/* Contact Information */}
          <div className="contact-info">

            <a
              href="https://www.owntag.in"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon-link"
              aria-label="Visit Owntag website"
            >
              <span className="contact-icon"><i className="bi bi-globe"></i></span>

              <div>
                <h3>Website</h3>
                <p>owntag.in</p>
              </div>
            </a>

            <a
              href="https://github.com/vajrabilash-Degapogu"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon-link"
              aria-label="Visit GitHub profile"
            >
              <span className="contact-icon"><i className="bi bi-github"></i></span>

              <div>
                <h3>GitHub</h3>
                <p>My GitHub Profile</p>
              </div>
            </a>

            <a
              href="mailto:vajrabilash0399@gmail.com"
              className="contact-icon-link"
              aria-label="Send email"
            >
              <span className="contact-icon"><i class="bi bi-envelope-at"></i></span>

              <div>
                <h3>Email</h3>
                <p>vajrabilash0399@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+918008044700"
              className="contact-icon-link"
              aria-label="Call primary phone number"
            >
              <span className="contact-icon"><i class="bi bi-telephone-fill"></i></span>

              <div>
                <h3>Phone</h3>
                <p>+91 80080 44700</p>
              </div>
            </a>

            <a
              href="tel:+919951860220"
              className="contact-icon-link"
              aria-label="Call alternative phone number"
            >
              <span className="contact-icon"><i class="bi bi-telephone-fill"></i></span>

              <div>
                <h3>Alternative</h3>
                <p>+91 99518 60220</p>
              </div>
            </a>

          </div>

          {/* Contact Form */}
          <form className="contact-form">

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                placeholder="Your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                rows="6"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;