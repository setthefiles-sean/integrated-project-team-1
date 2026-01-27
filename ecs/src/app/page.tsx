import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-[#4a4a4a]">
      <Header />

      <main className="flex grow flex-col items-center justify-center p-4">

        <h1 className="text-white text-2xl md:text-3xl text-center mb-8 font-light tracking-wide">
          Welcome to Weyland-Yutani Coorporation<br />
          Employee Claims System
        </h1>

        {/* login area */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
          <h2 className="text-gray-800 text-xl mb-2">Company sign-in</h2>
          <hr className="w-full border-gray-300 mb-8" />

          <div className="w-full space-y-6">
            {/* username field */}
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-600 mb-1">username:</label>
              <input type="text" className="w-full text-gray-700 bg-[#d9d9d9] rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            {/* password field */}
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-600 mb-1">password:</label>
              <input type="text" className="w-full text-gray-700 bg-[#d9d9d9] rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            {/* sign-in button */}
            <div className="flex justify-center pt-2">
              <button className="bg-blue-400 text-gray-700 px-8 py-2 rounded-lg border border-gray-400 hover:bg-blue-500 transition-colors shadow-sm">sign-in</button>
            </div>
          </div>

          {/* admin sign-in link */}
          <button className="mt-12 text-sm text-gray-700 hover:underline">admin sign-in</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
