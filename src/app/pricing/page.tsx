"use client"

import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const page = () => {
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionId = localStorage.getItem("stripeSessionId")
      if (sessionId) {
        setPurchased(true)
      }
    }
  }, [])

  const handleCheckout = async () => {
    setLoading(true)
    const stripe = await stripePromise
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
    })
    const data = await res.json()
    localStorage.setItem("stripeSessionId", data.id)
    setPurchased(true)
    const result = await stripe?.redirectToCheckout({
      sessionId: data.id,
    })
    if (result?.error) {
      console.error(result.error.message)
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-center p-6">
        <div className="bg-black-800 rounded-2xl shadow-2xl border-2 border-gray-700 p-6 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-gray-100 mb-2">stripe</div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Upgrade to Pro Plan</h2>
            <p className="text-gray-400">Get access to premium features and unlimited usage</p>
          </div>
          <div className="border-2 border-gray-600 rounded-xl p-6 mb-6 bg-gray-700">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Pro Plan</h3>
              <div className="text-3xl font-bold text-gray-300 mb-2">$10</div>
              <p className="text-gray-400 text-sm mb-4">per month</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited API calls
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Custom integrations
                </li>
              </ul>
            </div>
          </div>
          <button
            onClick={async () => { handleCheckout() }}
            className="w-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            disabled={purchased || loading}
          >
            {purchased ? (
              "Purchased"
            ) : loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Subscribe to Pro Plan"
            )}
          </button>
          <p className="text-center text-gray-400 text-xs mt-4">Secure payment powered by Stripe</p>
        </div>
      </div>
    </div>
  )
}

export default page
