import google.generativeai as genai
import os

# Replace with your actual API key. It's best to set this as an environment variable.
os.environ['GOOGLE_API_KEY'] = 'AIzaSyBB5VnGogvv1pjdpWH54vylJMmyk7wvqH8'  # Replace with your key
my_api_key_gemini = os.environ.get('GOOGLE_API_KEY')

genai.configure(api_key=my_api_key_gemini)


def test_gemini_api():
    try:
        # 1. List available models
        available_models = genai.list_models()

        # 2. Choose a non-deprecated model that supports generate_content
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
            return

        model = genai.GenerativeModel(model_name)

        # 3. Send a request
        question = "What is the latest development in contract law?"
        response = model.generate_content(question)
        print("\nResponse from Gemini API:")
        print(response.text)

    except Exception as e:
        print(f"Error calling Gemini API: {e}")



test_gemini_api()
