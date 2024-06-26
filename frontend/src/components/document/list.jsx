import axios from "axios";
import React , {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DocumentList = (props) => {
    const [value, setValue] = useState('');
    const [value1 , setValue1] = useState('');

    const handleChange = (content) => {
        setValue(content);
    };

    const handleChange1 = (content) => {
        setValue1(content.target.value);
    };

    const formData = {
        'markdown_content' : value,
        'name' : value1
    }
    const handleSubmit = async() => {
        console.log(import.meta.env.VITE_APP_API_URL + '/document/add/');
        const response = await axios.post(import.meta.env.VITE_APP_API_URL + '/document/add/', formData);
        localStorage.setItem('csrfToken', response.headers['x-csrf-token']);
        setValue('');
        setValue1('');
    }
    return (
        <div className="w-full min-h-[calc(100vh-72px)] py-5 px-10 ">
            <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Document Name"
                value={value1}
                onChange={handleChange1}
            />
             <ReactQuill
                className="bg-white text-black mt-5"
                style={{ height: '250px' }}
                theme="snow"
                value={value}
                onChange={handleChange}
            />
            <div className="w-full flex justify-center ">
                <button className=" bg-red-500 mt-16 px-5 py-2 rounded-full hover:bg-red-600 custor" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
};

export default DocumentList;