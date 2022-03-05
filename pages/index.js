import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen p-7">
      <header className="flex justify-between items-center mb-10">
        {/* Header left */}
        <div>
          <img src="/logo.svg" alt="trello logo" />
        </div>

        {/* Header right */}
        <div className="flex items-center gap-x-4">
          <Link href="/login">
            <button className="text-blue-600 font-bold">Log in</button>
          </Link>
          <Link href="/signup">
            <button className="bg-blue-600 p-2 rounded text-white font-bold">
              Sign up
            </button>
          </Link>
        </div>
      </header>

      <main className="lg:flex lg:items-center lg:h-5/6">
        <div className="lg:flex lg:flex-col">
          <p className="text-sky-900 font-bold text-4xl text-center mb-10 max-w-md mx-auto lg:max-w-xl lg:text-left">
            Trello helps teams move work forward.
          </p>
          <p className="text-sky-900 text-xl text-center max-w-xs mx-auto lg:max-w-xl lg:text-left">
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique,
            accomplish it all with Trello.
          </p>
        </div>
        <img
          src="/home-stock.png"
          alt="background image"
          className="w-56 mx-auto mt-10 lg:w-96"
        />
      </main>
    </div>
  );
}
