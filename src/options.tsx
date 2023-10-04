
import React from 'react'
import {createRoot} from 'react-dom/client'
import "./input.css"

const test = <h1 className='text-green-500'>options</h1>


const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)


