// // import { SignIn } from '@clerk/nextjs'
// 'use client'

// import * as Clerk from '@clerk/elements/common'
// import * as SignIn from '@clerk/elements/sign-in'
// import Image from 'next/image';

// const LoginPage = () => {
//     return(
//         <div className='h-screen flex items-center justify-center bg-lamaSkyLight'>
//             <SignIn.Root>
//                 <SignIn.Step name='start' className='bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2'>
//                     <h1 className='text-xl font-bold flex items-center gap-2'>
//                         <Image src="/logo.png" alt="logo" width={24} height={24} />
//                         LimeXpin
//                     </h1>
//                     <h2 className='text-gray-400'>Sign in to your account</h2>

//                 <Clerk.GlobalError className='text-sm text-red-400' />
//                 <Clerk.Field name="identifier" className='flex flex-col gap-2'>
//                     <Clerk.Label className='text-xs text-gray-500'>
//                         Username
//                     </Clerk.Label>

//                     <Clerk.Input
//                      type="text"
//                       required
//                       className='p-2 rounded-md ring-1 ring-gray-300' />
//                     <Clerk.FieldError className='text-sm text-red-400' />
//                 </Clerk.Field>
//                 <Clerk.Field name="password" className='flex flex-col gap-2'>
//                     <Clerk.Label className='text-xs text-gray-500'>Password</Clerk.Label>
//                     <Clerk.Input
//                      type="password" 
//                      required
//                       className='p-2 rounded-md ring-1 ring-gray-300' />
//                     <Clerk.FieldError className='text-sm text-red-400' />
//                 </Clerk.Field>
//                  <SignIn.Action submit className='bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]'>Sign In</SignIn.Action>
//                 </SignIn.Step>
//             </SignIn.Root>
//         </div>
//     );
// };

// export default LoginPage;


"use client";

import { Suspense, useEffect } from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";



const LoginPage = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if(role) {
        router.push(`/${role}`)
    }
      
  }, [user, router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-lamaSkyLight">
      <Suspense fallback={<div className="text-gray-600">Loading sign-in…</div>}>
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200"
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="logo" width={36} height={36} />
                <h1 className="text-2xl font-semibold text-gray-800">LimeXpin</h1>
              </div>
              <p className="text-gray-500 text-sm">Sign in to your account</p>
            </div>

            {/* Global form error (wrong password, etc.) */}
            <Clerk.GlobalError className="text-sm text-red-600 text-center" />

            {/* Identifier */}
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Username or Email
              </Clerk.Label>
              {/* remove `required` so Clerk can run its own validation */}
              <Clerk.Input
                type="text"
                placeholder="you@example.com"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800 placeholder:text-gray-400"
              />
              <Clerk.FieldError className="text-xs text-red-600" />
            </Clerk.Field>

            {/* Password */}
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Password
                </Clerk.Label>
                <a href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot?
                </a>
              </div>
              {/* remove `required` so Clerk can run its own validation */}
              <Clerk.Input
                type="password"
                placeholder="••••••••"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800 placeholder:text-gray-400"
              />
              <Clerk.FieldError className="text-xs text-red-600" />
            </Clerk.Field>

            {/* Submit */}
            <SignIn.Action
              submit
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-medium transition-all duration-200"
            >
              Sign In
            </SignIn.Action>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="/sign-up" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </SignIn.Step>
        </SignIn.Root>
      </Suspense>
    </div>
  );
}

export default LoginPage;