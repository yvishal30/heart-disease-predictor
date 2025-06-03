import React, { useState } from "react";
import axios from "axios";
import 'animate.css';

const HeartForm = () => {
  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '',
    fbs: '', restecg: '', thalach: '', exang: '',
    oldpeak: '', slope: '', ca: '', thal: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (error) {
      alert("Prediction failed: " + error.message);
    }
  };

  return (
    <>
      <style>{`
        /* Page center & background gradient */
        .page-center {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #fce7f3, #dbeafe);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Card container with border & shadow */
        .card {
          background-color: white;
          padding: 32px 48px;
          border: 2px solid #fb7185; /* rose-400 */
          box-shadow: 0 10px 30px rgba(251, 113, 133, 0.3);
          border-radius: 20px;
          width: 100%;
          max-width: 680px;
          animation: fadeIn 1s ease forwards;
        }

        /* Title */
        .title {
          margin-bottom: 24px;
          text-align: center;
          color: #b91c1c; /* rose-700 */
          font-weight: 700;
          font-size: 2rem;
        }

        /* Form grid 2 columns with gap */
        form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        /* Input fields */
        input[type="number"] {
          width: 100%;
          padding: 14px 18px;
          border: 1.8px solid #d1d5db; /* gray-300 */
          border-radius: 14px;
          font-size: 1rem;
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        input[type="number"]:focus {
          border-color: #fb7185; /* rose-400 */
          outline: none;
          box-shadow: 0 0 8px #fb7185aa;
        }

        /* Predict button */
        button[type="submit"] {
          grid-column: span 2;
          margin-top: 24px;
          background: linear-gradient(90deg, #3b82f6, #1e40af);
          color: white;
          font-weight: 700;
          padding: 14px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.6);
          transition: background 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
          font-size: 1.1rem;
        }

        button[type="submit"]:hover {
          background: linear-gradient(90deg,rgb(238, 10, 10),rgb(233, 73, 25));
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.7);
        }

        /* Prediction result */
        .prediction {
          margin-top: 28px;
          text-align: center;
          font-weight: 700;
          font-size: 1.4rem;
          color: #b91c1c; /* rose-700 */
          animation: bounce 1.5s infinite;
        }

        /* Animations */
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(15px);}
          to {opacity: 1; transform: translateY(0);}
        }

        @keyframes bounce {
          0%, 100% {transform: translateY(0);}
          50% {transform: translateY(-10px);}
        }
      `}</style>

      <div className="page-center">
        <div className="card animate__animated animate__fadeIn">
          <h2 className="title">Heart Disease Predictor</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.toUpperCase()}
                type="number"
                required
              />
            ))}
            <button type="submit">Predict</button>
          </form>

          {prediction !== null && (
            <div className="prediction">
              Predicted Heart Disease Chance: {prediction}%
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeartForm;
