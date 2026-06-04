import { ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState, useCallback, memo } from 'react';

// ─── Sub-Components ────────────────────────────────────────────────────────────

const FAQItem = memo(function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`transition-colors duration-300 border-b border-border last:border-b-0 ${isOpen ? 'bg-surface-2 rounded-lg px-3' : 'px-3'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-base font-medium transition-colors text-brand group-hover:text-highlight">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-colors transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand' : 'text-ink-secondary group-hover:text-highlight'
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="leading-relaxed text-ink-secondary">{answer}</p>
      </div>
    </div>
  );
});

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

FAQItem.displayName = 'FAQItem';

// ─── Component ────────────────────────────────────────────────────────────────

const FAQSection = memo(function FAQSection({ faqs }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleToggle = useCallback((index) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-brand">
            {'FAQ'}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand md:text-4xl">{'Common questions'}</h2>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-2 divide-y divide-border shadow-[var(--shadow-float)]">
          <div className="p-4 md:p-6">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

FAQSection.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

FAQSection.displayName = 'FAQSection';

export { FAQSection };
export default FAQSection;
