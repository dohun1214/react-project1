import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Review from '../../components/Review';
import Button from '../../components/Button';
import { communityContext } from '../../contexts/communityContext';

const CommunityBoard = () => {
  const { communityPosts, communityPostDispatch } = useContext(communityContext);

  const handleDeletePost = (id) => {
    communityPostDispatch({ type: 'DELETE_POSTS', payload: id });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">커뮤니티</h1>

      <Link to="/communitynew">
        <Button className="bg-[#7989F6] text-white hover:bg-[#4d5de9] mb-4">
          새 글 작성
        </Button>
      </Link>

      <div className="space-y-4">
        {communityPosts.length === 0 ? (
          <p className="text-gray-500">아직 작성된 후기가 없습니다.</p>
        ) : (
            communityPosts.map((post) => (
            <Review key={post.id} post={post} onDelete={handleDeletePost} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityBoard;
