export default function Contact(){
  return (
    <div className="max-w-xl bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <input className="w-full border p-3 mb-4" placeholder="Name" />
      <input className="w-full border p-3 mb-4" placeholder="Email" />
      <textarea className="w-full border p-3 mb-4" placeholder="Message" />
      <button className="bg-green-600 text-white px-6 py-2 rounded">
        Send
      </button>
    </div>
  )
}
