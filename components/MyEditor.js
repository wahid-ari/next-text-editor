import '@wangeditor/editor/dist/css/style.css' // import css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from "@wangeditor/editor-for-react"
import { i18nChangeLanguage } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'
import axios from "axios";
// Register
// You should register this before create editor, and register only once (not repeatedly).
Boot.registerModule(attachmentModule)

export default function MyEditor({ html, setHtml }) {
  // Switch language - 'en' or 'zh-CN'
  i18nChangeLanguage('en')
  // editor instance
  const [editor, setEditor] = useState(null)
  const toolbarConfig = {
    insertKeys: {
      index: 0, // insert position
      keys: ['uploadAttachment'], // upload attachment menu
    },
  }
  toolbarConfig.excludeKeys = [
    'uploadVideo',
    'fontFamily'
  ]
  const editorConfig = {
    placeholder: 'Type here...',
    // https://www.wangeditor.com/en/v5/menu-config.html#custom-functions
    // https://github.com/wangeditor-team/wangEditor-plugin-upload-attachment/blob/main/README-en.md
    // Hoverbar keys when selected a attachment node.
    hoverbarKeys: {
      attachment: {
        menuKeys: ['downloadAttachment'], // download attachment menu
      }
    },
    MENU_CONF: {
      uploadImage: {
        // https://api.imgbb.com/
        // nano-studio
        // Your account is connected to Google (nano.studioo)
        // key = 3370154ba7d4e63c7c5b9cedcf3ca7a7
        server: 'https://api.imgbb.com/1/upload?expiration=600&key=3370154ba7d4e63c7c5b9cedcf3ca7a7',
        // max size of one file
        maxFileSize: 1 * 1024 * 1024, // 1M
        // max length of uploaded files
        maxNumberOfFiles: 10,
        // file types, default `['image/*']`. If unwanted, you can set []
        allowedFileTypes: ['image/*'],
        // custom upload params, like token
        // meta: {
        //   token: 'xxx',
        //   otherKey: 'yyy'
        // },
        // Embed meta in url, not in formData. Default is false
        // metaWithUrl: false,
        // custom http headers
        // headers: {
        //   Accept: 'text/x-json',
        //   otherKey: 'xxx'
        // },
        // send cookie when cross-origin
        // withCredentials: true,
        // timeout, default 10s
        // timeout: 5 * 1000, // 5 秒
        // form-data fieldName ，default 'wangeditor-uploaded-image'
        fieldName: 'image',
        onBeforeUpload(file) {
          // `file` is selected file, format like { key }
          // console.log('onBeforeUpload', file)
          return file
          // You can return:
          // 1. return the file object or a new file object. Editor will upload it.
          // 2. return false. Stop upload this file.
        },
        onProgress(progress) {
          // progress is a number 0-100
          // alert(progress)
          // console.log('progress', progress)
        },
        onSuccess(file, res) {
          // alert(`${file.name} uploaded`)
          // console.log(`${file.name} uploaded`, res)
        },
        onFailed(file, res) {
          alert(res.message)
          // console.log(`${file.name} failed`, res)
        },
        onError(file, err, res) {
          alert(err.message)
          // console.log(`${file.name} error`, err, res)
        },
        customInsert(res, insertFn) {
          // `res` is server response
          // console.log(res.data.url)
          // Get image's url, alt, href in res, and insert to editor
          const url = res.data.url
          const alt = "new image"
          insertFn(url, alt, url)
        },
      },
      // upload attachment menu config
      uploadAttachment: {
        // https://dev.filestack.com/apps/ALHqeeKNATfyIfquYr9Acz/dashboard/
        // nano.studioo
        // pass : 0801Rebeliouz0801.
        // key : ALHqeeKNATfyIfquYr9Acz
        server: 'https://www.filestackapi.com/api/store/S3?key=ALHqeeKNATfyIfquYr9Acz',
        // timeout: 5 * 1000, // 5s
        fieldName: 'file',
        // meta: { token: 'xxx', a: 100 },
        // metaWithUrl: true,
        // headers: { Accept: 'text/x-json' },
        maxFileSize: 10 * 1024 * 1024, // 10M
        onBeforeUpload(file) {
          console.log('onBeforeUpload', file)
          return file // upload this `file`
          // return false // ignore this `file`
        },
        onProgress(progress) {
          console.log('onProgress', progress)
        },
        onSuccess(file, res) {
          console.log('onSuccess', file, res)
        },
        onFailed(file, res) {
          alert(res.message)
          console.log('onFailed', file, res)
        },
        onError(file, err, res) {
          alert(err.message)
          console.error('onError', file, err, res)
        },
        // customInsert(res, file, insertFn) {
        //   console.log('customInsert', res)
        //   const { url } = res.data || {}
        //   if (!url) throw new Error(`url is empty`)
        //   // insert to editor
        //   insertFn(`customInsert-${file.name}`, url)
        // },
        customUpload(file, insertFn) {
          // console.log('customUpload', file)
          async function post(file) {
            try {
              const res = await axios.post("https://www.filestackapi.com/api/store/S3?key=ALHqeeKNATfyIfquYr9Acz",
                file,
                {
                  headers: {
                    'Content-Type': 'application/pdf',
                  }
                }
              )
              // console.log(res.data.url)
              // insertFn(`customUpload-${file.name}`, res.data.url)
              insertFn(file.name, res.data.url)
            } catch (error) {
              console.error(error)
            }
          }
          post(file)
          // fetch("https://www.filestackapi.com/api/store/S3?key=ALHqeeKNATfyIfquYr9Acz", {
          //   method: "POST",
          //   body: file,
          //   headers: { "Content-type": "application/pdf" }
          // })
          //   .then((res) => res.json())
          //   .then((res) => {
          //     console.log(res)
          //     insertFn(`customUpload-${file.name}`, res.url)
          //   })
          //   .catch((error) => console.error(error));
          // return new Promise(resolve => {
          //   setTimeout(() => {
          //     const src = `https://www.w3school.com.cn/i/movie.ogg`
          //     insertFn(`customUpload-${file.name}`, src)
          //     resolve('ok')
          //   }, 500)
          // })
        },
        // customBrowseAndUpload(insertFn: Function) {
        //   alert('select your files')
        //   // upload your files
        //   // Do `insertFn(fileName, link)` to insert file into editor.
        // },
        onInsertedAttachment(elem) {
          // console.log('inserted attachment', elem)
        },
      }
    }
  }

  // Timely destroy editor, important!
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div className="bg-white dark:bg-white border-2 rounded mb-3">
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          className="border-b-2 rounded-t-sm p-1"
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          className="overflow-y-hidden prose prose-a:text-blue-500 min-w-full prose-pre:text-black prose-img:rounded"
          style={{ height: '500px' }}
        />
      </div>
    </>
  )
}