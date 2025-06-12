import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, SalaryCalculatorModal } from '../../components';
import { jobPostContext } from '../../contexts'

const RecruitDetail = () => {
  const { id } = useParams();
  const { jobPosts } = useContext(jobPostContext);
  const nav = useNavigate();
  const post = jobPosts.find((p) => p.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!post) return <p>존재하지 않는 공고입니다.</p>;

  const time = new Date(post.createdAt).toLocaleString();

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <Button onClick={() => nav('/recruit')}>← 목록</Button>
      </div>
      <div className="text-sm text-gray-500">
        작성자: {post.author} | 작성일: {time}
      </div>
      <div className="border rounded p-4 space-y-2">
        <div>근무시간: {post.time}</div>
        <div>근무요일: {post.days}</div>
        <div>지역: {post.region}</div>
        <div>급여: {parseInt(post.pay).toLocaleString()}</div>
        <div>카테고리: {post.category}</div>
        <div>우대사항: {post.preference}</div>
      </div>
      <div className="whitespace-pre-wrap border rounded p-4">
        {post.content}
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
        onClick={openModal}
      >
        급여 계산기
      </button>

      {/* 조건부 렌더링으로 수정 */}
      {isModalOpen && (
        <SalaryCalculatorModal
          isOpen={isModalOpen}
          onClose={closeModal}
          {...post}
        />
      )}

      <div className="flex space-x-4">
        <Button onClick={() => nav(`/recruit/edit/${post.id}`)}>수정</Button>
        <Link to="/recruit">
          <Button className="bg-gray-300">목록</Button>
        </Link>
      </div>
    </div>
  );
};

export default RecruitDetail;