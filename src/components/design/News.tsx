"use client"

import { toast } from "sonner";

const News = () => {
    const handleNewsEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTimeout(() => {
            toast.success("You've successfully subscribed to our newsletter");
          }, 1000);
    }

    return (
  
<div className="mx-auto max-w-7xl  my-[8vh] lg:px-8">
  <div className=" overflow-hidden bg-white py-16 shadow-2xl rounded-lg sm:px-24 ">
    <h2 className="mx-auto max-w-2xl text-center md:text-2xl lg:text-3xl font-bold tracking-tight  text-xl">
      Keep Updated
    </h2>
    <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 ">
      Keep pace with Glamora advancements! Join our mailing list for
      selective, noteworthy updates.
    </p>
    <form onSubmit={ handleNewsEmail} className="mx-auto mt-10 flex max-w-md gap-x-4">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        className="flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white  shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Notify me
      </button>
    </form>

  </div>
</div>
    )
}
export default News;