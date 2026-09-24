import "../css/Education.css";

function Education() {
  const education = [
     {
  year: "2018 - 2022",
  degree: "Bachelor's Degree",
  field: "Computer Science and Engineering",
  score: "6.44",
  description:
    "Developed a strong foundation in software development, programming, databases, and computer science concepts.",
  institute: "Khallam Haranadha reddy institute of Technology",
},
    {
  year: "2014 - 2017",
  degree: "Diploma",
  field: "Electrical Electronics Engineering",
  score: "6.74",
  description:
    "Built a strong foundation in electrical and electronics engineering, technical problem-solving, and practical applications.",
  institute:
    "Chalapathi institute of technology, Mothadaka, Amaravathi",
},
    {
      year: "2013 - 2014",
      degree: "SSC",
      score:"6.3",
      institute: "Yadhava High School, Old guntur.",
      field: "10th Standard",
      description:
        "Developed foundational knowledge in mathematics, science, communication, and analytical thinking.",
    },
    
  ];

  return (
    <section className="education-section" id="education">
      <div className="education-container">

        <div className="education-heading">
          <p className="education-label">EDUCATION</p>

          <h2>
            My <span>learning journey</span>
          </h2>

          <p>
            My academic background and continuous learning journey
            in software and full-stack development.
          </p>
        </div>

        <div className="education-list">

          {education.map((item, index) => (
            <div className="education-card" key={index}>

              <div className="education-year">
                {item.year}
              </div>

              <div className="education-content">

                <div className="education-title-row">
                    <h3>{item.degree}</h3>

                    <span className="education-score">
                    CGPA: {item.score}
                    </span>
                </div>

                <h4>{item.field}</h4>

                <p>{item.description}</p>

                <h5>{item.institute}</h5>

                </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Education;