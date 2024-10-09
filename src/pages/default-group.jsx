import React from 'react';
import '../css/style.css';

const GroupComponent = () => {
    return (
        <>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                <div className="card-body d-flex align-items-center p-0">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Group</h2>
                                    <div className="search-form-2 ms-auto">
                                        <i className="ti-search font-xss"></i>
                                        <input
                                            type="text"
                                            className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                            placeholder="Search here."
                                        />
                                    </div>
                                    <a href="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                                        <i className="feather-filter font-xss text-grey-500"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="row ps-2 pe-1">
                                {cardData.map((card, index) => (
                                    <Card key={index} card={card}/>
                                ))}
                                <div className="col-md-12 pe-2 ps-2">
                                    <div
                                        className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                        <div className="snippet mt-2 ms-auto me-auto color-theme-blue "
                                             data-title=".dot-typing">
                                            <div className="stage">
                                                <div className="dot-typing"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Card = ({card}) => {
    return (
        <div className="col-md-6 col-sm-6 pe-2 ps-2 ">
            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                <div
                    className="card-body position-relative h100 bg-image-cover bg-image-center"
                    style={{backgroundImage: `url(${card.bgImage})`}}
                ></div>
                <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                    <figure
                        className="avatar position-absolute w75 z-index-1"
                        style={{top: '-40px', left: '15px'}}
                    >
                        <img src={card.avatar} alt="avatar" className="float-right p-1 bg-white rounded-circle w-100"/>
                    </figure>
                    <div className="clearfix"></div>
                    <h4 className="fw-700 font-xsss mt-3 mb-1">{card.name}</h4>
                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">{card.email}</p>
                    <span className="position-absolute right-15 top-0 d-flex align-items-center">
            <a href="#" className="d-lg-block d-none">
              <i className="feather-video btn-round-md font-md bg-primary text-white"></i>
            </a>
            <a
                href="#"
                className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
            >
              FOLLOW
            </a>
          </span>
                </div>
            </div>
        </div>
    );
};

// Sample card data, you can replace this with API data
const cardData = [
    {
        name: 'Victor Exrixon',
        email: 'support@gmail.com',
        avatar: 'images/user-12.png',
        bgImage: 'images/bb-16.png'
    },
    {
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        avatar: 'images/user_1.png',
        bgImage: 'images/e-4.jpg'
    },
    {
        name: 'Goria Coast',
        email: 'support@gmail.com',
        avatar: 'images/user-8.png',
        bgImage: 'images/bb-9.jpg'
    },
    {
        name: 'Hurin Seary',
        email: 'support@gmail.com',
        avatar: 'images/user_2.png',
        bgImage: 'images/e-3.jpg'
    },
    {
        name: 'David Goria',
        email: 'support@gmail.com',
        avatar: 'images/user-2.png',
        bgImage: 'images/e-1.jpg'
    },
    {
        name: 'Seary Victor',
        email: 'support@gmail.com',
        avatar: 'images/user-5.png',
        bgImage: 'images/e-2.jpg'
    }
];

export default GroupComponent;
