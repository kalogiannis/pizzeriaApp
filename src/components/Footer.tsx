import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-10 transition-colors">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        {/* <span className="text-3xl text-orange-500 font-bold tracking-tight">
          Pizzaro.com
        </span> */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          Pizzaro.com
        </Link>
        <span className="text-muted-foreground font-medium tracking-tight flex gap-6">
          <span className="hover:text-foreground cursor-pointer transition-colors">
            Privacy Policy
          </span>
          <span className="hover:text-foreground cursor-pointer transition-colors">
            Terms of Service
          </span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;