import { useEffect, useState } from "react";

// DEFAULT PROJECTS
const projectData = [
  {
    id: 1,
    title: "Event Pal",
    description:
      "A web application for managing events.",
    github: "https://github.com/jvestevamm26/EventPal",
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22",
    tech: ["Python", "Django", "SQLite", "Bootstrap"]
  },
  {
    id: 2,
    title: "Book Collection App",
    description:
      "A full-stack web app where users can search books and manage collections.",
    github: "https://github.com/jvestevamm26/book-app",
    image: "https://wallpaperaccess.com/full/1209397.jpg",
    tech: ["Node.js", "Express", "PostgreSQL", "EJS", "Axios"]
  }
];
// PROJECTS PAGE
function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    tech: ""
  });

  // LOAD PROJECTS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects([...projectData, ...saved]);
  }, []);

  // SAVE PROJECTS
  const saveProjects = (data) => {
    const userProjects = data.slice(projectData.length);
    localStorage.setItem("projects", JSON.stringify(userProjects));
    setProjects(data);
  };

  // ADD PROJECT
  const handleAdd = () => {
    if (!newProject.title) return;

    const updated = [
      ...projects,
      {
        ...newProject,
        id: Date.now(),
        tech: newProject.tech
          ? newProject.tech.split(",").map(t => t.trim())
          : []
      }
    ];

    saveProjects(updated);
// RESET FORM
    setNewProject({
      title: "",
      description: "",
      image: "",
      github: "",
      tech: ""
    });

    setShowForm(false);
  };
// RENDER
  return (
    <div className="page">
      <h1>Projects</h1>

      {/* ADD BUTTON */}
      <button onClick={() => setShowForm(!showForm)}>
        ➕ Add Project
      </button>

      {/* FORM */}
      {showForm && (
        <div className="card" style={{ marginTop: "15px" }}>
          <input
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />

          <input
            placeholder="Image URL"
            value={newProject.image}
            onChange={(e) =>
              setNewProject({ ...newProject, image: e.target.value })
            }
          />

          <input
            placeholder="Tech (React, Node, etc.)"
            value={newProject.tech}
            onChange={(e) =>
              setNewProject({ ...newProject, tech: e.target.value })
            }
          />

          <input
            placeholder="GitHub Link"
            value={newProject.github}
            onChange={(e) =>
              setNewProject({ ...newProject, github: e.target.value })
            }
          />

          <button onClick={handleAdd}>Save</button>
        </div>
      )}

      {/* PROJECT LIST */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="card"
            style={{
              width: "300px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* IMAGE */}
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover"
                }}
              />
            )}

            {/* CONTENT */}
            <div style={{ padding: "10px" }}>
              <h3>{project.title}</h3>

              <p style={{ fontSize: "14px" }}>
                {project.description}
              </p>

              {/* TECH TAGS */}
              {project.tech && project.tech.length > 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px"
                  }}
                >
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* GITHUB BUTTON */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    color: "white",
                    background: "#4a90e2",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    textDecoration: "none"
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;