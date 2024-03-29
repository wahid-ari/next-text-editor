import { useState } from "react"
import Head from 'next/head';
import Navbar from '@components/Navbar';
import dynamic from "next/dynamic";
import Shimmer from "@components/Shimmer";

const MyEditor = dynamic(
  () => import("@components/MyEditor"),
  {
    ssr: false,
    loading: () => (
      <Shimmer>
        <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='mt-2 h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
    )
  }
);

export default function Wang() {
  // editor content
  const [html, setHtml] = useState(`<h2>What to expect from here on out</h2>
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
      <p>It's probably important that images look okay here by default as well:</p>`)

  return (
    <div>
      <Head>
        <title>Wang Editor</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            Wangeditor
            <a href="https://www.wangeditor.com/en/" target="_blank" rel="noreferrer" className="ml-4 text-base text-sky-500 hover:text-sky-600 mb-8">Docs</a>
          </h1>

          <MyEditor html={html} setHtml={setHtml} />

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">HTML</h2>
          <div className="pb-8">
            {html}
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4 border-b dark:border-b-neutral-700 pb-2">Preview</h2>
          <div className="prose dark:prose-invert prose-a:text-blue-500 pb-4 min-w-full 
            md:prose-table:w-auto prose-table:border-collapse    
            prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
            prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
            even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-[#111]
            prose-hr:my-8 dark:prose-hr:border-neutral-700
            prose-img:rounded prose-img:my-6 prose-img:mx-auto
            dark:prose-p:text-neutral-100"
            dangerouslySetInnerHTML={{ __html: html }}
          />

        </div>
      </main>
    </div>
  )
}
