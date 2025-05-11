import React from 'react'
import img1 from "./../../assets/contact.jpg"

export default function ContactUS() {
  return (
   <>
    <div className="container mx-auto">
    <div className="lg:flex p-10">
      <div className="Login lg:w-1/2 pb-4">
<form className="max-w-sm mx-auto lg:p-0 p-10">
  <h1 className=' font-bold text-2xl mt-20'>Contact Us</h1>
  <div className="mb-5 mt-10">
    <input type="text" id="fullname" className="contact_input w-full" placeholder="Full name" required />
  </div>
  <div className="mb-5">
  <input type="text" id="fullname" className="contact_input w-full" placeholder="E-mail" required />
  </div>
  <div className="mb-5">
  <input type="text" id="fullname" className="contact_input w-full" placeholder="Message" required />
  </div>
  <button type="submit" className="block mx-auto text-white main_color p-2 px-10 mt-10 border rounded-lg">Contact Us</button>
</form>

      </div>
      <div className="hidden lg:block lg:w-1/2">
      <img src={img1} alt="Login img" className='img_login h-[500px]'/>
      </div>

    </div>
   </div>
   </>
  )
}
