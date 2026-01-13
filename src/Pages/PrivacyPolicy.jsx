import React, { useState, useEffect } from 'react';
import Container from '../Components/Shared/Container';

const PrivacyPolicy = () => {
  const [isDark, setIsDark] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  return (
    <Container>
      <div className={`min-h-screen py-12 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className={`text-center mb-12 p-8 rounded-xl shadow-lg transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
              : 'bg-white shadow-gray-200/50'
          }`}>
            <h1 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-blue-400' : 'text-blue-900'
            }`}>
              Privacy Policy
            </h1>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className={`rounded-xl shadow-lg p-8 transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
              : 'bg-white shadow-gray-200/50'
          }`}>
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  Introduction
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ScholarStream ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you visit our website and use our services. 
                  Please read this privacy policy carefully.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  1. Information We Collect
                </h2>
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Personal Information
                </h3>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Register for an account</li>
                  <li>Apply for scholarships</li>
                  <li>Contact us with inquiries</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Types of Personal Information
                </h3>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Educational background and academic records</li>
                  <li>Financial information for scholarship applications</li>
                  <li>Profile photos and personal statements</li>
                  <li>Payment information (processed securely by third parties)</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  2. How We Use Your Information
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We use the information we collect to:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process scholarship applications and payments</li>
                  <li>Communicate with you about your account and applications</li>
                  <li>Send you updates about new scholarship opportunities</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  3. Information Sharing and Disclosure
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We may share your information in the following situations:
                </p>
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  With Scholarship Providers
                </h3>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  When you apply for scholarships, we share your application information with the relevant scholarship providers 
                  and educational institutions.
                </p>

                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  With Service Providers
                </h3>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We may share your information with third-party service providers who perform services on our behalf, 
                  such as payment processing, data analysis, and customer service.
                </p>

                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Legal Requirements
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  4. Data Security
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We implement appropriate technical and organizational security measures to protect your personal information against:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Unauthorized access, alteration, disclosure, or destruction</li>
                  <li>Accidental loss or damage</li>
                  <li>Unlawful processing</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  5. Data Retention
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need 
                  your personal information, we will securely delete or anonymize it.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  6. Your Privacy Rights
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  7. Cookies and Tracking Technologies
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality and performance</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  8. Third-Party Links
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                  or content of these external sites. We encourage you to review the privacy policies of any third-party 
                  websites you visit.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  9. Children's Privacy
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Our services are not intended for children under 16 years of age. We do not knowingly collect personal 
                  information from children under 16. If we become aware that we have collected personal information from 
                  a child under 16, we will take steps to delete such information.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  10. International Data Transfers
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your information may be transferred to and processed in countries other than your own. We ensure that 
                  such transfers are conducted in accordance with applicable data protection laws and that appropriate 
                  safeguards are in place.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  11. Changes to This Privacy Policy
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this 
                  Privacy Policy periodically.
                </p>
              </section>

              {/* Contact Section */}
              <section className={`p-6 rounded-lg border ${
                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'
              }`}>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  Contact Us
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className={`space-y-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <p><strong>Email:</strong> privacy@scholarstream.com</p>
                  <p><strong>Address:</strong> ScholarStream Privacy Office</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;