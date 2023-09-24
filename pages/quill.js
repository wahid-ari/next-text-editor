import { useState, useMemo } from "react";
import Head from 'next/head';
import dynamic from "next/dynamic";
import Navbar from '@components/Navbar';
// import axios from "axios";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

export default function Quill() {

  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"),
    { ssr: false, loading: () => <p className="dark:text-black">Loading ...</p> }),
    []);

  const [description, setDescription] = useState('');

  function handleDescriptionChange(e) {
    setDescription(e);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const [defaultValue, setDefaultValue] = useState('<h1>React Quill</h1>');

  function handleValueChange(e) {
    setDefaultValue(e);
  };

  return (
    <div>
      <Head>
        <title>React Quill</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            React Quill
          </h1>

          <div className="font-normal text-lg font-sans bg-white dark:text-neutral-800 p-2 border-2 dark:border-neutral-700 rounded-lg mb-3">
            <ReactQuill
              theme="snow"
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, false] }],
                  [{ 'size': ['small', false, 'large', 'huge'] }],
                  [{ 'align': [] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image', 'video'],
                  [{ 'script': 'sub' }, { 'script': 'super' }],
                  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                  // [{ 'font': [] }], 
                  ['clean']   
                ],
              }}
            />
          </div>

          <div className="py-8">
            {description &&
              <div >
                {description}
              </div>
            }
          </div>

          <h1 className="text-2xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-4">
            Read Only
          </h1>

          <div className="font-normal text-lg font-sans bg-white dark:text-neutral-800 p-2 border-2 dark:border-neutral-700 rounded-lg mb-3">
            <ReactQuill
              theme="bubble"
              value={description}
              readOnly
            />
          </div>

          <h1 className="text-2xl text-neutral-800 dark:text-white font-semibold tracking-wide my-4">
            Preview
          </h1>

          <div dangerouslySetInnerHTML={{ __html: description }} />

          <h1 className="text-3xl mt-8 text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            React Quill Default Value
          </h1>

          <div className="font-normal text-lg font-sans bg-white dark:text-neutral-800 p-2 border-2 dark:border-neutral-700 rounded-lg mb-3">
            <ReactQuill
              theme="snow"
              value={defaultValue}
              onChange={handleValueChange}
            />
          </div>

          <div className="py-8">
            {defaultValue &&
              <div >
                {defaultValue}
              </div>
            }
          </div>

          <h1 className="text-2xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-4">
            Read Only
          </h1>

          <div className="font-normal text-lg font-sans bg-white dark:text-neutral-800 p-2 border-2 dark:border-neutral-700 rounded-lg mb-3">
            <ReactQuill
              theme="bubble"
              value={defaultValue}
              readOnly
            />
          </div>

          <h1 className="text-2xl text-neutral-800 dark:text-white font-semibold tracking-wide my-4">
            Preview
          </h1>

          <div dangerouslySetInnerHTML={{ __html: defaultValue }} />

        </div>
      </main>
    </div>
  )
}
