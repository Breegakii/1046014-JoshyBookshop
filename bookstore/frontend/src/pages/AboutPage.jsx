import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About BookShop</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted destination for quality books and exceptional reading experiences.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, BookShop began as a small neighborhood bookstore with a passion for connecting readers with great literature. 
                </p>
                <p className="text-gray-600 mb-4">
                  What started as a single shelf of hand-picked titles has grown into a thriving online community of book lovers, with thousands of titles across all genres.
                </p>
                <p className="text-gray-600">
                  We're proud to have served over 50,000 satisfied customers and counting.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Bookstore interior"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At BookShop, we believe in the transformative power of reading. Our mission is to:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Curate a diverse collection of quality books for all ages and interests</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Provide exceptional customer service with personalized recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Support local authors and independent publishers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Foster a love of reading in our community</span>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Jackson Mugambi",
                  role: "Founder & CEO",
                  bio: "Book enthusiast with 15+ years in the publishing industry",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                },
                {
                  name: "Brenda Kirimi",
                  role: "Head of Operations",
                  bio: "Ensures your books arrive quickly and in perfect condition",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                },
                {
                  name: "Emily Wanjiru",
                  role: "Customer Experience",
                  bio: "Loves matching readers with their perfect next read",
                  image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="rounded-full w-24 h-24 mx-auto mb-4 overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 text-center mb-2">{member.role}</p>
                  <p className="text-gray-600 text-center text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Our Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;