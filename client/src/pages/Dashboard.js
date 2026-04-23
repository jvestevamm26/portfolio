import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Animation variants for the cards
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};
// This page serves as the main dashboard after a user logs in. It displays a welcome message and animated cards that link to different sections of the portfolio, such as Projects, Notes, and About. Each card has a hover effect for better interactivity.
function Dashboard() {
  const name = "User";

  const cards = [
    { title: "Projects", desc: "2 Projects", link: "/projects" },
    { title: "Notes", desc: "Manage your notes", link: "/notes" },
    { title: "About", desc: "View profile", link: "/about" },
  ];

  return (
    <div className="page">
      <h1>Welcome back, {name} 👋</h1>
      <p>You are successfully logged in.</p>

      {/* Animated Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="card"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "220px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Link
              to={card.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
