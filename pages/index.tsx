import Head from "next/head"
import { useContext, useState } from "react"
import { LocalContext } from "utils/Context"

const Index = () => {
  const local = useContext(LocalContext)
  const [copied, setCopied] = useState(false)
  return (
    <>
      <Head>
        <title>Disposable Email</title>
      </Head>
      <main className="max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6 flex justify-between">
            <span className="text-gray-500">
              {local + "@" + process.env.NEXT_PUBLIC_URL}
            </span>
            <button
              onClick={() =>
                navigator.clipboard
                  .writeText(local + "@" + process.env.NEXT_PUBLIC_URL)
                  .then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1000)
                  })
              }
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
            >
              {copied ? (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Index
