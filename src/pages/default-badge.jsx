import React from 'react';

const users = [
    {
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        connections: '500+',
        followers: '88.7k',
        followings: '1,334',
        badges: ['top-student.svg', 'onfire.svg', 'challenge-medal.svg', 'fast-graduate.svg'],
        avatar: 'images/user_2.png',
    },
    {
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        connections: '30+',
        followers: '8.7k',
        followings: '634',
        badges: ['top-student.svg', 'challenge-medal.svg', 'fast-graduate.svg'],
        avatar: 'images/user-25.png',
    },
    {
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        connections: '20+',
        followers: '57k',
        followings: '634',
        badges: ['top-student.svg', 'challenge-medal.svg', 'fast-graduate.svg'],
        avatar: 'images/user-24.png',
    },
    {
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        connections: '500+',
        followers: '88.7k',
        followings: '1,334',
        badges: ['onfire.svg', 'challenge-medal.svg', 'fast-graduate.svg'],
        avatar: 'images/user-22.png',
    },
    {
        name: 'Aliqa Macale ',
        email: 'support@gmail.com',
        connections: '500+',
        followers: '88.7 k',
        followings: '1,334',
        badges: ['top-student.svg', 'challenge-medal.svg', 'fast-graduate.svg'],
        avatar: 'images/user-21.png',
    },
    {
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        connections: '44+',
        followers: '857k',
        followings: '154',
        badges: ['top-student.svg', 'challenge-medal.svg', 'fast-graduate.svg'],
        avatar: 'images/user_1.png',
    },
];

const UserCard = ({user}) => (
    <div className="col-md-4 col-sm-6 pe-2 ps-2">
        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
            <div className="card-body d-block w-100 p-4 text-center">
                <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                    <img src={user.avatar} alt="avatar" className="float-right p-1 bg-white rounded-circle w-100"/>
                </figure>
                <div className="clearfix"></div>
                <h4 className="fw-700 font-xss mt-3 mb-0">{user.name}</h4>
                <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">{user.email}</p>
                <ul className="d-flex align-items-center justify-content-center mt-1">
                    <li className="m-2">
                        <h4 className="fw-700 font-sm">{user.connections}<span
                            className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Connections</span></h4>
                    </li>
                    <li className="m-2">
                        <h4 className="fw-700 font-sm">{user.followers}<span
                            className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Follower</span></h4>
                    </li>
                    <li className="m-2">
                        <h4 className="fw-700 font-sm">{user.followings}<span
                            className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Followings</span></h4>
                    </li>
                </ul>
                <ul className="d-flex align-items-center justify-content-center mt-1">
                    {user.badges.map((badge, index) => (
                        <li key={index} className="m-1">
                            <img src={`images/${badge}`} alt="badge"/>
                        </li>
                    ))}
                </ul>
                <a href="#"
                   className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">FOLLOW</a>
            </div>
        </div>
    </div>
);

const App = () => {
    return (
        <div>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                <div className="card-body d-flex align-items-center p-0">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Badge</h2>
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
                                {users.map((user, index) => (
                                    <UserCard key={index} user={user}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
