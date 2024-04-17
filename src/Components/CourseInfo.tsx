import Image from 'next/image';
import React, { useRef, useState } from 'react';
const CourseForm: React.FC = () => {
    // Create a reference to the file input element
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (file) {
            // Generate a URL for the selected file and set it as the selected image URL
            const imageURL = URL.createObjectURL(file);
            setSelectedImageURL(imageURL);
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log('Form submitted');
        // Add your form submission logic here
        // This could involve sending data to a server or handling the form data
    };

    return (
        <div className="bg-white p-4  flex flex-col items-center rounded-lg shadow-lg">
            {/* Course, Semester, and Subject labels */}
            <div className="flex flex-col w-5/6 space-y-2">
            <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Course name </div>
                  </div>
            <div>
                      <label  className="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Subject </label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Subject name</div>
                  </div>
            <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Semester name</div>
                  </div>
               
            </div>

            {/* Buy Now button */}
            <div className="mt-4">
                <a href="/buy-now" className="inline-block px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Buy Now
                </a>
            </div>

            {/* Upload Screenshot button */}
            <div className="mt-4">
                <button
                    className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    <Image src={selectedImageURL} alt="Uploaded Screenshot" className="w-32 h-32 object-cover rounded-md" />
                </div>
            )}

            {/* Submit button */}
            <div className="mt-4">
                <button
                    className={`inline-block px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        !selectedImageURL ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    type="button"
                    onClick={handleSubmit}
                    disabled={!selectedImageURL}  // Disable button if no screenshot is uploaded
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CourseForm;
