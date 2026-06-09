import Image from "next/image";

const projects = [
  {
    title: "Garden Planning Tool",
    subtitle: "Python · Blender · L-system rules",
    image: "/img/gardenplanning.png",
    note: "A procedural garden planning tool that explores plant growth, branching rules, and seasonal visual changes.",
    details: ["Procedural generation", "Growth simulation", "Visual planning"],
  },
  {
    title: "Hackcessible Drum System",
    subtitle: "Arduino · C++ · Inclusive design",
    image: "/img/dmdhackcessible.jpg",
    note: "An accessible music prototype built for users with limited mobility during Hackcessible 2022.",
    details: ["Adaptive hardware", "User-focused testing", "Award-winning prototype"],
  },
  {
    title: "Viridis Reporting Platform",
    subtitle: "Ruby on Rails · SQL · Reporting",
    image: "/img/viridis.jpg",
    note: "A sustainability reporting platform with authentication, database-backed reports, and business-facing workflows.",
    details: ["Secure access", "Dynamic reports", "Admin workflow"],
  },
];

const skills = [
  "Java", "Python", "SQL", "JavaScript", "Ruby on Rails", "JasperReports", "ZK Framework", "Git", "Problem Solving", "Technical Support"
];

const experience = [
 {
    year: "2026",
    role: "Onsite Maintenance Engineer, Data Centre",
    text: "Worked onsite in a data centre environment supporting high-performance server systems, including GB200 platforms. Built hands-on experience in hardware inspection, maintenance checks, firmware-related support, connectivity troubleshooting and issue escalation, while creating readable self-SOPs to improve knowledge sharing within the team.",
  },
 {
    year: "2025",
    role: "Software Developer",
    text: "Continued growing beyond the protégé stage by contributing to project development, improving API integration work in Next.js, exploring Java web service integration, and becoming more mindful of requirement clarity, communication and technical preparedness.",
  },
  {
    year: "2024",
    role: "Software Developer Protégé",
    text: "Built confidence through Java, SQL, JasperReports and debugging production-style issues with senior developers.",
  },
  {
    year: "2023",
    role: "Application Support Engineer",
    text: "Supported integrations, deployments, troubleshooting and business continuity across technical workflows.",
  },
  {
    year: "2022",
    role: "Private Tutor",
    text: "Taught Computer Science and Mathematics with patient, beginner-friendly explanations.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a href="#home" className="brand">ZNZ</a>
        <div className="navlinks">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#journal">Journal</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">Software Developer · Problem Solver</p>

          <h1 className="intro-title">
            Hi, I&apos;m{" "}
            <span className="waviy" translate="no">
              {"Zuhaira.".split("").map((letter, index) => (
                <span key={index} style={{ "--i": index + 1 } as React.CSSProperties}>
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p className="lead">
            I enjoy turning messy problems into calm, working solutions — from reports,
            databases and debugging to accessible prototypes and creative web interfaces.
          </p>

          <div className="actions">
            <a className="primary" href="#work">View my work</a>
            <a className="secondary" href="mailto:zuhairanasrin.zakaria@gmail.com">Contact me</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-block">
            <div className="code-line">
              <span className="code-comment">// Developer in progress</span>
            </div>

            <div className="code-line">
              <span className="code-keyword">const</span>{" "}
              <span className="code-function">developer</span> = {"{"}
            </div>

            <div className="code-line">
              &nbsp;&nbsp;name: <span className="code-string">&apos;Zuhaira&apos;</span>,
            </div>

            <div className="code-line">
              &nbsp;&nbsp;role: <span className="code-string">&apos;Problem Solver&apos;</span>,
            </div>

            <div className="code-line">
              &nbsp;&nbsp;skills: [
              <span className="code-string">&apos;Java&apos;</span>,{" "}
              <span className="code-string">&apos;Python&apos;</span>,{" "}
              <span className="code-string">&apos;SQL&apos;</span>
              ],
            </div>

            <div className="code-line">
              &nbsp;&nbsp;passion: <span className="code-string">&apos;Making things work&apos;</span>
            </div>

            <div className="code-line">{"};"}</div>
          </div>
        </div>
      </section>

      <section id="about" className="page-shell split-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>A developer who learns by untangling real problems.</h2>
        </div>
        <div className="paper-panel">
          <p>
            I’m still growing in software development, but I’m strongest when something is unclear, broken, or difficult to trace. My work has involved Java, SQL, JasperReports, ZK Framework, integrations, and technical support.
          </p>
          <p>
            I am currently working as an IT Engineer Support in a data centre environment,
            gaining hands-on experience in server maintenance, troubleshooting, hardware
            checks, firmware updates and technical support. I also enjoy creating readable
            self-SOPs to make troubleshooting steps clearer and support easier knowledge
            sharing within the team. I enjoy building things that are not only functional,
            but also clear, organised and thoughtfully designed.
          </p>
        </div>
      </section>

      <section className="page-shell skills-section">
        <p className="eyebrow">Skills</p>
        <h2>Tools I keep on my desk</h2>
        <div className="skill-tags">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section id="work" className="page-shell work-section">
        <p className="eyebrow">Selected Work</p>
        <h2>Project chapters</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="chapter">Chapter 0{index + 1}</div>
              <div className="project-image-wrap">
                <Image src={project.image} alt={project.title} width={700} height={440} />
              </div>
              <div className="project-body">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p>{project.note}</p>
                <ul>
                  {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell timeline-section">
        <p className="eyebrow">Experience</p>
        <h2>Recent pages</h2>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.role}>
              <span>{item.year}</span>
              <div>
                <h3>{item.role}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="journal" className="page-shell journal-section">
        <div className="quote-card">
          <p className="eyebrow">Journal</p>
          <h2>Developer Notes</h2>
          <p>
            A small space for my thoughts on coding, debugging, work lessons and things I am learning along the way.
          </p>
          <a href="https://medium.com/@zuhairanasrin.zakaria" target="_blank" rel="noreferrer">Visit Medium</a>
        </div>
      </section>

      <section id="contact" className="page-shell contact-section">
        <p className="eyebrow">Contact</p>
        <h2>Let’s Connect</h2>
        <div className="contact-links">
          <a href="mailto:zuhairanasrin.zakaria@gmail.com">Email</a>
          <a href="http://www.linkedin.com/in/zuhaira-nasrin-zakaria/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/ZuhairaTech/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.goodreads.com/user/show/188515408-zuhaira" target="_blank" rel="noreferrer">Goodreads</a>
        </div>
      </section>
    </main>
  );
}
