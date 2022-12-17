import { useState } from "react"
import Head from 'next/head';
import Navbar from '@components/Navbar';
import axios from "axios";
import dynamic from "next/dynamic";

const MyEditor = dynamic(
  () => import("@components/MyEditor"),
  { ssr: false }
);

export default function Wang() {
  // editor content
  const [html, setHtml] = useState('<p>hello</p>')

  return (
    <div>
      <Head>
        <title>Create Next App</title>
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
          
          

          <MyEditor value={html} setHtml={setHtml} />

          <p className="dark:text-white text-xl mt-4">HTML</p>
          <div className="py-4">
            {html}
          </div>

          <p className="dark:text-white text-xl mt-4">Rendered</p>
          <div className="prose dark:prose-invert prose-a:text-blue-500 py-4 min-w-full 
          md:prose-table:w-auto prose-table:border-collapse    
          prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
          prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
          even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-[#111]
          prose-hr:my-8 dark:prose-hr:border-neutral-700
          prose-"
            dangerouslySetInnerHTML={{ __html: html }}
          />

        </div>
      </main>
    </div>
  )
}
