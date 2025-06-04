import { useState, useEffect } from 'react';
import Button from './Button';

const Editor = ({ initText = '', onSubmit, label = '저장' }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(initText);
  }, [initText]);

  const handleClick = () => {
    if (!text.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    onSubmit(text);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-40 border rounded p-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="알바 후기를 입력해주세요."
      />
      <Button onClick={handleClick} className="bg-[#7989F6] text-white hover:bg-[#4d5de9]">
        {label}
      </Button>
    </div>
  );
};

export default Editor;
