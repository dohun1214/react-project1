import { useState } from 'react';

function Post({ company, title, region, time, pay, date }) {
  const [wished, setWished] = useState(false);
  const toggleWish = () => setWished(prev => !prev);

  return (
    <div className="border-t py-4 grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] items-center gap-x-4 px-2 text-gray-600">
      <button onClick={toggleWish} className={`text-xl transition-transform duration-150 ${wished ? 'text-yellow-400' : 'text-gray-400'}`}>
        {wished ? '★' : '☆'}
      </button>

      <div className="font-medium">{company}</div>
      <div>{title}</div>
      <div>{region}</div>
      <div>{time}</div>
      <div className="text-right">
        <span className="font-semibold text-gray-700">{pay}</span>
        <span className="ml-2 text-gray-400 text-sm">{date}</span>
      </div>
    </div>
  );
}

export default Post;
