import { useState } from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import axios from "axios";
import Navbar from '@components/Navbar';
import 'suneditor/dist/css/suneditor.min.css';
import katex from 'katex'
import 'katex/dist/katex.min.css'
import Shimmer from '@components/Shimmer';
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false, loading: () => <Shimmer>
    <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    <div className='mt-2 h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
  </Shimmer>
});

const templates = [
  {
    name: 'Template-1',
    html: `<h2>What if we stack headings?</h2>
            <h3>We should make sure that looks good, too.</h3>
            <p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>
            <h3>When a heading comes after a paragraph …</h3>
            <p>When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now lets see what a more complex list would look like.</p>
            <ul>
              <li>
                <p><strong>I often do this thing where list items have headings.</strong></p>
                <p>For some reason I think this looks cool which is unfortunate because its pretty annoying to get the styles right.</p>
                <p>I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldnt write this way.</p>
              </li>
              <li>
                <p><strong>Since this is a list, I need at least two items.</strong></p>
                <p>I explained what Im doing already in the previous list item, but a list wouldnt be a list if it only had one item, and we really want this to look realistic. Thats why Ive added this second list item so I actually have something to look at when writing the styles.</p>
              </li>
              <li>
                <p><strong>Its not a bad idea to add a third item either.</strong></p>
                <p>I think it probably wouldve been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.</p>
              </li>
            </ul>
            <p>After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.</p>`
  },
  {
    name: 'Template-2',
    html: `<h2>There are other elements we need to style</h2>
            <p>I almost forgot to mention links, like <a href="https://tailwindcss.com">this link to the Tailwind CSS website</a>. We almost made them blue but thats so yesterday, so we went with dark gray, feels edgier.</p>
            <p>We even included table styles, check it out:</p>
            <table>
              <thead>
                <tr>
                  <th>Wrestler</th>
                  <th>Origin</th>
                  <th>Finisher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bret The Hitman Hart</td>
                  <td>Calgary, AB</td>
                  <td>Sharpshooter</td>
                </tr>
                <tr>
                  <td>Stone Cold Steve Austin</td>
                  <td>Austin, TX</td>
                  <td>Stone Cold Stunner</td>
                </tr>
                <tr>
                  <td>Randy Savage</td>
                  <td>Sarasota, FL</td>
                  <td>Elbow Drop</td>
                </tr>
                <tr>
                  <td>Vader</td>
                  <td>Boulder, CO</td>
                  <td>Vader Bomb</td>
                </tr>
                <tr>
                  <td>Razor Ramon</td>
                  <td>Chuluota, FL</td>
                  <td>Razors Edge</td>
                </tr>
              </tbody>
            </table>
            <p>We also need to make sure inline code looks good, like if I wanted to talk about <code>&lt;span&gt;</code> elements or tell you the good news about <code>@tailwindcss/typography</code>.</p>
            <h3>Sometimes I even use <code>code</code> in headings</h3>
            <p>Even though its probably a bad idea, and historically Ive had a hard time making it look good. This <em>wrap the code blocks in backticks</em> trick works pretty well though really.</p>
            <p>
              Another thing Ive done in the past is put a <code>code</code> tag inside of a link, like if I wanted to tell you about the <a href="https://github.com/tailwindcss/docs"><code>tailwindcss/docs</code></a> repository. I dont love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.
            </p>
            <h4>We havent used an <code>h4</code> yet</h4>
            <p>But now we have. Please dont use <code>h5</code> or <code>h6</code> in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a <code>before</code> pseudo-element to scream at you if you use an <code>h5</code> or <code>h6</code>.</p>
            <p>We dont style them at all out of the box because <code>h4</code> elements are already so small that they are the same size as the body copy. What are we supposed to do with an <code>h5</code>, make it <em>smaller</em> than the body copy? No thanks.</p>
            <h3>We still need to think about stacked headings though.</h3>
            <h4>Lets make sure we dont screw that up with <code>h4</code> elements, either.</h4>
            <p>Phew, with any luck we have styled the headings above this text and they look pretty good.</p>
            <p>Lets add a closing paragraph here so things end with a decently sized block of text. I cant explain why I want things to end that way but I have to assume its because I think things will look weird or unbalanced if there is a heading too close to the end of the document.</p>
            <p>What Ive written here is probably long enough, but adding this final sentence cant hurt.</p>`
  }
]

