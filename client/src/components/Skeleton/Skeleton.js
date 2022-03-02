import React from 'react';
import './skeleton.css';

function Skeleton({type}) {

  //create skeleton components to render skeleton (for posts and sidebar followings)
    //Posts skeleton component
    const PostsSkeleton = () => (
      <div className='_postSkeleton' >
          {/* top part (user info post time and edit post) */}
        <div className="post-topSkeleton">
          <span className="user-iconSkeleton"></span>
          <div className="user-name-dateSkeleton">
            <span className="user-nameSkeleton"></span>
            <span className="post-dateSkeleton"></span>
          </div>
        </div>
        {/* midle part ( post text) */}
        <div className="post-contentSkeleton">
          <p className="post-descSkeleton"></p>
          <p className="post-descSkeleton"></p>
          <p className="post-descSkeleton"></p>
        </div>
        <div className="post-bottomSkeleton">
          <span className="post-likeSkeleton"></span>
          <span className="post-likes-numberSkeleton"></span>
        </div>
      </div>
    )

    //Sidebar followings skeleton component
    const FollowingsSkeleton = () => (
      <div className='followerSkeleton'>
        <span className='followerSkeletonIcon'></span>
        <span className='followerSkeletonName'></span>
      </div>
    )


  if(type === 'posts'){
    return Array(3).fill(<PostsSkeleton />)
  }else if(type === 'sidebarFollowers'){
    return Array(3).fill(<FollowingsSkeleton/>)
  }
}

export default Skeleton;