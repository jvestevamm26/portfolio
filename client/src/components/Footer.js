import { useEffect, useState } from "react";

function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // updates every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footer-line">
      <span>© {new Date().getFullYear()} My Portfolio</span>

      {/* Date & Time (bottom right) */}
      <span className="footer-time">
        {time.toLocaleDateString()} | {time.toLocaleTimeString()}
      </span>
    </div>
  );
}

export default Footer;