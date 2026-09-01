import TimelineCard from "../components/TimelineCard";

function Timeline() {

  const events = [
    {
      date: "June 2026",
      title: "Blood Test",
      description: "HbA1c: 8.4%"
    },
    {
      date: "July 2026",
      title: "Prescription",
      description: "Metformin 500 mg"
    },
    {
      date: "August 2026",
      title: "Patient Report",
      description: "Patient reported stopping medication"
    },
    {
      date: "September 2026",
      title: "Current Visit",
      description: "Chest pain × 2 days"
    }
  ];

  return (
    <div className="page-container">

      <h1>Medical Timeline</h1>

      <div className="timeline">

        {events.map((event, index) => (
          <TimelineCard
            key={index}
            {...event}
          />
        ))}

      </div>

    </div>
  );
}

export default Timeline;