import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import './App.css';

function App() {
  // const [users, setUsers] = useState([])
  const [sideUser, setSideUser] = useState({})
  const { profile, Bio, jobTitle } = sideUser

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`https://602e7c2c4410730017c50b9d.mockapi.io/users`)
      const data = await res.json()
      return data
    }
  })


  const handleUser = (id = 2) => {
    console.log(id);
    fetch(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`)
      .then(res => res.json())
      .then(data => setSideUser(data))
  }

  if (isLoading) {
    return <div className='w-full flex min-h-screen items-center justify-center'>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />
    </div>
  }

  return (
    <div className="container mx-auto">
      <section className='flex flex-col-reverse md:flex-row justify-between mt-[5rem]'>
        {/* left side */}
        <aside className=''>
          <div className='w-[39rem] bg-[#C5DFFF] h-[70px] flex items-center justify-center text-[24px] rounded-t-lg'>
            <p>USERS LIST</p>
          </div>

          {
            users?.map((user, i) => {
              const { profile, id } = user
              return (
                <div onClick={() => handleUser(id)} key={i} className='w-[39rem] cursor-pointer h-[66px] bg-[#ECECEC] my-2 rounded-md pl-2'>
                  <div className='w-full flex items-center gap-3 h-full'>
                    <img className='w-12 h-12' src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" alt="" />
                    <h2 className='text-2xl'>{profile?.firstName} {profile?.lastName}</h2>
                  </div>
                </div>
              )
            })
          }
        </aside>

        {/* Right side */}
        <aside className=''>
          <div className='w-[39rem] bg-[#C5DFFF] h-[70px] flex items-center justify-center text-[24px] rounded-t-lg'>
            <p>USER DETAILS</p>
          </div>

          <div className='w-full flex flex-col items-center'>
            <img className='w-32 h-32 mt-7' src={`https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png`} alt="" />
            <h2 className='text-2xl'>{profile?.username}</h2>
          </div>

          <div className='w-[19rem] h-[5.5rem] bg-[#DBDBDB] mx-auto mt-7 rounded-md border border-[#6C6C6C] p-2 font-semibold'>
            {Bio && Bio}
          </div>

          <div className='w-[19rem] mx-auto mt-7'>
            <label>Full Name</label>
            <div className='w-[19rem] h-8 bg-[#DBDBDB] rounded-md border border-[#6C6C6C] p-[0.2rem] font-semibold' type="text" >{profile?.firstName} {profile?.lastName}</div>
            <article className='my-2'>
              <label>Job Title</label>
              <div className='w-[19rem] h-8 bg-[#DBDBDB] rounded-md border border-[#6C6C6C] p-[0.2rem] font-semibold' type="text" >
                {jobTitle && jobTitle}
              </div>
            </article>
            <label>Email</label>
            <div className='w-[19rem] h-8 bg-[#DBDBDB] rounded-md border border-[#6C6C6C] p-[0.2rem] font-semibold' type="text" >
              {profile?.email}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default App;
