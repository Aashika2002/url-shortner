import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Homepage() {
    const [url, setURL] = useState("");
    let [shorturl, setshortURL] = useState();
    const [copied, setcopied] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(url)
        axios.post("http://localhost:8001/url", { url: url }).then(({ data }) => {
            const id = data.id;
            setshortURL(`http://localhost:8001/${id}`)
        }).catch(err => console.log(err))
    }

  
    useEffect(() => {
        const timer = setTimeout(() => {
            setcopied(false)

        }, 1000);
        return () => clearTimeout(timer);

    }, [copied]);

    const imageURL = "https://s17233.pcdn.co/blog/wp-content/uploads/2017/08/Q119_Marketing_social_2_0124.png";

    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <div className='h-screen bg-cover' style={{ backgroundImage: `url(${imageURL})` }}>
            <div className='flex justify-center items-center '>
                <div className='bg-black sm:h-1/3 sm:w-3/5  bg-opacity-50 sm:my-20  my-40 h-1/3 w-full '>
                    <div className='flex flex-col justify-center sm:my-32  mx-4 '>
                        <div>
                            <h1 className='font-nunito text-3xl sm:text-5xl  font-bold  text-center my-6 sm:my-8'>Welcome to My URL Shortner</h1>
                        </div>
                        <div className='text-center text-xl sm:text-2xl font-nunito '>
                            <form method="post">
                                <input type="text" onChange={(e) => setURL(e.target.value)} value={url} className='rounded-l-md sm:p-3 p-2 my-4 bg-transparent border-white border-2 w-3/5  ' placeholder='Enter your URL' />
                                <button onClick={handleSubmit} className='rounded-r-md   border-2 sm:p-3 p-2 bg-blue-500 hover:bg-transparent'>Short URL</button>
                            </form>
                            {shorturl && <div className='flex justify-center'>
                                <p className='rounded-l-md sm:p-3 p-2  bg-transparent border-white border-2 w-3/5 text-left ' value={shorturl} placeholder='Shorten URL'>{shorturl}</p>
                                <CopyToClipboard text={shorturl} onCopy={() => setcopied(true)}>
                                    <button className='rounded-r-md   border-2 sm:p-3 p-2 bg-blue-500 hover:bg-transparent'>Copy URL</button>
                                </CopyToClipboard>
                            </div>}
                            {copied ? <span className=' py-2'>Copied</span> : null}
                            <div className='mt-10 '>
                                <a href={shorturl} target='_blank' className='rounded   border-2 sm:p-3 p-2 bg-blue-500 hover:bg-transparent mx-5'>
                                Redirect
                                </a>
                                <button onClick={refreshPage} className='rounded   border-2 sm:p-2 p-2 bg-blue-500 hover:bg-transparent'>Refresh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Homepage
