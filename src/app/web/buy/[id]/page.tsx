
"use client"

import Image from 'next/image';
import Logo from '../../../../../public/icon.png';
import React, { useEffect, useRef, useState } from 'react';
const Page = ({ params }: { params: { id: string } }) => {
  // Create a reference to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filedata, setFileData] = useState<any>(null)

  // State to store the selected image file URL
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);

  // Handle the button click event
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      // Trigger the file input click event
      fileInputRef.current.click();
    }
  };

  // Handle file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileData(file)
    if (file) {
      // Generate a URL for the selected file and set it as the selected image URL
      const imageURL = URL.createObjectURL(file);
      setSelectedImageURL(imageURL);
    }
  };

  const [loading, setLoading] = useState(false)

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true)
    if (filedata) {
      const formData = new FormData();
      formData.append('file', filedata);
      formData.append('course', data.course);
      formData.append('user', data.name);
      formData.append('semester', data.semester);
      formData.append('subject', data.subjects[params.id].name);

      fetch(`/api/payments`, {
        method: 'POST',
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string },
        body: formData
      })
        .then(async (res) => {
          const val = await res.json()
          if (val.error) {
            console.error(val.error)
            return
          }
          console.log(val)
          setFileData(null)
          setSelectedImageURL(null)
          setLoading(false)
          window.location.href = '/web/home'
        })
        .catch((err) => {
          console.error(err);
          setLoading(false)
        })
    }
  };

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/user`, {
      method: 'GET',
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string }
    })
      .then(async (res) => {
        const val = await res.json()
        if (val.error) {
          console.error(val.error)
          return
        }
        setData(val)
      })
      .catch((err) => {
        console.error(err);
      })
  }, [params.id])

  return (
    <>
      {data ? (
        <>
          <div className="text-center text-gray-500 bg-white rounded-lg  dark:text-gray-400 dark:bg-gray-800">

            <div className="ms-3 text-black text-xl font-bold">Buy Course</div>

          </div>
          <div className="bg-white p-4  flex flex-col items-center rounded-lg">
            {/* Course, Semester, and Subject labels */}
            <div className="flex flex-col w-5/6 space-y-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{data.course}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{data.semester}</div>
              </div>
              <div>
                <label className="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Subject </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{data.subjects[params.id].name}</div>
              </div>

            </div>

            {/* Buy Now button */}
            <div className="mt-4 text-center">
              <a href="/buy-now"
                className="w-60 inline-block px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Pay ₹50
              </a>
            </div>

            {/* Upload Screenshot button */}
            <div className="mt-4">
              <button
                className="w-60 inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                onClick={handleUploadClick}
              >
                Upload Screenshot
              </button>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Display the uploaded image */}
            {selectedImageURL && (
              <div className="mt-4">
                <Image width={100} height={100} src={selectedImageURL} alt="Uploaded Screenshot" className="w-16 h-16 object-cover rounded-md" />
              </div>
            )}

            {/* Submit button */}
            <div className="mt-4">
              <button
                className={`w-60 inline-block px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${!selectedImageURL || loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                type="button"
                onClick={handleSubmit}
                disabled={!selectedImageURL || loading}  // Disable button if no screenshot is uploaded
              >
                {loading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </div>
        </>
      ) : (
          <section className="h-[100vh] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                Hsquare
              </a>
              <h1 className="leading-tight tracking-tight text-gray-500 md:text-xl dark:text-white">
                Loading course information...
              </h1>
            </div>
          </section >
      )}
    </>
  );
};

export default Page;
