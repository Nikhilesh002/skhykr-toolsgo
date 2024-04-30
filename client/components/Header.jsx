import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className="d-flex justify-content-between py-1">
      <div className="ps-5">
      <h1 className='display-6 text-white rounded bg-success px-2 py-1 text-center mb-0'>Tools-Go</h1>
      </div>
      <div className="">
      <ul className='nav justify-content-end fs-4 p-0'>
            <li className='nav-item'>
                <Link className='nav-link' to='signin'>Sign-In</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='signup'>Sign-Up</Link>
            </li>
        </ul>
      </div>
        
    </div>
  )
}

export default Header;