function QuestionCard() {

  return (
    <div className="question-card">

      <p className="question-label">
        MediLens asks
      </p>

      <h2>
        How long have you had this problem?
      </h2>

      <div className="answers">

        <button>Today</button>

        <button>2–3 days</button>

        <button>About a week</button>

        <button>More than a month</button>

        <button>I don't know</button>

      </div>

    </div>
  );
}

export default QuestionCard;