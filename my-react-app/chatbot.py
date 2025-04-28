from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS
my_api_key_gemini = 'AIzaSyBB5VnGogvv1pjdpWH54vylJMmyk7wvqH8'
genai.configure(api_key=my_api_key_gemini)
# Initialize the Gemini API model
available_models = genai.list_models()
model_name = None
preferred_models = [
        "models/gemini-1.5-pro",  # Example of a preferred model
        "models/gemini-1.5-flash",  # Another example
        "models/gemini-pro", # added this
        "models/gemini-2.0-pro", # added this
        "models/gemini-2.0-flash"
        ]  # Add more preferred models here, and adjust as needed.

for preferred_model in preferred_models:
            for model in available_models:
                if model.name == preferred_model and 'generateContent' in model.supported_generation_methods:
                    model_name = model.name
                    print(f"Using preferred model: {model_name}")
                    break  # Found a preferred model, exit inner loop
            if model_name:
                break  # Found a preferred model, exit outer loop
if not model_name: #changed this
            for model in available_models: # Iterate through all models if preferred is not found
                if 'generateContent' in model.supported_generation_methods:
                    model_name = model.name
                    print(f"Using available model: {model_name}")
                    break
            
if not model_name:
    print("Error: No suitable model found that supports generateContent.")

model = genai.GenerativeModel(model_name)

# Configure Gemini API k
app = Flask(__name__)
CORS(app)
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({'error': 'Page not found'}), 404

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get the user message from the POST request
        user_message = request.json.get('message')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Send the user message to Gemini for processing
        response = model.generate_content(user_message)

        # Check if the response contains valid content
        if response.text:
            return jsonify({'message': response.text})
        else:
            return jsonify({'error': "Sorry, Gemini didn't want to answer that!"}), 500
    except Exception as e:
        return jsonify({'error': f'Error during processing: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
