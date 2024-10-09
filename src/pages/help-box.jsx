import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const WelcomePage = () => {
    return (
        <div>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div
                                className="card w-100 border-0 p-0 rounded-3 overflow-hidden bg-image-contain bg-image-center"
                                style={{backgroundImage: 'url(images/help-bg.png)'}}
                            >
                                <div className="card-body p-md-5 p-4 text-center"
                                     style={{backgroundColor: 'rgba(0,85,255,0.8)'}}>
                                    <h2 className="fw-700 display2-size text-white display2-md-size lh-2">
                                        Welcome to the Sociala Community!
                                    </h2>
                                    <p className="font-xsss ps-lg-5 pe-lg-5 lh-28 text-grey-200">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor,
                                        ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra.
                                        Proin blandit ac massa sed rhoncus
                                    </p>
                                    <div
                                        className="form-group w-lg-75 mt-4 border-light border p-1 bg-white rounded-3 ms-auto me-auto">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group icon-input mb-0">
                                                    <i className="ti-search font-xs text-grey-400"></i>
                                                    <input
                                                        type="text"
                                                        className="style1-input border-0 ps-5 font-xsss mb-0 text-grey-500 fw-500 bg-transparent"
                                                        placeholder="Search anything.."
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <a href="#"
                                                   className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase">
                                                    Search
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-100 border-0 shadow-none bg-transparent mt-5">
                                <div id="accordion" className="accordion mb-0">
                                    <div className="card shadow-xss">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button
                                                    className="btn btn-link collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-expanded="false"
                                                    aria-controls="collapseOne"
                                                >
                                                    I have read and agree to the Privacy Policy and Terms & Conditions*
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                             data-bs-parent="#accordion">
                                            <div className="card-body">
                                                <p>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                    single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                                    keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                                    occaecat craft beer farm-to-table, raw denim aesthetic synth
                                                    nesciunt you probably haven't heard of them accusamus labore
                                                    sustainable VHS.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-xss">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <button
                                                    className="btn btn-link collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo"
                                                >
                                                    You can easily build a page without any design or custom coding.
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                             data-bs-parent="#accordion">
                                            <div className="card-body">
                                                <p>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                    single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                                    keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                                    occaecat craft beer farm-to-table, raw denim aesthetic synth
                                                    nesciunt you probably haven't heard of them accusamus labore
                                                    sustainable VHS.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-xss">
                                        <div className="card-header" id="headingFour">
                                            <h5 className="mb-0">
                                                <button
                                                    className="btn btn-link collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseFour"
                                                    aria-expanded="false"
                                                    aria-controls="collapseFour"
                                                >
                                                    I have read and agree to the Privacy Policy and Terms & Conditions*
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                             data-bs-parent="#accordion">
                                            <div className="card-body">
                                                <p>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                    single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                                    keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                                    occaecat craft beer farm-to-table, raw denim aesthetic synth
                                                    nesciunt you probably haven't heard of them accusamus labore
                                                    sustainable VHS.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-xss">
                                        <div className="card-header" id="headingFive">
                                            <h5 className="mb-0">
                                                <button
                                                    className="btn btn-link collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseFive"
                                                    aria-expanded="false"
                                                    aria-controls="collapseFive"
                                                >
                                                    I have read and agree to the Privacy Policy and Terms & Conditions*
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseFive" className="collapse" aria-labelledby="headingFive"
                                             data-bs-parent="#accordion">
                                            <div className="card-body">
                                                <p>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                    single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                                    keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                                    occaecat craft beer farm-to-table, raw denim aesthetic synth
                                                    nesciunt you probably haven't heard of them accusamus labore
                                                    sustainable VHS.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-xss">
                                        <div className="card-header" id="headingThree">
                                            <h5 className="mb-0">
                                                <button
                                                    className="btn btn-link collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseThree"
                                                    aria-expanded="false"
                                                    aria-controls="collapseThree"
                                                >
                                                    Stream that converts more visitors than any website.
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                             data-bs-parent="#accordion">
                                            <div className="card-body">
                                                <p>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                    terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                    single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                                    keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                                    occaecat craft beer farm-to-table, raw denim aesthetic synth
                                                    nesciunt you probably haven't heard of them accusamus labore
                                                    sustainable VHS.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
