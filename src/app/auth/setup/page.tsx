
"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '../../../../public/icon.png'
import Image from 'next/image'
import { showError, showSuccess } from '@/Components/toast'

export default function Setup() {

    const subjects = [
        [
            'Select a subject',
            'Ancient Indian History',
            'Archeology',
            'Anthropology',
            'Arabic',
            'Defence Studies',
            'English',
            'Geography',
            'Hindi',
            'Urdu',
            'Home Science',
            'Medieval and Modern History',
            'Persian',
            'Physical Education',
            'Political Science',
            'Public Administration',
            'Sociology',
            'Western History',
            'Economics',
            'Asian Culture',
            'Education'],
        [
            'Select a subject',
            'Biochemistry',
            'Botany',
            'Chemistry',
            'Computer Science',
            'Geology',
            'Mathematics',
            'Astronomy',
            'Physics',
            'Statistics',
            'Zoology'],
        [
            'Select a subject',
            'Taxation',
            'Accountancy',
            'Business Management',
            'Cost Accounting',
            'Auditing',
            'Insurance',
            'Business Law',
            'Corporate Accounting',
            'Finance',
            'Business Mathematics',
            'Corporate Law',
            'Business Mathematics and Statistics',
            'Economics',
            'English',
            'Business Communication',
            'Entrepreneurship',
            'Marketing',
            'Advanced Accounting',
            'Banking',
            'Business Economics',
            'Computer Application',
            'Environmental Studies',
            'Tax Law']
    ]

    const [course, setCourse] = useState(0);
    const [semester, setSemester] = useState(0);
    const [sub_1, setSub_1] = useState<number | string>(0);
    const [sub_3, setSub_3] = useState<number | string>(0)
    const [sub_2, setSub_2] = useState<number | string>(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setSub_1(0)
        setSub_2(0)
        setSub_3(0)
    }, [course])

    const handleSubmit = (e: any) => {
        e.preventDefault();


        if (course <= 0 || course >= 4) { return showError("Please select your Course.") }
        else if (semester == 0) { return showError("Please select your Semester.") }
        else if (sub_1 == 0) { return showError("Please select Subject 1.") }
        else if (sub_2 == 0) { return showError("Please select Subject 2.") }
        else if (sub_3 == 0) { return showError("Please select Subject 3.") }

        console.log(course, semester, sub_1, sub_2, sub_3)

        setLoading(true)

        const course_name = course === 1 ? 'B. A.' : course === 2 ? 'B. Sc.' : 'B. Com.';

        fetch('/api/register', {
            method: 'PATCH',
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                course: course_name,
                semester,
                sub_1,
                sub_2,
                sub_3
            })
        })
            .then(async (res) => {
                const data = await res.json()
                if (data.error) {
                    setLoading(false);
                    showError(data.error)
                    return;
                }
                setLoading(false);
                window.location.href = '/web/home';
            })
            .catch((err) => {
                showError("An error occurred. Please try again.");
                console.error(err);
                setLoading(false);
            })
    };
    return (
        <>
            <section className=" flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        Hsquare
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Setup your account
                            </h1>

                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                                <div className="max-w-sm mx-auto">
                                    <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                                    <select onChange={(e) => { setCourse(Number(e.target.value)) }} id="courses" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={course}>
                                        <option value={0}>Select Your Course</option>
                                        <option value={1}>B. A.</option>
                                        <option value={2}>B. Sc.</option>
                                        <option value={3}>B. Com.</option>
                                    </select>
                                </div>

                                <div className="max-w-sm mx-auto">
                                    <label htmlFor="semesters" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                                    <select onChange={(e) => { setSemester(Number(e.target.value)) }} id="semesters" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={semester}>
                                        <option value={0}>Select Your Semester</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>

                                    </select>
                                </div>


                                <div className="max-w-sm mx-auto">
                                    <label htmlFor="sub_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject 1</label>
                                    <select id="sub_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sub_1} onChange={(e) => { setSub_1(e.target.value) }}>
                                        {course > 0 && course < 4 ? (
                                            subjects[course - 1].map((subject, index) => {
                                                return <option key={index} value={subject}>{subject}</option>
                                            })
                                        ) : (
                                            <option value={0}>Select a course</option>
                                        )}
                                    </select>
                                </div>


                                <div className="max-w-sm mx-auto">
                                    <label htmlFor="sub_2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject 2</label>
                                    <select id="sub_2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sub_2} onChange={(e) => { setSub_2(e.target.value) }}>
                                        {course > 0 && course < 4 ? (
                                            subjects[course - 1].map((subject, index) => {
                                                return <option key={index} value={subject}>{subject}</option>
                                            })
                                        ) : (
                                            <option value={0}>Select a course</option>
                                        )}
                                    </select>
                                </div>

                                <div className="max-w-sm mx-auto">
                                    <label htmlFor="sub_3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject 3</label>
                                    <select id="sub_3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sub_3} onChange={(e) => { setSub_3(e.target.value) }}>
                                        {course > 0 && course < 4 ? (
                                            subjects[course - 1].map((subject, index) => {
                                                return <option key={index} value={subject}>{subject}</option>
                                            })
                                        ) : (
                                            <option value={0}>Select a course</option>
                                        )}
                                    </select>
                                </div>


                                <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{!loading ? "Save" : <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
