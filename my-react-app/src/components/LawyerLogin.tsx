import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2, ScanFace, LockKeyhole } from 'lucide-react';
import SectionTitle from './SectionTitle';
import axios from 'axios';

const LawyerLogin = () => {
  const [activeTab, setActiveTab] = useState<'face' | 'credentials'>('credentials');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: formData.username,
        password: formData.password,
      });

      console.log('Logged in with credentials:', res.data);
      // store token or navigate
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFaceLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, min: 15 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
      }

      setTimeout(async () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context || !videoRef.current) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        const encodingRes = await axios.post('http://localhost:5001/extract-encoding', {
          image: imageData,
        });

        if (encodingRes.data.error) {
          setError(encodingRes.data.error);
          setLoading(false);
          return;
        }

        const res = await axios.post('http://localhost:5001/verify-face', {
          known_encoding: encodingRes.data.encoding,
          unknown_encoding: imageData,
          username: formData.username,
        });

        console.log('Logged in with face:', res.data);
        // store token or navigate
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Face login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [activeTab]);

  return (
    <section className="bg-gray-950 py-24 px-4 text-white">
      <div className="container mx-auto max-w-xl">
        <SectionTitle title="Lawyer Login" subtitle="Choose a login method" align="center" />

        <div className="flex justify-center mt-10 gap-4">
          <Button
            variant={activeTab === 'credentials' ? 'default' : 'outline'}
            onClick={() => setActiveTab('credentials')}
            className="rounded-full px-6"
          >
            <LockKeyhole className="w-5 h-5 mr-2" />
            Credentials
          </Button>
          <Button
            variant={activeTab === 'face' ? 'default' : 'outline'}
            onClick={() => setActiveTab('face')}
            className="rounded-full px-6"
          >
            <ScanFace className="w-5 h-5 mr-2" />
            Face Login
          </Button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <AnimatePresence mode="wait">
          {activeTab === 'credentials' ? (
            <motion.form
              key="credentials"
              onSubmit={handleLogin}
              className="space-y-8 mt-12 bg-gray-900 p-8 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <Button type="submit" disabled={loading} className="w-full rounded-full">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Login with Credentials'}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="face"
              className="mt-12 bg-gray-900 p-8 rounded-2xl shadow-2xl text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg text-gray-300">Enter your username, then scan your face.</p>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />

              <video
                ref={videoRef}
                className="mx-auto rounded-xl border border-gray-700 shadow-lg"
                width={320}
                height={240}
                autoPlay
                muted
              />

              <Button onClick={handleFaceLogin} disabled={loading} className="w-full rounded-full">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Start Face Login'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LawyerLogin;