export default function Sun() {
  const [value, setValue] = useState(`<h2>What to expect from here on out</h2>
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
  function handleChange(content) {
    // console.log(content); //Get Content Inside Editor
    setValue(content)
  }

  // TODO DOcs : https://github.com/mkhstar/suneditor-react/issues/128#issuecomment-725670347
  function handleImageUploadBefore(files, info, uploadHandler) {
    // uploadHandler is a function
    // console.log("handleImageUploadBefore")
    const file = files[0]
    // console.log(file)
    // console.log(info)
    const formData = new FormData();
    formData.append("image", file);
    // new Response(formData).text().then(console.log)
    if (/^image\//.test(file.type)) {
      // https://api.imgbb.com/
      // nano-studio
      // Your account is connected to Google (nano.studioo)
      // key = 3370154ba7d4e63c7c5b9cedcf3ca7a7
      const res = axios.post("https://api.imgbb.com/1/upload?expiration=600&key=3370154ba7d4e63c7c5b9cedcf3ca7a7",
        formData
      )
      res.then((res) => {
        console.log(res)
        if (res.status == 200) {
          const image = {
            result: [
              {
                // 640x360
                url: res.data?.data?.display_url,
                // 1365x767
                // url: res.data?.data?.url,
                // 180x180
                // url: res.data?.data?.thumb?.url,
                name: "Image",
              },
            ],
          };
          uploadHandler(image);
        }
      }).catch(err => console.error("Error post image", err))
    } else {
      console.warn("You could only upload images.");
    }
  }

  function handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount) {
    console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
  }

  function handleImageUploadError(errorMessage, result) {
    console.log(errorMessage, result)
  }

  return (
    <div>
      <Head>
        <title>Suneditor</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            Suneditor
          </h1>

          {/* https://github.com/mkhstar/suneditor-react#basic-settings */}
          <SunEditor
            className="rounded"
            onChange={handleChange}
            onImageUploadBefore={handleImageUploadBefore}
            onImageUpload={handleImageUpload}
            onImageUploadError={handleImageUploadError}
            defaultValue={value}
            placeholder="Please type here..."
            setDefaultStyle="font-family: inter; font-size: 16px;"
            setOptions={{
              templates: templates,
              katex: katex,
              height: "100%",
              minHeight: 200,
              // https://github.com/JiHong88/SunEditor/#1-load-only-what-you-want
              // https://github.com/JiHong88/SunEditor/blob/master/README.md#options
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['align', 'list', 'horizontalRule', 'lineHeight'],
                ['paragraphStyle', 'blockquote'],
                ['indent', 'outdent'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['link', 'image', 'video', 'audio', 'table', 'math'],
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print'],
                ['save', 'template'],
                ['dir'],
                // (min-width:992px)
                ['%992', [
                  ['undo', 'redo'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                  ['bold', 'underline', 'italic', 'strike'],
                  [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                  ['removeFormat'],
                  ['indent', 'outdent'],
                  ['align', 'list', 'horizontalRule', 'lineHeight'],
                  ['-right', 'dir'],
                  ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
                  ['-right', ':r-More Rich-default.more_plus', 'link', 'image', 'video', 'audio', 'table', 'math'],
                ]],
                // (min-width:768px)
                ['%768', [
                  ['undo', 'redo'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                  [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
                  [':e-More Line-default.more_horizontal', 'indent', 'outdent', 'align', 'list', 'horizontalRule', 'lineHeight'],
                  [':r-More Rich-default.more_plus', 'link', 'image', 'video', 'audio', 'table', 'math'],
                  ['-right', 'dir'],
                  ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
                ]],
                // (min-width: 330)
                ['%330', [
                  ['undo', 'redo'],
                  [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                  [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
                  [':e-More Line-default.more_horizontal', 'indent', 'outdent', 'align', 'list', 'horizontalRule', 'lineHeight'],
                  [':r-More Rich-default.more_plus', 'link', 'image', 'video', 'audio', 'table', 'math'],
                  ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template', 'dir']
                ]]
              ]
            }}
          />

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