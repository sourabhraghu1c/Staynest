import "./Privacy.css";

export default function Privacy() {
    return (
        <div className="privacy-container">
            <h1 className="privacy-title">Privacy Policy</h1>

            <section className="privacy-section">
                <h2>Introduction</h2>
                <p>
                    At Staynest, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
                </p>
            </section>

            <section className="privacy-section">
                <h2>Information We Collect</h2>
                <ul>
                    <li>Personal information like name, phone number, email, and password.</li>
                    <li>Rental details when you list or search for properties.</li>
                    <li>Usage data to improve user experience and platform performance.</li>
                </ul>
            </section>

            <section className="privacy-section">
                <h2>How We Use Your Information</h2>
                <ul>
                    <li>To provide, maintain, and improve our services.</li>
                    <li>To communicate important information and updates.</li>
                    <li>To ensure security and prevent fraud or misuse.</li>
                </ul>
            </section>

            <section className="privacy-section">
                <h2>Data Sharing</h2>
                <p>
                    We do not sell your personal information. We may share your information only:
                </p>
                <ul>
                    <li>With your consent.</li>
                    <li>To comply with legal obligations.</li>
                    <li>To service providers who assist us in operating our platform.</li>
                </ul>
            </section>

            <section className="privacy-section">
                <h2>Security</h2>
                <p>
                    We use industry-standard security practices to protect your data. However, no online platform is 100% secure.
                </p>
            </section>

            <section className="privacy-section">
                <h2>Your Choices</h2>
                <ul>
                    <li>You can update or delete your account information anytime.</li>
                    <li>You can choose not to provide certain information, but it may limit your use of some features.</li>
                </ul>
            </section>

            <section className="privacy-section">
                <h2>Changes to this Policy</h2>
                <p>
                    We may update this policy occasionally. We'll notify users of significant changes.
                </p>
            </section>

            <section className="privacy-section">
                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <strong>support@staynest.com</strong>.
                </p>
            </section>
        </div>
    );
}
