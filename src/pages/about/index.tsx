import { useState } from "react"
import Container from "../../components/container"
import { Link } from "react-router-dom"
import { 
  FiUsers, 
  FiAward, 
  FiShield, 
  FiHeart, 
  FiTarget, 
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiCheckCircle
} from "react-icons/fi"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How do I list my car for sale?",
    answer: "Simply create an account, go to your dashboard, and click 'Add New Car'. Fill in the details, upload photos, and your listing will be live within minutes. We verify all listings to ensure quality and authenticity."
  },
  {
    id: 2,
    question: "Are all cars verified before listing?",
    answer: "Yes! Every car listed on our platform goes through our comprehensive verification process. We check vehicle history, condition, and seller credentials to ensure you're getting accurate information."
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We support all major payment methods including credit cards, bank transfers, and secure escrow services. All transactions are protected by our buyer protection program."
  },
  {
    id: 4,
    question: "Can I schedule a test drive?",
    answer: "Absolutely! You can contact sellers directly through our platform to schedule test drives. We recommend meeting in public places and bringing a friend for safety."
  },
  {
    id: 5,
    question: "What if I'm not satisfied with my purchase?",
    answer: "We offer a 7-day satisfaction guarantee on all purchases. If you're not completely satisfied, contact our support team within 7 days for a full refund or exchange."
  },
  {
    id: 6,
    question: "How do you ensure seller reliability?",
    answer: "All sellers undergo a thorough verification process including identity verification, background checks, and customer feedback reviews. We also maintain a rating system to help you choose trustworthy sellers."
  }
]

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    initials: "SJ",
    bio: "Passionate about revolutionizing the car buying experience with technology and trust."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    initials: "MC",
    bio: "Leading our technical innovation to create seamless, secure car transactions."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    initials: "ER",
    bio: "Ensuring every customer interaction exceeds expectations and builds lasting relationships."
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    initials: "DK",
    bio: "Building the future of automotive commerce with cutting-edge technology solutions."
  }
]

export function About() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <Container>
      <div className="font-poppins">
        {/* Hero Section */}
        <section className="text-center py-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
            About <span className="text-gradient">WebCars</span>
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the way people buy and sell cars, making it safer, 
            easier, and more transparent than ever before.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass-effect p-8 rounded-2xl animate-slide-in-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <FiTarget className="text-primary-400" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To create the most trusted and user-friendly platform for buying and selling cars, 
              where every transaction is secure, transparent, and satisfying for both buyers and sellers.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-2xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary-500/20 rounded-xl">
                <FiTrendingUp className="text-secondary-400" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the global leader in automotive e-commerce, transforming how people 
              discover, evaluate, and purchase their dream cars through innovative technology.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiShield,
                title: "Trust & Safety",
                description: "Every transaction is protected by our comprehensive security measures and verification processes."
              },
              {
                icon: FiHeart,
                title: "Customer First",
                description: "We prioritize our customers' needs and satisfaction in every decision we make."
              },
              {
                icon: FiAward,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from technology to customer service."
              },
              {
                icon: FiUsers,
                title: "Community",
                description: "We build strong relationships within our community of car enthusiasts and professionals."
              }
            ].map((value, index) => (
              <div key={index} className="card p-6 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-4 bg-primary-500/20 rounded-xl w-fit mx-auto mb-4">
                  <value.icon className="text-primary-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-6 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">{member.initials}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-white" size={16} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers", icon: FiUsers },
              { number: "25K+", label: "Cars Sold", icon: FiAward },
              { number: "99.9%", label: "Uptime", icon: FiShield },
              { number: "4.9/5", label: "Customer Rating", icon: FiStar }
            ].map((stat, index) => (
              <div key={index} className="glass-effect p-8 rounded-2xl text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-3 bg-primary-500/20 rounded-xl w-fit mx-auto mb-4">
                  <stat.icon className="text-primary-400" size={24} />
                </div>
                <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={faq.id} className="card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFAQ === faq.id ? (
                    <FiChevronUp className="text-gray-600 flex-shrink-0" size={20} />
                  ) : (
                    <FiChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                  )}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <div className="glass-effect p-12 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their perfect vehicle on WebCars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary px-8 py-4 text-lg text-center">
                Browse Cars
              </Link>
              <Link to="/dashboard" className="btn-secondary px-8 py-4 text-lg text-center">
                List Your Car
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}
