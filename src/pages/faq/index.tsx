import { useState } from "react"
import Container from "../../components/container"
import { 
  FiSearch, 
  FiChevronDown, 
  FiChevronUp, 
  FiHelpCircle, 
  FiShield, 
  FiCreditCard, 
  FiUser, 
  FiSettings,
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi"
import { FaCar } from "react-icons/fa"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
  icon: React.ComponentType<any>
  popular?: boolean
}

const faqCategories = [
  { id: 'all', name: 'All Questions', icon: FiHelpCircle },
  { id: 'general', name: 'General', icon: FiMessageCircle },
  { id: 'buying', name: 'Buying Cars', icon: FaCar },
  { id: 'selling', name: 'Selling Cars', icon: FiUser },
  { id: 'payment', name: 'Payment & Billing', icon: FiCreditCard },
  { id: 'safety', name: 'Safety & Security', icon: FiShield },
  { id: 'support', name: 'Support', icon: FiSettings },
]

const faqData: FAQItem[] = [
  // General Questions
  {
    id: 1,
    question: "What is WebCars and how does it work?",
    answer: "WebCars is a premium online marketplace that connects car buyers and sellers. We provide a secure platform where you can browse thousands of verified vehicles, connect with trusted sellers, and complete transactions with confidence. Our platform includes features like vehicle verification, secure payments, and 24/7 customer support.",
    category: "general",
    icon: FiHelpCircle,
    popular: true
  },
  {
    id: 2,
    question: "How do I create an account?",
    answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, fill in your details, verify your email address, and you're ready to start browsing or listing cars. The entire process takes less than 2 minutes.",
    category: "general",
    icon: FiUser
  },
  {
    id: 3,
    question: "Is WebCars free to use?",
    answer: "Yes! Browsing cars and creating an account is completely free. We only charge a small commission when you successfully sell a car through our platform, ensuring we only make money when you do.",
    category: "general",
    icon: FiCreditCard,
    popular: true
  },

  // Buying Cars
  {
    id: 4,
    question: "How do I search for cars on WebCars?",
    answer: "Use our powerful search bar to find cars by make, model, year, price range, or location. You can also use our advanced filters to narrow down by features like fuel type, transmission, mileage, and more. Save your searches to get notified when new matching cars are listed.",
    category: "buying",
    icon: FaCar,
    popular: true
  },
  {
    id: 5,
    question: "Are all cars on WebCars verified?",
    answer: "Yes! Every car listed on our platform goes through our comprehensive verification process. We check vehicle history, condition reports, seller credentials, and documentation to ensure you're getting accurate information. All verified cars display our verification badge.",
    category: "buying",
    icon: FiCheckCircle
  },
  {
    id: 6,
    question: "Can I schedule a test drive?",
    answer: "Absolutely! You can contact sellers directly through our secure messaging system to schedule test drives. We recommend meeting in public places and bringing a friend for safety. Many sellers also offer video calls to show you the car remotely.",
    category: "buying",
    icon: FaCar
  },
  {
    id: 7,
    question: "What if I'm not satisfied with my purchase?",
    answer: "We offer a 7-day satisfaction guarantee on all purchases. If you're not completely satisfied with your car, contact our support team within 7 days of delivery for a full refund or exchange. Terms and conditions apply.",
    category: "buying",
    icon: FiShield
  },

  // Selling Cars
  {
    id: 8,
    question: "How do I list my car for sale?",
    answer: "Simply go to your dashboard and click 'List Your Car'. Fill in the vehicle details, upload high-quality photos, set your price, and submit for verification. Our team will review your listing within 24 hours to ensure it meets our quality standards.",
    category: "selling",
    icon: FiUser,
    popular: true
  },
  {
    id: 9,
    question: "What documents do I need to sell my car?",
    answer: "You'll need your vehicle title, registration, maintenance records, and a valid driver's license. For older vehicles, we may also require a recent inspection report. All documents are verified through our secure system.",
    category: "selling",
    icon: FiSettings
  },
  {
    id: 10,
    question: "How much does it cost to sell on WebCars?",
    answer: "We charge a 2.5% commission only when your car sells successfully. There are no listing fees, no monthly charges, and no hidden costs. You only pay when you make money!",
    category: "selling",
    icon: FiCreditCard
  },
  {
    id: 11,
    question: "How long does it take to sell my car?",
    answer: "On average, cars sell within 2-4 weeks on our platform. Well-priced, well-photographed cars with complete information tend to sell faster. Our team provides tips and suggestions to help optimize your listing for faster sales.",
    category: "selling",
    icon: FiClock
  },

  // Payment & Billing
  {
    id: 12,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and digital wallets. All payments are processed through our secure payment system with bank-level encryption. We also support financing options through our partner lenders.",
    category: "payment",
    icon: FiCreditCard,
    popular: true
  },
  {
    id: 13,
    question: "Is my payment information secure?",
    answer: "Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed through secure, trusted payment processors.",
    category: "payment",
    icon: FiShield
  },
  {
    id: 14,
    question: "When do I get paid for my car sale?",
    answer: "Payment is processed within 2-3 business days after the buyer confirms receipt of the vehicle. You can choose to receive payment via bank transfer, check, or digital wallet. All transactions are tracked and confirmed.",
    category: "payment",
    icon: FiClock
  },

  // Safety & Security
  {
    id: 15,
    question: "How do you protect against fraud?",
    answer: "We use advanced fraud detection systems, verify all user identities, and monitor transactions for suspicious activity. All sellers undergo background checks, and we provide secure escrow services for high-value transactions.",
    category: "safety",
    icon: FiShield,
    popular: true
  },
  {
    id: 16,
    question: "What if I encounter a problem with a seller?",
    answer: "Our dedicated support team is available 24/7 to help resolve any issues. We have a dispute resolution process and can mediate between buyers and sellers. In rare cases, we can reverse transactions and provide refunds.",
    category: "safety",
    icon: FiAlertCircle
  },
  {
    id: 17,
    question: "Can I see seller reviews and ratings?",
    answer: "Yes! Every seller has a public profile with reviews and ratings from previous buyers. You can see their response rate, average rating, and read detailed reviews to make informed decisions.",
    category: "safety",
    icon: FiUser
  },

  // Support
  {
    id: 18,
    question: "How can I contact customer support?",
    answer: "You can reach us through live chat (available 24/7), email at support@webcars.com, or phone at 1-800-WEBCARS. Our average response time is under 5 minutes for live chat and within 2 hours for email.",
    category: "support",
    icon: FiMessageCircle,
    popular: true
  },
  {
    id: 19,
    question: "Do you offer mobile apps?",
    answer: "Yes! We have native iOS and Android apps available in the App Store and Google Play. The apps include all features of the website plus push notifications for new cars and messages.",
    category: "support",
    icon: FiSettings
  },
  {
    id: 20,
    question: "Can I change or cancel my listing?",
    answer: "Yes, you can edit your listing at any time through your dashboard. You can update photos, change the price, modify descriptions, or temporarily hide your listing. Canceling a listing is free and immediate.",
    category: "support",
    icon: FiSettings
  }
]

