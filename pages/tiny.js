import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Editor } from "@tinymce/tinymce-react";
// import axios from "axios";
import Navbar from '@components/Navbar';
import Shimmer from '@components/Shimmer';

export default function Tiny() {
  const [value, setValue] = useState(`<h2>What to expect from here on out</h2>
      <p>https://dummyimage.com/640x360/fff/aaa</p>
      <p>https://www.youtube.com/watch?v=YHHsfnItLgA</p>
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 300);
  }, []);

  return (
    <div>
      <Head>
        <title>TinyMCE</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            TinyMCE
          </h1>

          {mounted ?
            <Editor
              id="Editor"
              tinymceScriptSrc='/tinymce/tinymce.min.js'
              value={value}
              onEditorChange={setValue}
              init={{
                height: 200,
                promotion: false,
                // FIX Upload image
                // TODO Docs : https://www.tiny.cloud/docs/tinymce/6/available-toolbar-buttons/
                // TODO Docs : https://www.tiny.cloud/docs/tinymce/6/accordion/
                plugins: ['autoresize', 'image', 'link', 'autolink', 'media', 'table', 'codesample', 'lists', 'code', 'anchor', 'accordion', 'advlist', 'emoticons', 'fullscreen', 'insertdatetime', 'preview', 'searchreplace', 'visualblocks', 'visualchars'],
                toolbar: 'undo redo | blocks fontsize bold italic underline | align indent outdent bullist numlist | link anchor image media audio codesample | removeformat',
              }}
            />
            :
            <Shimmer>
              <div className='h-8 max-w-sm rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='mt-2 h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='mt-4 h-32 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          }

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2 pt-4">HTML</h2>
          <div className="pb-8">
            {value &&
              <div >
                {value}
              </div>
            }
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">Preview</h2>
          <div className="p-0 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      </main>
    </div>
  )
}