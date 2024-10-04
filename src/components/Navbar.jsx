import React from 'react'

function Navbar() {
  return (
    <nav className='bg-blue-600'>
        <div className="logo">PassGuard</div>
        <ul>
         <li><a href="/">HOME</a></li>
         <li><a href="#">ABOUT</a></li>
         <li><a href="#">Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
