import React from 'react'

type Props = {}

const FooterClient = (props: Props) => {
  return (
    <footer className="bg-black text-white py-8 mt-10">
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold">MangaKa</div>
        <p className="mt-2 text-sm">Your destination for Manga, Manhua, and more!</p>
      </div>
  
      <div className="text-center mb-6">
        <p className="text-sm">Email: contact@mangaka.com</p>
        <p className="text-sm">Phone: +123 456 789</p>
      </div>
  
      <div className="text-center mt-8">
        <p>&copy; 2024 MangaKa. All rights reserved.</p>
        <p className="text-sm">Designed by YourName</p>
      </div>
    </div>
  </footer>
  
  )
}

export default FooterClient
