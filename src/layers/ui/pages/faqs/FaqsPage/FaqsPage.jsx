import { useState, useEffect } from "react";
import useBusiness from "../../../../../layers/hooks/useBusiness";
import "./FaqsPage.scss";

const categories = [
  "All",
  "Billing",
  "Account",
  "Integration",
  "General",
];

const FaqsPage = () => {
  const { faqs, loading, error, success, getFaqs, addFaq, editFaq, deleteFaq, clearError, clearSuccess } = useBusiness();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState(null);

  // Form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getFaqs();
  }, []);

  useEffect(() => {
    return () => {
      clearError();
      clearSuccess();
    };
  }, [clearError, clearSuccess]);

  // Optionally clear form on success if we were just adding/editing
  useEffect(() => {
    if (success && showForm) {
      setShowForm(false);
      setEditingId(null);
      setQuestion("");
      setAnswer("");
      setCategory("General");
      setTags("");
      setTimeout(() => clearSuccess(), 3000);
    }
  }, [success, showForm, clearSuccess]);

  const filteredFaqs = (faqs || []).filter((faq) => {
    const categoryMatch = activeCategory === "All" || faq.category === activeCategory;
    const searchMatch = faq.question?.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const data = {
      question,
      answer,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingId) {
      editFaq(editingId, data);
    } else {
      addFaq(data);
    }
  };

  const handleEditClick = (faq) => {
    setEditingId(faq._id);
    setQuestion(faq.question || "");
    setAnswer(faq.answer || "");
    setCategory(faq.category || "General");
    setTags((faq.tags || []).join(", "));
    setShowForm(true);
    setActiveFaq(null);
  };

  const handleDeleteClick = (faqId) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      deleteFaq(faqId);
    }
  };

  if (loading && !faqs?.length && !showForm) {
    return (
      <div className="loader loader--fullscreen">
        <div className="loader__content loader__md">
          <div className="loader__spinner"><div className="loader__spinner-circle" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="faqs-page">
      {/* Header */}
      <div className="faqs-header">
        <div>
          <h1>FAQs</h1>
          <p>Manage your support knowledge base</p>
        </div>

        <button 
          className="add-faq-btn" 
          onClick={() => {
            setEditingId(null);
            setQuestion("");
            setAnswer("");
            setCategory("General");
            setTags("");
            setShowForm(!showForm);
          }}
          disabled={loading}
        >
          {showForm ? "Cancel" : "Add FAQ"}
        </button>
      </div>

      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {success && !showForm && <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>Action successful!</div>}

      {showForm && (
        <form className="faq-form" onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>{editingId ? "Edit FAQ" : "New FAQ"}</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Question</label>
            <input 
              type="text" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem' }} 
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Answer</label>
            <textarea 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }} 
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.5rem' }}
                disabled={loading}
              >
                {categories.filter(c => c !== "All").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tags (comma separated)</label>
              <input 
                type="text" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                style={{ width: '100%', padding: '0.5rem' }} 
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? "Saving..." : "Save FAQ"}
          </button>
        </form>
      )}

      {/* Search */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search FAQ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="faq-categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="faq-list">
        {loading && !showForm ? (
          <p>Loading FAQs...</p>
        ) : filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div className="faq-card" key={faq._id || faq.id}>
              <div
                className="faq-top"
                onClick={() => setActiveFaq(activeFaq === (faq._id || faq.id) ? null : (faq._id || faq.id))}
              >
                <div>
                  <h3>{faq.question}</h3>
                  <span>{faq.category}</span>
                </div>

                <div className={`status published`}>
                  Published
                </div>
              </div>

              {activeFaq === (faq._id || faq.id) && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>

                  <div className="faq-actions">
                    <button onClick={() => handleEditClick(faq)} disabled={loading}>Edit</button>
                    <button onClick={() => handleDeleteClick(faq._id || faq.id)} disabled={loading}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No FAQs found.</p>
        )}
      </div>
    </div>
  );
};

export default FaqsPage;