import { useEffect, useState } from "react";
import Head from 'next/head';
import dynamic from "next/dynamic";
import Navbar from '@components/Navbar';
import axios from "axios";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Shimmer from "@components/Shimmer";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false, loading: () => <Shimmer>
      <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      <div className='mt-2 h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    </Shimmer>
  }
);

export default function Draft() {
  const [description, setDescription] = useState({
    description: EditorState.createEmpty(),
  });

  function handleDescriptionChange(e) {
    setDescription({ description: e });
  };

  const [descriptionn, setDescriptionn] = useState({
    descriptionn: EditorState.createEmpty(),
  });

  function handleDescriptionnChange(e) {
    setDescriptionn({ descriptionn: e });
  };

  const [defaultValue, setDefaultValue] = useState({
    value: EditorState.createEmpty(),
  });

  useEffect(() => {
    setDefaultValue({
      value: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<h3>When a heading comes after a paragraph …</h3>
      <p>When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.</p>
      <ul>
        <li>
          <p><strong>I often do this thing where list items have headings.</strong></p>
          <p>For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.</p>
          <p>I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.</p>
        </li>
        <li>
          <p><strong>Since this is a list, I need at least two items.</strong></p>
          <p>I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.</p>
        </li>
        <li>
          <p><strong>It's not a bad idea to add a third item either.</strong></p>
          <p>I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.</p>
        </li>
      </ul>
      <p>After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.</p>
      <h2>Code should look okay by default.</h2>
      <p>I think most people are going to use <a href="https://highlightjs.org/">highlight.js</a> or <a href="https://prismjs.com/">Prism</a> or something if they want to style their code blocks but it wouldn't hurt to make them look <em>okay</em> out of the box, even with no syntax highlighting.</p>`)
        )
      ),
    })
  }, [])

  function handleValueChange(e) {
    setDefaultValue({ value: e });
  };

  const [uploadedImagesAgenda, setUploadedImagesAgenda] = useState([]);

  async function uploadImageCallBack(file) {
    // console.log(file)

    // let tempUploadedImages = uploadedImagesAgenda;
    // const imageObject = {
    //   file: file,
    //   localSrc: URL.createObjectURL(file),
    // };
    // tempUploadedImages.push(imageObject);
    // setUploadedImagesAgenda(tempUploadedImages);
    // return new Promise((resolve, reject) => {
    //   resolve({ data: { link: imageObject.localSrc } });
    // });

    const data = new FormData();
    data.append("image", file)
    try {
      // https://api.imgbb.com/
      // nano-studio
      // Your account is connected to Google (nano.studioo)
      // key = 3370154ba7d4e63c7c5b9cedcf3ca7a7
      const res = await axios.post("https://api.imgbb.com/1/upload?expiration=600&key=3370154ba7d4e63c7c5b9cedcf3ca7a7",
        data
      )
      console.log(res)
      if (res.status == 200) {
        return Promise.resolve(
          // 1365x767
          // { data: { link: res.data?.data?.url } }
          // 640x360
          { data: { link: res.data?.data?.display_url } }
          // 180x180
          // { data: { link: res.data?.data?.thumb?.url } }
        )
        // return (
        //   { data: { link: res.data.data.url } }
        // )
      }
    } catch (error) {
      console.error(error)
    }

    // return new Promise((resolve, reject) => {
    //   const data = new FormData();
    //   data.append("image", file)
    //   https://api.imgbb.com/
    //   nano-studio
    //   Your account is connected to Google (nano.studioo)
    //   key = 3370154ba7d4e63c7c5b9cedcf3ca7a7
    //   axios.post("https://api.imgbb.com/1/upload?expiration=600&key=3370154ba7d4e63c7c5b9cedcf3ca7a7", data)
    //     .then(responseImage => {
    //       console.log(responseImage)
    //       resolve({ data: { link: responseImage.data.data.url } });
    //     }).catch(error => {
    //     console.error(error)
    //     reject(error);
    //   })
    // });
  }

  return (
    <div>
      <Head>
        <title>React Draft wysiwyg</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            Draft.js
          </h1>

          <p className="dark:text-white mb-4">in Next.js 13, we need to disable reactStrictMode=false in next.config.js. this cause some dropdown of react wyswyg editor not working in react 18. or need reload this page</p>

          <div className={`font-normal font-sans border-2 dark:border-neutral-700 rounded-lg mb-3`}>
            <Editor
              wrapperClassName="min-h-[10rem] bg-white p-2 rounded"
              editorState={description.description}
              onEditorStateChange={handleDescriptionChange}
              editorClassName="prose min-w-full"
            />
          </div>

          <div className="pt-4">
            {description.description &&
              <div className="mb-4">
                {stateToHTML(description.description.getCurrentContent())}
              </div>
            }
          </div>

          <div className="pb-8" dangerouslySetInnerHTML={{ __html: stateToHTML(description.description.getCurrentContent()) }} />

          <h2 className="text-xl dark:text-white font-semibold mb-4">With Upload Image</h2>

          <div className={`font-normal font-sans border-2 dark:border-neutral-700 rounded-lg mb-3`}>
            <Editor
              editorState={descriptionn.descriptionn}
              toolbarClassName="toolbar-class"
              wrapperClassName="wrapper-class min-h-[8rem] bg-white p-2 rounded"
              editorClassName="editor-class prose min-w-full prose-img:my-0 prose-p:py-0"
              onEditorStateChange={handleDescriptionnChange}
              // toolbarOnFocus
              toolbar={{
                // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
                inline: { inDropdown: true },
                list: { inDropdown: false },
                textAlign: { inDropdown: false },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  urlEnabled: true,
                  uploadEnabled: true,
                  uploadCallback: uploadImageCallBack,
                  previewImage: true,
                  alt: { present: false, mandatory: false }
                },
              }}
            />
          </div>

          <div className="py-4">
            {descriptionn.descriptionn &&
              <div>
                {stateToHTML(descriptionn.descriptionn.getCurrentContent())}
              </div>
            }
          </div>

          <h1 className="mt-8 text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            Draft.js Default Value
          </h1>

          <div className={`font-normal font-sans border-2 dark:border-neutral-700 rounded-lg mb-3`}>
            <Editor
              wrapperClassName="min-h-[10rem] bg-white p-2 rounded"
              editorState={defaultValue.value}
              onEditorStateChange={handleValueChange}
              editorClassName="prose min-w-full"
            />
          </div>

          <div className="pt-4">
            {defaultValue.value &&
              <div className="mb-4">
                {stateToHTML(defaultValue.value.getCurrentContent())}
              </div>
            }
          </div>

          <div className="prose dark:prose-invert py-8" dangerouslySetInnerHTML={{ __html: stateToHTML(defaultValue.value.getCurrentContent()) }} />
        </div>
      </main>
    </div>
  )
}
