export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-4">Payment Cancelled</h1>
        <p className="text-gray-300 mb-6">
          Your payment was not completed. You can try again or contact support if you need help.
        </p>
        <a href="/pricing" className="text-gray-400 hover:text-gray-300 hover:underline">
          Back to Pricing
        </a>
      </div>
    </div>
  )
}
    