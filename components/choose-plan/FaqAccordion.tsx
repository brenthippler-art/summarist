"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQS = [
  {
    question: "How does the free 7-day trial work?",
    answer:
      "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    question: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    answer:
      "Yes, you can switch between plans at any time from your account settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What's included in the Premium plan?",
    answer:
      "Premium gives you unlimited access to our full library of book summaries, both text and audio, along with new releases as they're added.",
  },
  {
    question: "Can I cancel during my trial or subscription?",
    answer:
      "Yes, you can cancel at any time from your account settings. If you cancel during your trial, you won't be charged.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="border-b border-gray-200">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="font-medium text-2xl text-[#032b41]">{faq.question}</span>
              {isOpen ? <FiChevronUp size={28} /> : <FiChevronDown size={28} />}
            </button>
            {isOpen && (
              <p className="text-gray-600 text-md leading-relaxed pb-5">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}