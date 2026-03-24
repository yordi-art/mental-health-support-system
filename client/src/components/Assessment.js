import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure",
  "Trouble concentrating on things",
  "Moving or speaking so slowly that others could notice",
  "Thoughts that you would be better off dead"
];

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Assessment = () => {
  const [assessmentType, setAssessmentType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const questions = assessmentType === 'PHQ-9' ? phq9Questions : gad7Questions;
  const maxScore = assessmentType === 'PHQ-9' ? 27 : 21;

  const startAssessment = (type) => {
    setAssessmentType(type);
    setCurrentQuestion(0);
    setResponses([]);
    setResult(null);
  };

  const handleAnswer = (score) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = score;
    setResponses(newResponses);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitAssessment = () => {
    const totalScore = responses.reduce((sum, val) => sum + val, 0);
    
    let severity = '';
    if (totalScore <= 4) severity = 'Minimal';
    else if (totalScore <= 9) severity = 'Mild';
    else if (totalScore <= 14) severity = 'Moderate';
    else if (totalScore <= 19) severity = 'Moderately Severe';
    else severity = 'Severe';
    
    const user = JSON.parse(localStorage.getItem('user'));
    const assessment = {
      id: Date.now(),
      type: assessmentType,
      clientId: user.email,
      clientName: user.fullName,
      date: new Date().toISOString(),
      score: totalScore,
      maxScore: maxScore,
      severity: severity,
      responses: responses
    };
    
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    assessments.push(assessment);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    
    setResult({ totalScore, maxScore, severity });
  };

  if (result) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="nav-content">
            <div className="logo">
              <h1>🌿 MindCare</h1>
            </div>
            <div className="nav-links">
              <button onClick={() => navigate('/client-dashboard')} className="btn btn-secondary">Back</button>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="card">
            <h2>Assessment Complete!</h2>
            <div className="stat-card" style={{ marginTop: '20px' }}>
              <div className="stat-number">{result.totalScore}/{result.maxScore}</div>
              <div>Score</div>
            </div>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
              Severity: <strong>{result.severity}</strong>
            </p>
            <p>
              {result.severity === 'Minimal' && 'Continue self-care practices and regular check-ins.'}
              {result.severity === 'Mild' && 'Consider self-help strategies. A therapist can help develop coping skills.'}
              {result.severity === 'Moderate' && 'We recommend speaking with a therapist.'}
              {result.severity === 'Moderately Severe' && 'Please consider reaching out to a mental health professional.'}
              {result.severity === 'Severe' && 'Please reach out to a mental health professional soon. Your wellbeing matters.'}
            </p>
            <button onClick={() => navigate('/client-dashboard')} className="btn btn-primary" style={{ marginTop: '20px' }}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentType) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="nav-content">
            <div className="logo">
              <h1>🌿 MindCare</h1>
            </div>
            <div className="nav-links">
              <button onClick={() => navigate('/client-dashboard')} className="btn btn-secondary">Back</button>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="card" onClick={() => startAssessment('PHQ-9')}>
            <h3>📝 PHQ-9 Depression Screening</h3>
            <p>9 questions to assess depression symptoms</p>
            <small>Time: 3-5 minutes</small>
          </div>
          
          <div className="card" onClick={() => startAssessment('GAD-7')}>
            <h3>😰 GAD-7 Anxiety Screening</h3>
            <p>7 questions to assess anxiety symptoms</p>
            <small>Time: 2-3 minutes</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="nav-content">
          <div className="logo">
            <h1>🌿 MindCare</h1>
          </div>
          <div className="nav-links">
            <button onClick={() => setAssessmentType(null)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="card">
          <div style={{ textAlign: 'right', marginBottom: '20px', color: '#666' }}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <h3 style={{ marginBottom: '30px' }}>{questions[currentQuestion]}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                className={`btn ${responses[currentQuestion] === idx ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleAnswer(idx)}
                style={{ textAlign: 'left' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        
        {currentQuestion === questions.length - 1 && responses[currentQuestion] !== undefined && (
          <button onClick={submitAssessment} className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;