export function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularFAQs = faqData.filter(faq => faq.popular)

  return (
    <Container>
      <div className="font-poppins">
        {/* Hero Section */}
        <section className="text-center py-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about buying, selling, and using WebCars. 
            Can't find what you're looking for? Contact our support team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative glass-effect p-2 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      className="input-field pl-12 pr-4 py-4 text-lg w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        {searchTerm === "" && selectedCategory === "all" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Popular Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularFAQs.map((faq, index) => (
                <div key={faq.id} className="card p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-500/20 rounded-lg">
                      <faq.icon className="text-primary-400" size={20} />
                    </div>
                    <span className="text-sm font-semibold text-primary-400">Popular</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/70 text-sm line-clamp-3">{faq.answer}</p>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="text-primary-400 text-sm font-medium mt-4 hover:text-primary-300 transition-colors"
                  >
                    Read full answer →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <category.icon size={18} />
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ List */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">No questions found</h3>
                <p className="text-white/60 mb-8">Try adjusting your search terms or category filter.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  className="btn-primary px-8 py-4"
                >
                  Show All Questions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={faq.id} className="card animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-primary-500/20 rounded-lg flex-shrink-0">
                          <faq.icon className="text-primary-400" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/60">
                              {faqCategories.find(cat => cat.id === faq.category)?.name}
                            </span>
                            {faq.popular && (
                              <span className="text-xs px-2 py-1 bg-primary-500/20 rounded-full text-primary-400">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {openFAQ === faq.id ? (
                        <FiChevronUp className="text-primary-400 flex-shrink-0" size={20} />
                      ) : (
                        <FiChevronDown className="text-white/60 flex-shrink-0" size={20} />
                      )}
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support CTA */}
        <section className="text-center py-16">
          <div className="glass-effect p-12 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you 24/7. Get in touch and we'll get back to you quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 text-lg">
                Contact Support
              </button>
              <button className="btn-secondary px-8 py-4 text-lg">
                Live Chat
              </button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}
