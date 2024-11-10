import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Comp/Nav";
import CryptoTable from "./Comp/CryptoTable";
import Left from "./Comp/Leftover";
import Foot from "./Comp/Fotter";
import News from "./Comp/News";
import New from "./Comp/New";
import CookiePolicy from "./Footer/cookiepolicy";
import Termsofuse from "./Footer/termsofuse";
import AboutUs from "./Footer/aboutus";
import PrivacyPolicy from "./Footer/privacypolicy";
import Disclaimer from "./Footer/disclaimer";
import FAQ from "./Footer/faq";
import CareerForm from "./Forms/Career";
import ContactSupport from "./Forms/ContactSupport";
import HireBlockchainDeveloper from "./Forms/HireBlockchainDeveloper";
import Consulting from "./Forms/Consulting";
import CryptoDetail from "./Comp/CryptoDetail";
import Exchange from "./Comp/ExchangeInfo";
import HowToBuy from "./Comp/howtobuy";
import Exchanges from "./Exchange/exchange";
import NotFound from "./Comp/NotFound";
import CanonicalLink from "./Comp/CanonicalLink";
import RobotsTags from "./Comp/RobotsTags"; // Import the RobotsTags component

function Home() {
  return (
    <>
      <New />
      <CryptoTable />
      <Left />
    </>
  );
}

function App() {
  const [showSecondNavbar, setShowSecondNavbar] = useState(false);

  const toggleSecondNavbar = () => {
    setShowSecondNavbar(!showSecondNavbar);
  };

  return (
    <Router>
      <div>
        <CanonicalLink /> {/* Add CanonicalLink here */}
        <RobotsTags index={true} follow={true} /> {/* Apply RobotsTags globally */}
        <Nav showSecondNavbar={showSecondNavbar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/howtobuy" element={<HowToBuy />} />
          <Route path="/Exchange" element={<Exchange />} />
          <Route path="/cookiepolicy" element={<CookiePolicy />} />
          <Route path="/termsofuse" element={<Termsofuse />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Career" element={<CareerForm />} />
          <Route path="/ContactSupport" element={<ContactSupport />} />
          <Route path="/HireBlockchainDeveloper" element={<HireBlockchainDeveloper />} />
          <Route path="/Consulting" element={<Consulting />} />
          <Route path="/detail/:id" element={<CryptoDetail toggleSecondNavbar={toggleSecondNavbar} />} />
          <Route path="/demo" element={<Exchanges />} />

          {/* Catch-all route for 404 - Place this at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Foot />
      </div>
    </Router>
  );
}

export default App;
