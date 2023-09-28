import Head from 'next/head';
import dynamic from "next/dynamic";
import Navbar from '@components/Navbar';
import Shimmer from "@components/Shimmer";
import { useState } from 'react';

const Editor = dynamic(() => import("@components/Editor"), {
  ssr: false, loading: () => <Shimmer>
    <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    <div className='mt-4 h-32 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
  </Shimmer>
});

export default function BlockNote() {
  // const [value, setValue] = useState(`<h2>What to expect from here on out</h2>
  //     <p>What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like <strong>bold text</strong>, unordered lists, ordered lists, code blocks, block quotes, <em>and even italics</em>.</p>
  //     <p>It's important to cover all of these use cases for a few reasons:</p>
  //     <ol>
  //       <li>We want everything to look good out of the box.</li>
  //       <li>Really just the first reason, that's the whole point of the plugin.</li>
  //       <li>Here's a third pretend reason though a list with three items looks more realistic than a list with two items.</li>
  //     </ol>
  //     <h3>Typography should be easy</h3>
  //     <p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
  //     <blockquote><p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p></blockquote>
  //     <p>It's probably important that images look okay here by default as well:</p>`);
  const [value, setValue] = useState(`<h2>What to expect from here on out</h2>`);

  return (
    <div>
      <Head>
        <title>Blocknote</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            Blocknote
          </h1>
          <p className="dark:text-white mb-4">Image inserted not ready yet {' '} 
          <a className="text-sky-500" target='_blank' href='https://github.com/TypeCellOS/BlockNote/issues/282'>Issue</a>
            {' '} - {' '}
            <a className="text-sky-500" target='_blank' href='https://github.com/TypeCellOS/BlockNote/pull/331'>Progress</a>
          </p>

          <div className={`border dark:border-neutral-700 rounded mb-3`}>
            <Editor value={value} setValue={setValue} />
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 py-2">HTML</h2>
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