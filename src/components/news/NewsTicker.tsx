
import { breakingNews } from "@/data/newsData";

const NewsTicker = () => {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {breakingNews.map((news, index) => (
          <div key={index} className="ticker-item">
            {news}
          </div>
        ))}
        {/* Duplicate the items to ensure continuous flow */}
        {breakingNews.map((news, index) => (
          <div key={`dup-${index}`} className="ticker-item">
            {news}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
