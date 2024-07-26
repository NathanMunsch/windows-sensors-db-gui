'use client';

import {useEffect} from 'react';
import {statsStore} from "@/store/statsStore";
import {dateStore} from "@/store/dateStore";
import {computerStore} from "@/store/computerStore";
import {hardwareStore} from "@/store/hardwareStore";

export default function Header() {
    const {
        formatedDateText,
        dateId,
        fetchLatestDateId,
        fetchPreviousDate,
        fetchNextDate
    } = dateStore();

    const {
        fetchComputers,
        computers
    } = computerStore();

    const {
        fetchHardware,
        hardware
    } = hardwareStore();

    const {
        setComputerId,
        computerId,
        setHardwareId,
        hardwareId,
        setDateId,
        isReloading,
    } = statsStore();

    useEffect(() => {
        fetchLatestDateId();
        fetchComputers();
        fetchHardware();
    }, []);

    return (
        <header className="flex align-baseline flex-row justify-center gap-3 mt-3 mb-3">
            <button
                id="dropdownComputerButton"
                data-dropdown-toggle="dropdownComputer"
                data-dropdown-placement="bottom"
                className="md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                disabled={isReloading}
            >
                Computer
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div
                id="dropdownComputer"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownComputerButton"
                >
                    {computers.map((computer, index) => (
                        <li key={index}>
                            <a
                                onClick={() => {
                                    setComputerId(computer.Id);
                                }}
                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${computer.Id === computerId ? 'font-bold text-gray-400' : ''}`}
                            >
                                {computer.Name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                id="dropdownHardwareButton"
                data-dropdown-toggle="dropdownHardware"
                data-dropdown-placement="bottom"
                className="md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                disabled={isReloading}
            >
                Hardware
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div
                id="dropdownHardware"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHardwareButton"
                >
                    {hardware.map((hardware, index) => (
                        <li key={index}>
                            <a
                                onClick={() => {
                                    setHardwareId(hardware.Id);
                                }}
                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${hardware.Id === hardwareId ? 'font-bold text-gray-400' : ''}`}
                            >
                                {hardware.Name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                className="ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                    setDateId(dateId);
                    fetchPreviousDate();
                }}
                disabled={isReloading}
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0L5 1m-4 4L5 9"
                    />
                </svg>
                <span className="sr-only">Previous</span>
            </button>

            <input
                type="text"
                id="dateIndicator"
                aria-label="Date Indicator"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formatedDateText}
                disabled
                readOnly
            />

            <button
                type="button"
                className="mr-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                    setDateId(dateId);
                    fetchNextDate();
                }}
                disabled={isReloading}
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
                <span className="sr-only">Next</span>
            </button>

            <button
                disabled
                type="button"
                className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:focus:ring-blue-800 inline-flex items-center"
            >
                <svg
                    aria-hidden="true"
                    role="status"
                    className={`inline w-4 h-4 me-3 text-white animate-spin ${isReloading ? '' : 'hidden'}`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                    />
                </svg>
                {isReloading ? 'Reloading...' : 'Loaded successfully'}
            </button>
        </header>
    );
}
