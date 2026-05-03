import { useState, useEffect } from "react";
import useBusiness from "../../../../../layers/hooks/useBusiness";
import "./BusinessPage.scss";

const businessStats = [
  { title: "Customers", value: "12.5K", growth: "+18%" },
  { title: "Revenue", value: "$48K", growth: "+22%" },
  { title: "Tickets", value: "248", growth: "+9%" },
  { title: "Satisfaction", value: "94%", growth: "+12%" },
];

const BusinessPage = () => {
  const { settings, loading, error, success, getSettings, saveSettings, clearError, clearSuccess } = useBusiness();

  const [aiTone, setAiTone] = useState("professional");
  const [autoReply, setAutoReply] = useState(false);
  const [ticketThreshold, setTicketThreshold] = useState(10);

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setAiTone(settings.aiTone || "professional");
      setAutoReply(settings.autoReply || false);
      setTicketThreshold(settings.ticketThreshold || 10);
    }
  }, [settings]);

  useEffect(() => {
    return () => {
      clearError();
      clearSuccess();
    };
  }, [clearError, clearSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings({ aiTone, autoReply, ticketThreshold });
  };

  if (loading && !settings) {
    return (
      <div className="loader loader--fullscreen">
        <div className="loader__content loader__md">
          <div className="loader__spinner"><div className="loader__spinner-circle" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="business-page">
      {/* Header */}
      <div className="business-header">
        <div>
          <h1>Business Settings</h1>
          <p>Configure your support AI and track growth</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {businessStats.map((item, index) => (
          <div className="stat-card" key={index}>
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <span>{item.growth}</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="business-grid">
        {/* Settings Form */}
        <div className="card settings-card" style={{ gridColumn: '1 / -1' }}>
          <h3>AI & System Settings</h3>

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>Settings saved successfully!</div>}

          {loading && !settings ? (
            <p>Loading settings...</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>AI Tone</label>
                <select 
                  value={aiTone} 
                  onChange={(e) => setAiTone(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  disabled={loading}
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="autoReply"
                  checked={autoReply} 
                  onChange={(e) => setAutoReply(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="autoReply" style={{ fontWeight: 'bold' }}>Enable Auto-Reply</label>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ticket Threshold (Alert when open tickets exceed)</label>
                <input 
                  type="number" 
                  value={ticketThreshold} 
                  onChange={(e) => setTicketThreshold(parseInt(e.target.value, 10) || 0)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  disabled={loading}
                  min="1"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;