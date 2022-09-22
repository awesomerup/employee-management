import React from 'react';
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='home'>
            <div className='home-image'>
                <img src="https://th.bing.com/th/id/R.58d5d1ea372f46397041d43bfbc52d48?rik=d2AxDLCa8E945w&riu=http%3a%2f%2f4.bp.blogspot.com%2f-qhglf124V_8%2fUQpvkdxXNRI%2fAAAAAAAABXI%2f0JUyFAhi6kM%2fs1600%2femployee-Management-System.jpg&ehk=Mp%2bbF1NMC4UAc2o%2bBnzZSeVIDrUPjydLVubc5UPFw%2bQ%3d&risl=&pid=ImgRaw&r=0" alt="home" />
            </div>
            <div className='text-center'>
                <Link to='/register'><button className='btn btn-info'>REGISTER</button></Link>
            </div>
        </div>
    );
}


export default Home;
