import { useState } from "react";
import "./FaqsPage.scss";

const categories = [
  "All",
  "Billing",
  "Account",
  "Integration",
  "General",
];

const faqsData = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer: "Use forgot password option.",
    category: "Account",
    status: "published",
  },
  {
    id: 2,
    question: "How do I upgrade my plan?",
    answer: "Go to billing section.",
    category: "Billing",
    status: "draft",
  },
  {
    id: 3,
    question: "How to connect Zapier?",
    answer: "Use integration panel.",
    category: "Integration",
    status: "published",
  },
];

const FaqsPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState(null);

  const filteredFaqs = faqsData.filter((faq) => {
    const categoryMatch =
      activeCategory === "All" ||
      faq.category === activeCategory;

    const searchMatch =
      faq.question
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="faqs-page">
      {/* Header */}
      <div className="faqs-header">
        <div>
          <h1>FAQs</h1>
          <p>Manage your support knowledge base</p>
        </div>

        <button className="add-faq-btn">
          Add FAQ
        </button>
      </div>

      {/* Search */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search FAQ..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Categories */}
      <div className="faq-categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={
              activeCategory === category
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="faq-list">
        {filteredFaqs.map((faq) => (
          <div
            className="faq-card"
            key={faq.id}
          >
            <div
              className="faq-top"
              onClick={() =>
                setActiveFaq(
                  activeFaq === faq.id
                    ? null
                    : faq.id
                )
              }
            >
              <div>
                <h3>{faq.question}</h3>
                <span>{faq.category}</span>
              </div>

              <div
                className={`status ${faq.status}`}
              >
                {faq.status}
              </div>
            </div>

            {activeFaq === faq.id && (
              <div className="faq-answer">
                <p>{faq.answer}</p>

                <div className="faq-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqsPage;