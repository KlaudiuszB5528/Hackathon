import Image from 'next/image'
import hero from '../public/landing.svg'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="w-full h-full flex flex-col py-10 px-6 sm:py-16 sm:px-12 lg:flex-row max-w-screen-xl m-auto">
      <div className="flex flex-col sm:flex-row items-center lg:flex-col lg:items-start lg:justify-center lg:w-1/2">
        <div className="w-full">
          <h1 className="font-extrabold text-2xl w-full lg:text-4xl">
            Your hub for field games
          </h1>
          <p className="text-sm pt-8 pb-6 lg:text-base">
            Join hundreds of participants who use our platform and get new ideas for your new field game
          </p>
        </div>
        <div className="flex flex-row gap-3 md:gap-5">
          <Link
            href="/dashboard"
            className="max-w-fit h-fit flex justify-center rounded-md bg-fuchsia-700 px-5 py-3 my-6 text-sm sm:text-base font-semibold leading-6 text-white shadow-sm hover:bg-fuchsia-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Image
        src={hero}
        alt="Landing page image"
        className="w-full pt-10 sm:pt-16 lg:pl-12 lg:w-1/2"
      />
    </main>
  );
}
