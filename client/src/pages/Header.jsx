import React from 'react';
import LogoutBtn from '../components/LogoutBtn';
import Logo from '../assets/Logo';
import { useNavigate } from 'react-router-dom';


function Header() {

  const authStatus=false;
  const navigate=useNavigate();

  const navItems=[
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "SignIn",
      slug: 'signin',
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: 'signup',
      active: !authStatus,
    }
  ];

  return (
    <header className='w-full py-3 ps-5 pe-12 bg-black'>
      <div className="flex ">
        <div className="">
          <Logo width='100px'/>
        </div>
        <ul className='flex ml-auto'>
          {
            navItems.map(x=>
              x.active?(
                <li key={x.name}>
                  <button className='inline-bock font-mono font-bold text-xl text-white px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full'
                    onClick={()=>navigate(x.slug)}>
                    {x.name}
                  </button>
                </li>
              ):null
            )
          }
          {
            authStatus && (<li><LogoutBtn/></li>)
          }
        </ul>
      </div>
    </header>
  )
}

export default Header;