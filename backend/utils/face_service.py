from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
from io import BytesIO
from PIL import Image
from deepface import DeepFace

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Load face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Helper: Convert base64 string to OpenCV image
def base64_to_cv2(base64_data):
    try:
        header, encoded = base64_data.split(',', 1)
        img_bytes = base64.b64decode(encoded)
        img_array = np.frombuffer(img_bytes, dtype=np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print("Failed to convert base64 to image:", str(e))
        return None

# Route: Extract face from base64 image and return cropped grayscale face
@app.route('/extract-encoding', methods=['POST'])
def extract_encoding():
    data = request.get_json()
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "No image data provided"}), 400

    img = base64_to_cv2(image_data)
    if img is None:
        return jsonify({"error": "Invalid image data"}), 400

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(faces) == 0:
        return jsonify({"error": "No face found"}), 400

    for (x, y, w, h) in faces:
        face_crop = gray[y:y + h, x:x + w]
        return jsonify({"encoding": face_crop.tolist()})  # Send cropped grayscale face

    return jsonify({"error": "Face encoding failed"}), 500

# Route: Compare known encoding (grayscale face crop) vs unknown image (full face)
@app.route('/verify-face', methods=['POST'])
def verify_face():
    try:
        data = request.get_json()

        # Convert known grayscale crop to RGB OpenCV image
        known_encoding = np.array(data['known_encoding'], dtype=np.uint8)
        known_pil = Image.fromarray(known_encoding)
        known_rgb = cv2.cvtColor(np.array(known_pil.convert("RGB")), cv2.COLOR_RGB2BGR)

        # Convert unknown image from base64 to OpenCV
        image_data = data['unknown_encoding'].split(',')[1]
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        unknown_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Use DeepFace to compare faces
        result = DeepFace.verify(img1_path=known_rgb, img2_path=unknown_cv, enforce_detection=False)

        return jsonify({
            "match": result["verified"],
            "confidence_known": float(result["distance"]),
            "confidence_unknown": float(result["distance"])
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001)