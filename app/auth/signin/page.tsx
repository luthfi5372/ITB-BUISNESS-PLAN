'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign In to MindMate+</h1>
      <button
        onClick={() => signIn('google')}
        className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
      >
        Continue with Google
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Or use email/password (coming soon)
      </p>
    </div>
  )
}
