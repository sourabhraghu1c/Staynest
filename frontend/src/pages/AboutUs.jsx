import "./AboutUs.css";

export default function AboutUs() {
    return (
        <div className="about-container">
            <section className="sub-container">
                <h1>About Staynest</h1>
                <p>
                    Staynest is a student-centric rental platform designed to help you find
                    the perfect PG, hostel, or flat with ease. Whether you're moving for college
                    or work, we’re here to simplify your room search.
                </p>
            </section>

            <section className="sub-container">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to bridge the gap between property owners and renters by offering
                    a reliable, user-friendly platform that promotes transparency and trust without extra expend on Brokers.
                </p>
            </section>

            <section className="sub-container">
                <h2>Meet the Team</h2>
                <p>
                    We're a passionate group of developers and designers working to make rental
                    discovery seamless and stress-free for everyone.
                </p>
                {/* You can later add profile cards or team images here */}
            </section>
        </div>
    );
}
