import React, { useState, useEffect } from 'react';
import Container from '../Components/Shared/Container';

const TermsAndConditions = () => {
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
              Terms and Conditions
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
              {/* Section 1 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  1. Acceptance of Terms
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  By accessing and using ScholarStream, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  2. Use License
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Permission is granted to temporarily download one copy of ScholarStream materials for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  3. User Accounts
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>You must be at least 16 years old to use this service</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You agree to notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  4. Scholarship Applications
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ScholarStream serves as a platform connecting students with scholarship opportunities. We do not guarantee:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Approval of any scholarship application</li>
                  <li>The accuracy of all scholarship information</li>
                  <li>The availability of scholarships at the time of application</li>
                  <li>Refunds for application fees paid to third parties</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  5. Payment Terms
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Some scholarships may require application fees. These fees are processed securely through our payment partners. 
                  All fees are non-refundable unless explicitly stated otherwise. You are responsible for any applicable taxes.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  6. Privacy and Data Protection
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                  to understand our practices regarding the collection and use of your personal information.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  7. Prohibited Uses
                </h2>
                <p className={`leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  You may not use our service:
                </p>
                <ul className={`list-disc list-inside space-y-2 ml-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  8. Disclaimer
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                  this Company excludes all representations, warranties, conditions and terms whether express or implied, 
                  statutory or otherwise.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  9. Limitation of Liability
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  In no event shall ScholarStream or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                  the materials on ScholarStream's website.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  10. Changes to Terms
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ScholarStream may revise these terms of service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              {/* Contact Section */}
              <section className={`p-6 rounded-lg border ${
                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'
              }`}>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  Contact Information
                </h2>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <div className={`mt-4 space-y-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <p><strong>Email:</strong> legal@scholarstream.com</p>
                  <p><strong>Address:</strong> ScholarStream Legal Department</p>
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

export default TermsAndConditions;