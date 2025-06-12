
const Post = ({ company, title, region, time, pay, createdAt }) => {
  return (
    <div className="flex justify-between items-center px-2 text-gray-700">
      <div className="flex-1">
        <p className="text-sm text-gray-500">{company}</p>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">
          {region} · {time}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{parseInt(pay).toLocaleString()}</p>
        <p className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default Post;
