// Footer Section
const Footer = () => (
    <footer className="bg-gray-950 py-12 border-t border-gray-800">  {/* Increased padding */}
      <div className="container mx-auto px-4 text-center text-gray-400 text-lg">  {/* Refined text */}
        &copy; {new Date().getFullYear()} Lawyex. All rights reserved. |{" "}
        <a href="#" className="text-primary hover:underline transition-colors">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="text-primary hover:underline transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );

  export default Footer;