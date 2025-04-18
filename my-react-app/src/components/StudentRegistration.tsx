import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import SectionTitle from './SectionTitle';
import axios from 'axios';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    university: '',
    graduationYear: '',
    collegeEmail: '',
    fullName: '',
    phone: '',
    password: '',
    faceImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStartCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError('Could not access webcam');
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageData = canvasRef.current.toDataURL('image/png');

    setFormData((prev) => ({
      ...prev,
      faceImage: imageData,
    }));

    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    setCameraActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Get face encoding from Python server
      const encodingResponse = await axios.post('http://localhost:5001/extract-encoding', {
        image: formData.faceImage,
      });

      const faceEncoding = encodingResponse.data.encoding;
      if (!faceEncoding || !Array.isArray(faceEncoding)) {
        throw new Error('Invalid face encoding received from server');
      }

      const flattenedEncoding = faceEncoding.flat(); // ✅ Flatten the encoding

      const payload = {
        username: formData.collegeEmail,
        password: formData.password,
        role: 'student',
        faceEncoding: flattenedEncoding,
        university: formData.university,
        graduationYear: formData.graduationYear,
        fullName: formData.fullName,
        phone: formData.phone,
      };

      console.log('Sending Payload:', payload);

      const response = await axios.post('http://localhost:5000/api/auth/register', payload);
      console.log('Student registered successfully:', response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error('Registration failed:', err);
      if (err.response) {
        console.log('Error Response:', err.response.data);
        setError(err.response?.data?.message || 'Registration failed. Try again.');
      } else {
        setError('Registration failed. Please check the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-black py-24 px-4 text-white min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <SectionTitle
          title="Student Registration"
          subtitle="Join our platform by providing your academic details and verifying your identity."
          align="center"
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="space-y-10 mt-14 bg-gray-900 bg-opacity-60 backdrop-blur-md p-10 rounded-3xl border border-gray-800 shadow-[0_0_25px_0_rgba(0,0,0,0.4)]"
        >
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'University Name', name: 'university', type: 'text' },
            { label: 'Graduation Year (e.g. 2025)', name: 'graduationYear', type: 'text' },
            { label: 'College Email', name: 'collegeEmail', type: 'email' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
            { label: 'Create Password', name: 'password', type: 'password' },
          ].map(({ label, name, type }) => (
            <div key={name} className="relative">
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] || ''}
                onChange={handleChange}
                required
                className="peer w-full bg-gray-800 text-white placeholder-transparent border border-gray-700 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                placeholder={label}
              />
              <label
                htmlFor={name}
                className="absolute left-4 top-2 text-sm text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all"
              >
                {label}
              </label>
            </div>
          ))}

          <div className="space-y-4">
            <label className="block text-sm text-gray-400 font-medium">Facial Recognition</label>

            {!formData.faceImage && !cameraActive && (
              <Button onClick={handleStartCamera} type="button">
                Start Camera
              </Button>
            )}

            {cameraActive && (
              <div className="flex flex-col items-center space-y-4">
                <video ref={videoRef} width="320" height="240" className="rounded-xl border border-gray-700 shadow-md" />
                <Button type="button" onClick={handleCapture}>
                  Capture Face
                </Button>
              </div>
            )}

            {formData.faceImage && (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={formData.faceImage}
                  alt="Captured Face"
                  className="w-36 h-36 object-cover rounded-full border-4 border-green-500 shadow-xl"
                />
                <p className="text-green-400 text-sm">Face captured successfully</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, faceImage: null }));
                    handleStartCamera();
                  }}
                  className="text-red-400"
                >
                  Retake Photo
                </Button>
              </div>
            )}

            <canvas ref={canvasRef} width="320" height="240" className="hidden" />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">Registration successful!</p>}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3 rounded-full text-lg hover:bg-primary/90 transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Registering...
              </span>
            ) : (
              'Register as Student'
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default StudentRegistration;