import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";

const LegalDocuments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [paraphrasedText, setParaphrasedText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'b68c0ab621cd24cead8443ad22c477f943b3ccae'; // Replace this with your Indian Kanoon API Key

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const response = await axios.get(`https://api.indiankanoon.org/search/`, {
        params: {
          formInput: searchQuery,
          pagenum: 1
        },
        headers: {
          Authorization: `Token ${apiKey}`
        }
      });
      setDocuments(response.data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async (docId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.indiankanoon.org/doc/${docId}/`, {
        headers: {
          Authorization: `Token ${apiKey}`
        }
      });
      setDocumentContent(response.data);
      setSelectedDoc(docId);
    } catch (error) {
      console.error('Fetch document failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleParaphrase = async () => {
    if (!documentContent) return;
    try {
      // Here, ideally, you would connect to your backend paraphrasing service
      // For now, let's mock paraphrasing by slightly modifying the text
      const paraphrased = documentContent.replace(/(the|The)/g, 'This');
      setParaphrasedText(paraphrased);
    } catch (error) {
      console.error('Paraphrasing failed:', error);
    }
  };

  return (
    <motion.div 
      className="p-8 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-4">Legal Documents Search</h1>

      <div className="flex gap-4">
        <Input 
          placeholder="Search legal topics, cases..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {documents.map((doc: any, index) => (
          <Card key={index} onClick={() => fetchDocument(doc.docid)} className="cursor-pointer hover:shadow-lg transition">
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg">{doc.title || 'Untitled Document'}</h2>
              <p className="text-gray-500 text-sm mt-2">{doc.snippet}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Viewer */}
      {selectedDoc && (
        <motion.div 
          className="mt-10 p-6 bg-white rounded-lg shadow-lg space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-2xl font-bold mb-2">Document Content</h2>
          <Textarea value={documentContent} rows={15} readOnly />

          <div className="flex gap-4 mt-4">
            <Button onClick={handleParaphrase}>
              Paraphrase
            </Button>
            {paraphrasedText && (
              <Button variant="outline" onClick={() => setParaphrasedText('')}>
                Clear Paraphrase
              </Button>
            )}
          </div>

          {paraphrasedText && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Paraphrased Text</h3>
              <Textarea value={paraphrasedText} rows={10} readOnly />
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LegalDocuments;
