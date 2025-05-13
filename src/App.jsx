import './App.css'


function App() {

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white md:p-8 lg:p-10">
        <h3 className="text-xl font-bold mb-4">제목</h3>
        <p className="text-gray-600 dark:text-gray-300">내용</p>
      </div>
      <label class="has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200">
        Google Pay
        <input type="radio" class="checked:border-indigo-500 ..." />
      </label>
    </>
  )
}

export default App
