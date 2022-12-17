import { useState } from "react";
import Head from 'next/head';
import dynamic from "next/dynamic";
import Navbar from '@components/Navbar';
import axios from "axios";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function Home() {

  const [description, setDescription] = useState({
    description: EditorState.createEmpty(),
  });

  const [descriptionn, setDescriptionn] = useState({
    descriptionn: EditorState.createEmpty(),
  });

  function handleDescriptionChange(e) {
    setDescription({ description: e });
  };

  function handleDescriptionnChange(e) {
    setDescriptionn({ descriptionn: e });
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
      const res = await axios.post("https://api.imgbb.com/1/upload?expiration=600&key=3370154ba7d4e63c7c5b9cedcf3ca7a7",
        data
      )
      console.log(res)
      if (res.status == 200) {
        return Promise.resolve(
          { data: { link: res.data.data.url } }
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
        <title>Create Next App</title>
        <meta name="description" description="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="dark:bg-neutral-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-3">
          <h1 className="text-3xl text-neutral-800 dark:text-white font-semibold tracking-wide mb-8">
            Draft.js
          </h1>

          <div className="font-normal font-sans bg-white p-2 border-2 dark:border-neutral-700 rounded-lg mb-3">
            <Editor
              wrapperClassName="min-h-[10rem]"
              editorState={description.description}
              onEditorStateChange={handleDescriptionChange}
              editorClassName="prose min-w-full"
            />
          </div>

          <div className="py-8">
            {description.description &&
              <div className="mb-4">
                {stateToHTML(description.description.getCurrentContent())}
              </div>
            }
          </div>

          <h2 className="text-xl dark:text-white font-semibold mb-4">With Upload Image</h2>

          <div className="font-normal font-sans bg-white p-2 border-2 dark:border-neutral-700 rounded-lg mb-3">
            <Editor
              editorState={descriptionn.descriptionn}
              toolbarClassName="toolbar-class"
              wrapperClassName="wrapper-class min-h-[8rem]"
              editorClassName="editor-class prose min-w-full prose-img:my-0 prose-p:py-0"
              onEditorStateChange={handleDescriptionnChange}
              // toolbarOnFocus
              toolbar={{
                // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
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

          <div className="py-8">
            {descriptionn.descriptionn &&
              <div>
                {stateToHTML(descriptionn.descriptionn.getCurrentContent())}
              </div>
            }
          </div>

          {/* <div dangerouslySetInnerHTML={{ __html: description.description }} /> */}

        </div>
      </main>
    </div>
  )
}
