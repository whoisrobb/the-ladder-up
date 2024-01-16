import React, { useEffect } from 'react'
import { categories } from '@/lib/utils'
// import EditorTest from '@/components/Editor'

const Home = () => {
    const test = JSON.stringify([
        {
          "id": "d5eb5f1a-b762-4f1f-bc20-6dceaacabab9",
          "type": "heading",
          "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left",
            "level": 1
          },
          "content": [
            {
              "type": "text",
              "text": "WTF",
              "styles": {}
            }
          ],
          "children": []
        },
        {
          "id": "150a205d-60b0-4a4f-b289-ce7a98b5c437",
          "type": "paragraph",
          "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left"
          },
          "content": [
            {
              "type": "text",
              "text": "sjfnoe woeifj woflkmwfwlkf wlfmw wlmef spoij",
              "styles": {}
            }
          ],
          "children": []
        },
        {
          "id": "7094fddb-8b69-40e0-be97-b29860361a17",
          "type": "paragraph",
          "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left"
          },
          "content": [],
          "children": []
        }
      ])

  return (
    <div className=''>
        <div className="flex items-center gap-5 my-4">
          <i className="uil uil-layers text-9xl"></i>
          <div className="">
            <div className="text-5xl font-bold">Culture Canvas</div>
            <div className="">From soulful tunes to runway chic, blockbuster films to sports spectacles, chic interiors to culinary delights.</div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="">
            <input
              className='flex h-9 rounded-full w-80 border border-input bg-secondary px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              type="text"
              placeholder='search'
            />
          </div>
          <div className="flex items-center gap-4">
            {categories.map((cat, index) => (
              <button className='bg-secondary px-4 py-1 capitalize' key={index}>{cat}</button>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Home
