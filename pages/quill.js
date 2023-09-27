import { useState, useMemo, useRef } from "react";
import Head from 'next/head';
import dynamic from "next/dynamic";
import Navbar from '@components/Navbar';
import hljs from 'highlight.js';
import axios from "axios";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import 'highlight.js/styles/atom-one-dark.css'
import Shimmer from "@components/Shimmer";

export default function Quill() {

  // TODO Docs : https://abdullahcanakci.org/en/posts/reactquill-imageupload/
  const   ReactQuillImage = useMemo(() => dynamic(
    async () => {
      hljs.configure({
        languages: ['javascript', 'php', 'go']
      })
      window.hljs = hljs
      // return import("react-quill")
      const { default: RQ } = await import("react-quill");
      // eslint-disable-next-line react/display-name
      return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    {
      ssr: false, loading: () => <Shimmer>
        <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
    }),
    []);

  const ReactQuill = useMemo(() => dynamic(() => {
    hljs.configure({
      languages: ['javascript', 'php', 'go']
    })
    window.hljs = hljs
    return import("react-quill")
  },
    {
      ssr: false, loading: () => <Shimmer>
        <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
    }),
    []);

  const [description, setDescription] = useState('');

  function handleDescriptionChange(e) {
    setDescription(e);
  };

  const editorRef = useRef(null);
  // TODO Docs ref https://abdullahcanakci.org/en/posts/reactquill-imageupload/
  // TODO Docs another ref https://kaloraat.com/articles/react-quill-wysiwyg-rich-text-editor-image-upload-to-server
  function imageHandler(a) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      // console.log(file)
      const fd = new FormData();
      fd.append("image", file);
      // new Response(fd).text().then(console.log)
      // file type is only image.
      if (/^image\//.test(file.type)) {
        try {
          // https://api.imgbb.com/
          // nano-studio
          // Your account is connected to Google (nano.studioo)
          // key = 3370154ba7d4e63c7c5b9cedcf3ca7a7
          const res = await axios.post("https://api.imgbb.com/1/upload?expiration=600&key=3370154ba7d4e63c7c5b9cedcf3ca7a7",
            fd
          )
          console.log(res)
          if (res.status == 200) {
            // 640x360
            editorRef.current.getEditor().insertEmbed(null, "image", res.data?.data?.display_url);
            // 1365x767
            // editorRef.current.getEditor().insertEmbed(null, "image", res.data?.data?.url);
            // 180x180
            // editorRef.current.getEditor().insertEmbed(null, "image", res.data?.data?.thumb?.url);
          }
        }
        catch (err) {
          console.error(err)
        }
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  const modules = useMemo(() => ({
    syntax: true,
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  const [defaultValue, setDefaultValue] = useState(`<h2>What to expect from here on out</h2>
      <p>What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like <strong>bold text</strong>, unordered lists, ordered lists, code blocks, block quotes, <em>and even italics</em>.</p>
      <p>It's important to cover all of these use cases for a few reasons:</p>
      <ol>
        <li>We want everything to look good out of the box.</li>
        <li>Really just the first reason, that's the whole point of the plugin.</li>
        <li>Here's a third pretend reason though a list with three items looks more realistic than a list with two items.</li>
      </ol>
      <p>Now we're going to try out another header style.</p>
      <h3>Typography should be easy</h3>
      <p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
      <p>Something a wise person once told me about typography is:</p>
      <blockquote><p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p></blockquote>
      <p>It's probably important that images look okay here by default as well:</p>`);

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

          <div className="font-normal text-lg font-sans bg-white rounded dark:text-neutral-800 mb-3">
            <ReactQuillImage
              theme="snow"
              onChange={handleDescriptionChange}
              modules={modules}
              forwardedRef={editorRef}
            />
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">HTML</h2>
          <div className="pb-8">
            {description &&
              <div >
                {description}
              </div>
            }
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">ReadOnly</h2>

          <div className="font-normal text-lg font-sans bg-white rounded dark:text-neutral-800 mb-3">
            <ReactQuill
              theme="bubble"
              value={description}
              readOnly
            />
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">Preview</h2>

          <div className="ql-editor !p-0 !prose dark:!prose-invert" dangerouslySetInnerHTML={{ __html: description }} />

          <hr className="border dark:border-neutral-700 my-8" />

          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            React Quill Default Value
          </h1>

          <div className="font-normal text-lg font-sans bg-white rounded dark:text-neutral-800 mb-3">
            <ReactQuill
              theme="snow"
              value={defaultValue}
              onChange={handleValueChange}
            />
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">HTML</h2>
          <div className="pb-8">
            {defaultValue &&
              <div >
                {defaultValue}
              </div>
            }
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">Read Only Default Value</h2>

          <div className="font-normal text-lg font-sans bg-white rounded dark:text-neutral-800 mb-3">
            <ReactQuill
              theme="bubble"
              value={defaultValue}
              readOnly
            />
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">Preview Default Value</h2>

          <div className="ql-editor !p-0 !prose dark:!prose-invert" dangerouslySetInnerHTML={{ __html: defaultValue }} />

        </div>
      </main>
    </div>
  )
}
