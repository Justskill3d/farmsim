import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText, Mail, Phone, MapPin, Building, User, AlertCircle } from 'lucide-react';

const Impressum: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Game
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center mb-8">
            <FileText size={24} className="text-amber-600 mr-3" />
            <h1 className="text-3xl font-bold">Impressum</h1>
          </div>

          <div className="prose prose-amber max-w-none space-y-6 text-gray-700">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
              <AlertCircle size={20} className="text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                This page contains placeholder information. Please replace all
                placeholder fields (marked with square brackets) with your real
                details before publishing — German law requires accurate and
                complete information here.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Building className="text-amber-500 mr-2" size={20} />
                Angaben gemäß § 5 DDG
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-1">
                <p><span className="font-medium">[Your Full Name]</span></p>
                <p><span className="font-medium">[Street Address]</span></p>
                <p><span className="font-medium">[Postal Code] [City]</span></p>
                <p><span className="font-medium">[Country — e.g. Germany]</span></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Mail className="text-amber-500 mr-2" size={20} />
                Kontakt
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
                <p className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  <span>E-Mail: [your-email@example.com]</span>
                </p>
                <p className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-500" />
                  <span>Telefon: [+49 ...]</span>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <MapPin className="text-amber-500 mr-2" size={20} />
                Umsatzsteuer-ID
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                </p>
                <p className="font-medium mt-1">[DE000000000 — or remove if not applicable]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <User className="text-amber-500 mr-2" size={20} />
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p><span className="font-medium">[Your Full Name]</span></p>
                <p>[Same address as above]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Haftungsausschluss</h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Haftung für Inhalte</h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
                    Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                    verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                    gespeicherte fremde Informationen zu überwachen oder nach
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                    hinweisen.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält ggf. Links zu externen Webseiten
                    Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte auch keine
                    Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
                    stets der jeweilige Anbieter oder Betreiber der Seiten
                    verantwortlich.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke
                    auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
