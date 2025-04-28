import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ProgressBar } from './ui/ProgressBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LawyerOnBoarding: React.FC = () => {
  const location = useLocation();
  const { userId } = location.state as { userId: string };
  const navigate = useNavigate();
  console.log('Received userId:', userId);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    yearsOfExperience: 0,
    specialization: '',
    barCertificate: '',
    numberOfCases: 0,
    lawFirm: '',
    location: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/get-lawyer-details/${userId}`);
        const userData = response.data;
        setFormData((prev) => ({
          ...prev,
          ...userData,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        barCertificate: file.name, // Store the file's name
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/update-lawyer-details', {
        userId,
        updatedData: formData,
      });
      console.log('Profile updated:', response.data);
      navigate('/lawyer/dashboard', { state: { userId: userId} });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const progress = (step / 3) * 100;

  const handleNextStep = () => {
    if (step === 1 && (!formData.fullName || !formData.phone)) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Ensure the bar certificate filename exists
    if (step === 2 && !formData.barCertificate) {
      alert('Please upload your bar certificate.');
      return;
    }
  
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="bg-gray-950 py-10 px-6 text-white min-h-screen flex flex-col justify-center">
      <div className="container mx-auto max-w-xl">
        <ProgressBar progress={progress} />

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Step 1: Personal Information</h2>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <Input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
              />
              <Input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Specialization"
              />
              <Button onClick={handleNextStep} className="w-full rounded-full mt-6">
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Step 2: Upload Bar Certificate</h2>
            <div className="flex flex-col gap-4">
              {/* If barCertificate is already uploaded, show the file name */}
              {formData.barCertificate ? (
                <div className="text-green-500">
                  <p>Bar certificate uploaded: {formData.barCertificate}</p>
                </div>
              ) : (
                <Input
                  type="file"
                  name="barCertificate"
                  onChange={handleFileChange}
                />
              )}

              <div className="flex flex-col gap-4 mt-6">
                <Button onClick={handleBackStep} className="w-full rounded-full">
                  Back
                </Button>
                <Button onClick={handleNextStep} className="w-full rounded-full">
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Step 3: Professional Details</h2>
            <div className="flex flex-col gap-4">
              <Input
                type="number"
                name="numberOfCases"
                value={formData.numberOfCases}
                onChange={handleChange}
                placeholder="Number of Cases Solved"
              />
              <Input
                type="text"
                name="lawFirm"
                value={formData.lawFirm}
                onChange={handleChange}
                placeholder="Law Firm"
              />
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
              >
                <option value="" disabled>
                  Select Location
                </option>
                <option value="Aziz Nagar">Aziz Nagar</option>
                <option value="Bandlaguda Jagir">Bandlaguda Jagir</option>
                <option value="Suncity">Suncity</option>
              </select>
              <div className="flex flex-col gap-4 mt-6">
                <Button onClick={handleBackStep} className="w-full rounded-full">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="w-full rounded-full">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerOnBoarding;
