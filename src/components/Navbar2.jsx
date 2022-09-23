import React from 'react';
import { NavLink } from 'react-router-dom';
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
export default function NavBarUser() {
  const { logOutUser } = useContext(AuthContext);
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-16 w-auto lg:hidden"
                    src="https://res.cloudinary.com/josepcortes/image/upload/v1663947482/098d3393-f106-4b22-9b16-eb367aa37d3f_mkgmyw.jpg"
                    alt="Red Devil"
                  />
                  <img
                    className="hidden h-16 w-auto lg:block"
                    src="https://res.cloudinary.com/josepcortes/image/upload/v1663947482/098d3393-f106-4b22-9b16-eb367aa37d3f_mkgmyw.jpg"
                    alt="Red Devil"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink
                    to='/training'
                    className= {(element) => element.isActive ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" }
                  >
                    ENTRENO
                  </NavLink>
                  <NavLink
                    to='/event'
                    className={(element) => element.isActive ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" }
                  >
                    EVENTO
                  </NavLink>
                  <button
                    onClick={() => logOutUser()}
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as="a"
                href="/training"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                ENTRENO
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/event"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                EVENTO
              </Disclosure.Button>
              <button
                    onClick={() => logOutUser()}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  >
                    LOGOUT
                  </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}