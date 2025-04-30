import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms & Conditions</h1>

      <div className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Staynest, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use our platform.
        </p>
      </div>

      <div className="terms-section">
        <h2>2. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </p>
      </div>

      <div className="terms-section">
        <h2>3. User Conduct</h2>
        <ul>
          <li>No posting of misleading or false listings.</li>
          <li>No harassment, spamming, or abusive behavior.</li>
          <li>Respect the privacy and rights of others.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>4. Listings</h2>
        <p>
          Property listings must be accurate and up-to-date. We reserve the right to remove listings that violate our policies.
        </p>
      </div>

      <div className="terms-section">
        <h2>5. Limitation of Liability</h2>
        <p>
          Staynest is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
        </p>
      </div>

      <div className="terms-section">
        <h2>6. Modifications</h2>
        <p>
          We may update these terms at any time. Continued use of the service after changes constitutes your agreement to the updated terms.
        </p>
      </div>

      <div className="terms-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms, you can contact us at <b>support@staynest.com</b>.
        </p>
      </div>
    </div>
  );
};

export default Terms;
