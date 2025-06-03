from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("heart_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        features = [float(data[feature]) for feature in [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
            'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
        ]]
        prob = model.predict_proba([features])[0][1]
        return jsonify({"prediction": round(prob * 100, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
