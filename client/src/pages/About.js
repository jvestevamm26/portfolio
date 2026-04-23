function About() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center"
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
        alt="Profile"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      />

      <h2 style={{ marginTop: "20px" }}>Hi, Victor Santos</h2>

      <p style={{ maxWidth: "500px", color: "#555" }}>
        I am a full-stack developer building modern web applications.
          I have experience with React, Node.js, Django, and more. I enjoy creating
      </p>
    </div>
  );
}

export default About;