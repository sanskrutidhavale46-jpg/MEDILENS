function TimelineCard({
  date,
  title,
  description
}) {

  return (
    <div className="timeline-card">

      <div className="timeline-dot"></div>

      <div>

        <p className="timeline-date">
          {date}
        </p>

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

    </div>
  );
}

export default TimelineCard;