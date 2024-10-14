import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/style.css';
import './css/emoji.css'
import './css/feather.css'
import './css/lightbox.css'
import './css/themify-icons.css'
import './css/bootstrap-datetimepicker.css'
import './css/video-player.css'
import './index.css'
import {AuthProvider} from './Context/Authcontext';
import AuthContext from './Context/Authcontext';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Forget} from "./pages/forgot";
import {RegisterPage} from "./pages/register";
import {Loginpage} from "./pages/login";
import {DefaultPage} from './pages/default'
import {DefaultHotel} from "./pages/default-hotel";
import {DefaultEvent} from "./pages/default-event";
import {DefaultLiveStream} from "./pages/default-live-stream";
import {DefaultMsg} from "./pages/default-msg";
import {EmailBox} from "./pages/emailBox";
import {DefaultEmailOpen} from "./pages/default-email-open";
import {DefaultVideo} from "./pages/default-video";
import UserCard from './pages/default-badge';
import Stories from "./pages/default-storie";
import Card from "./pages/default-group";
import UserProfile from "./pages/user-page";
import Settings from "./pages/default-setting";
import AccountDetails from "./pages/account-information";
import ContactInformation from "./pages/contact-information";
import SocialNetworkSettings from "./pages/social";
import PaymentMethod from "./pages/payment";
import ChangePassword from "./pages/password";
import Notifications from "./pages/default-notification";
import WelcomePage from "./pages/help-box";
import MainLayout from './pages/mainLayout';
import {Shop} from './pages/shop-2';
import {AnayLatics} from "./pages/anaylatics";
import {DetailHotel} from './pages/detailhotel'
import FriendsList from "./pages/default-member";
import Users from "./pages/user"
import UserViewProfile from './pages/view-profile'
import {UpdatePost} from "./pages/UpdatePost";

function App() {
    return (

        <Router>
            <AuthProvider>
                <div>
                    <Routes>
                        {/* Routes without Navbar (Login, Signup, Forgot Password) */}
                        <Route path="/" element={
                            <AuthContext.Consumer>
                                {({ preventAuthAccess }) => preventAuthAccess(RegisterPage)}
                            </AuthContext.Consumer>
                        } />
                        <Route path="/sign-up" element={
                            <AuthContext.Consumer>
                                {({ preventAuthAccess }) => preventAuthAccess(RegisterPage)}
                            </AuthContext.Consumer>
                        } />
                        <Route path="/log-in" element={
                            <AuthContext.Consumer>
                                {({ preventAuthAccess }) => preventAuthAccess(Loginpage)}
                            </AuthContext.Consumer>
                        } />
                        <Route path="/forgot" element={
                            <AuthContext.Consumer>
                                {({ preventAuthAccess }) => preventAuthAccess(Forget)}
                            </AuthContext.Consumer>
                        } />


                        {/* Routes with Navbar inside MainLayout  start*/}
                        <Route element={<MainLayout />}>
                            <Route path="/default" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth(DefaultPage)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-badge" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth(UserCard)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-stories" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (Stories)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-group" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (Card)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/user-page" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (UserProfile)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-settings" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (Settings)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/account-information" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (AccountDetails)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/contact-information" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (ContactInformation)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/social" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (SocialNetworkSettings)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/payment" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (PaymentMethod)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/password" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (ChangePassword)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-notification" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (Notifications)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/help-box" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (WelcomePage)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-emailopen" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (DefaultEmailOpen)}
                                </AuthContext.Consumer>
                            }/>
                            <Route path="/default-hotel" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (DefaultHotel)}
                                </AuthContext.Consumer>
                            }/>
                            <Route path="/default-event" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (DefaultEvent)}
                                </AuthContext.Consumer>
                            }/>
                            <Route path="/default-live-stream" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (DefaultLiveStream)}
                                </AuthContext.Consumer>
                            }/>
                            <Route path="/default-message" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth (DefaultMsg)}
                                </AuthContext.Consumer>
                            }/>


                            <Route path="/default-video" element={
                                <AuthContext.Consumer>
                                    {({requireAuth}) => requireAuth(DefaultVideo)}
                                </AuthContext.Consumer>
                            }/>
                            <Route path="/shop-2" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth(Shop)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-analytics" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth(AnayLatics)}
                                </AuthContext.Consumer>
                            } /> DetailHotel
                            <Route path="/hotel-detail" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth(DetailHotel)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/default-member" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth(FriendsList)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/user" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth(Users)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/:id/user-view-profile" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth (UserViewProfile)}
                                </AuthContext.Consumer>
                            } />
                            <Route path="/update-post/:id" element={
                                <AuthContext.Consumer>
                                    {({ requireAuth }) => requireAuth(UpdatePost)}
                                </AuthContext.Consumer>
                            } />


                            <Route path="/user-page" element={
                                <AuthContext.Consumer>
                                    {({requireAuth }) => requireAuth (UserProfile)}
                                </AuthContext.Consumer>
                            } />
                        </Route>

                        {/* Routes with Navbar inside MainLayout end */}

                        <Route path="/default-emailbox" element={
                            <AuthContext.Consumer>
                                {({requireAuth }) => requireAuth(EmailBox)}
                            </AuthContext.Consumer>
                        } />


                    </Routes>
                </div>
            </AuthProvider>
        </Router>

    );
}

export default App;
