import React from 'react'

const Main = () => {
  return (
    <div className='main'>
      <video
        src="/media/videos/766463_Office Angry Rage Frozen Moment_By_MXR_Productions_Artlist_HD.mp4"
        autoPlay
        loop
        muted
        style={{
          position: 'relative', 
          top: 0,
          left: 0,
          width: '100%', 
          height: '100vh', 
          objectFit: 'cover' 
        }}
      />
    </div>
  )
}

export default Main
