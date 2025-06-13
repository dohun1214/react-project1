import { useSearchParams, Link } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { jobPostContext } from '../contexts/jobPostContext';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { jobPosts } = useContext(jobPostContext);

  const results = useMemo(
    () => jobPosts.filter(post =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    ),
    [jobPosts, keyword]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">🔍 '{keyword}' 검색 결과</h2>
      {results.length ? (
        <ul className="space-y-2">
          {results.map(post => (
            <li key={post.id} className="p-4 border rounded shadow-sm bg-white">
              <Link to={`/recruit/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                {post.company} · {post.region} · {post.time}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default SearchResults;
