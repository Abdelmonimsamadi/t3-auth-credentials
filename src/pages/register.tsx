import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { type FormEventHandler } from "react";
import { trpc } from "../utils/trpc";

const Register: NextPage = () => {
  const { mutateAsync } = trpc.user.register.useMutation();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await mutateAsync({
      email,
      password,
    });
    signIn("credentials", { email, password, callbackUrl: "/" });
  };
  return (
    <div className="">
      {" "}
      <div className="mx-auto w-1/2 max-w-xl p-8 lg:w-1/2">
        {" "}
        <div className="rounded-t-lg bg-white p-8">
          {" "}
          <p className="text-center text-sm font-light text-gray-400">
            sign up with
          </p>{" "}
          <div>
            {" "}
            <div className="mt-3 flex items-center justify-center space-x-4">
              {" "}
              <button className="flex transform items-center rounded border border-transparent bg-white py-2 px-4 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover:bg-gray-100 hover:text-gray-700 hover:shadow-lg">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="mr-3 h-6 w-6"
                >
                  {" "}
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />{" "}
                </svg>{" "}
                Discord{" "}
              </button>{" "}
              <button className="flex transform items-center rounded border border-transparent bg-white py-2 px-4 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover:bg-gray-100 hover:text-gray-700 hover:shadow-lg">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-6 w-6"
                  viewBox="0 0 48 48"
                >
                  {" "}
                  <path
                    fill="#fbc02d"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />{" "}
                  <path
                    fill="#e53935"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />{" "}
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />{" "}
                  <path
                    fill="#1565c0"
                    d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />{" "}
                </svg>{" "}
                Google{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="rounded-b-lg bg-gray-100 py-12 px-4 lg:px-24">
          {" "}
          <p className="text-center text-sm font-light text-gray-500">
            {" "}
            Or sign up with credentials{" "}
          </p>{" "}
          <form className="mt-6" onSubmit={handleSubmit}>
            {" "}
            <div className="relative">
              {" "}
              <input
                className="focus:shadow-outline w-full appearance-none rounded-md border border-gray-100 py-3  pl-12  leading-tight text-gray-600 shadow-sm transition focus:placeholder-gray-600 focus:shadow-md focus:outline-none focus:ring-gray-600"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
              />{" "}
              <div className="absolute inset-y-0 left-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-7 w-7 p-1 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative mt-3">
              {" "}
              <input
                className="focus:shadow-outline w-full appearance-none rounded-md border border-gray-100 py-3  pl-12  leading-tight text-gray-600 shadow-sm transition focus:placeholder-gray-600 focus:shadow-md focus:outline-none focus:ring-gray-600"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
              />{" "}
              <div className="absolute inset-y-0 left-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-7 w-7 p-1 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-4 flex items-center text-gray-500">
              {" "}
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="mr-3"
              />{" "}
              <label htmlFor="remember">Remember me</label>{" "}
            </div>{" "}
            <Link href="/login" className="mt-2 block">
              Already have an account sign in?
            </Link>
            <div className="mt-8 flex items-center justify-center">
              {" "}
              <button
                className="transform rounded bg-indigo-500 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg"
                type="submit"
              >
                {" "}
                sign up{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Register;
