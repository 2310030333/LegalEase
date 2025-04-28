// src/components/SearchLawyer.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import NotificationSender from './NotificationSender'      // ← NEW
import './SearchLawyer.css'

interface Lawyer {
  _id: string
  fullName: string
  specialization: string
  address: string
  yearsOfExperience: number
}

const SearchLawyer = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [expandedIds, setExpandedIds] = useState<string[]>([])       // ← track which cards are expanded
  const [connectingTo, setConnectingTo] = useState<string | null>(null) // ← track which lawyer’s connect form is open
  const navigate = useNavigate()

  const fetchLawyers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/lawyer/search`, {
        params: { name, address, specialization },
      })
      setLawyers(res.data)
    } catch (err) {
      console.error('Error fetching lawyers:', err)
    }
  }

  useEffect(() => {
    fetchLawyers()
  }, [])

  const handleSearch = async () => {
    await fetchLawyers()
  }

  const toggleExpand = (id: string) => {
    setExpandedIds(ids =>
      ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    )
  }

  return (
    <div className="animated-wave-gradient min-h-screen p-8 text-white">
      {/* Home button */}
      <button
        onClick={() => navigate('/clientdashboard')}
        className="home-button mb-6"
        aria-label="Go to client dashboard"
      >
        <Home className="w-6 h-6 text-white" />
      </button>

      {/* Animated Heading */}
      {!showFilters && (
        <h2 className="text-4xl font-bold text-center mb-8 drop-shadow-md">
          <Typewriter
            words={[
              'Choose the Right Lawyer for Your Case',
              'Solutions Start with the Right Lawyer',
              'One Search Away from Legal Success',
            ]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h2>
      )}

      {/* Search toggle */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="search-toggle-button"
          aria-label="Toggle search filters"
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search by Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search by Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search by Specialization"
            value={specialization}
            onChange={e => setSpecialization(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      )}

      {/* Results */}
      <div className="results-grid">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer, idx) => (
            <motion.div
              key={lawyer._id}
              className="lawyer-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: 'easeOut' }}
              layout
            >
              <h3 className="lawyer-name">{lawyer.fullName}</h3>
              <p className="lawyer-info">Specialization: {lawyer.specialization}</p>
              <p className="lawyer-info">Location: {lawyer.address}</p>

              {/* Read More / Show Less toggle */}
              <button
                onClick={() => toggleExpand(lawyer._id)}
                className="mt-4 text-primary hover:underline"
              >
                {expandedIds.includes(lawyer._id) ? 'Show Less' : 'Read More'}
              </button>

              {/* Expanded details */}
              {expandedIds.includes(lawyer._id) && (
                <div className="mt-3 text-gray-300">
                  <p>Experience: {lawyer.yearsOfExperience} years</p>
                  {/* add any other fields here */}
                </div>
              )}

              {/* Connect button moved to show only after expanding (Read More) */}
              {expandedIds.includes(lawyer._id) && (
                <>
                  <button
                    onClick={() => setConnectingTo(lawyer._id)}
                    className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded text-white"
                  >
                    Connect
                  </button>

                  {/* Inline NotificationSender form */}
                  {connectingTo === lawyer._id && (
                    <div className="mt-4">
                      <NotificationSender lawyerId={lawyer._id} />
                      <button
                        onClick={() => setConnectingTo(null)}
                        className="mt-2 text-sm text-red-400 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg mt-12">
            No lawyers found.
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchLawyer
