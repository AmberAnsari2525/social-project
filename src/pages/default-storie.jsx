import React from 'react';

// Component for each individual story card
const StoryCard = ({imageUrl, userImage, userName, isVideo, videoUrl}) => {
    return (
        <div className="col-md-3 col-xss-6 pe-2 ps-2">
            <div
                className={`card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 ${
                    !isVideo ? 'bg-image-cover' : ''
                }`}
                style={{backgroundImage: !isVideo ? `url(${imageUrl})` : 'none'}}
            >
                {isVideo && (
                    <video autoPlay loop className="float-right w-100">
                        <source src={videoUrl} type="video/mp4"/>
                    </video>
                )}
                <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                    <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                        <img
                            src={userImage}
                            alt="user"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                        />
                    </figure>
                    <div className="clearfix"></div>
                    <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">
                        {userName}
                    </h4>
                </div>
            </div>
        </div>
    );
};

// Main stories component
const Stories = () => {
    const stories = [
        {
            imageUrl: 'images/s-1.jpg',
            userImage: 'images/user-7.png',
            userName: 'Victor Exrixon',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-2.jpg',
            userImage: 'images/user-12.png',
            userName: 'Surfiya Zakir',
            isVideo: false,
        },
        {
            videoUrl: 'images/s-4.mp4',
            userImage: 'images/user-4.png',
            userName: 'Goria Coast',
            isVideo: true,
        },
        {
            videoUrl: 'images/s-3.mp4',
            userImage: 'images/user-3.png',
            userName: 'Hurin Seary',
            isVideo: true,
        },
        {
            imageUrl: 'images/s-5.jpg',
            userImage: 'images/user-2.png',
            userName: 'Victor Exrixon',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-6.jpg',
            userImage: 'images/user-8.png',
            userName: 'Surfiya Zakir',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-7.jpg',
            userImage: 'images/user-4.png',
            userName: 'Goria Coast',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-8.jpg',
            userImage: 'images/user-3.png',
            userName: 'Hurin Seary',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-9.jpg',
            userImage: 'images/user-7.png',
            userName: 'Victor Exrixon',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-10.jpg',
            userImage: 'images/user-12.png',
            userName: 'Surfiya Zakir',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-11.jpg',
            userImage: 'images/user-4.png',
            userName: 'Goria Coast',
            isVideo: false,
        },
        {
            imageUrl: 'images/s-12.jpg',
            userImage: 'images/user-3.png',
            userName: 'Hurin Seary',
            isVideo: false,
        },
    ];

    return (
        <div>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                <div className="card-body d-flex align-items-center p-0">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Storie</h2>
                                    <div className="search-form-2 ms-auto">
                                        <i className="ti-search font-xss"></i>
                                        <input
                                            type="text"
                                            className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                            placeholder="Search here."
                                        />
                                    </div>
                                    <button className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                                        <i className="feather-filter font-xss text-grey-500"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="row ps-2 pe-1">
                                {stories.map((story, index) => (
                                    <StoryCard key={index} {...story} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stories;
