export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Payment Successful!</h1>
        <p className="text-gray-300 mb-6">
          Thank you for upgrading to the Pro Plan. Your payment was processed successfully.
        </p>
        <a href="/" className="text-gray-400 hover:text-gray-300 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  )
}
