import React, { Component } from "react";
        import { connect } from "react-redux";
        import classNames from "classnames";
        import { AppTopbar } from "./AppTopbar";
        import { AppFooter } from "./AppFooter";
        import { AppMenu } from "./AppMenu";
        import { AppInlineProfile } from "./AppInlineProfile";
        import {
        /*BrowserRouter as Router,*/ Route,
                withRouter,
                Redirect,
                Switch
        } from "react-router-dom";
        import Logout from "./containers/Auth/Logout/Logout";
        import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
        import Menu from "./config/menu_constants";
        import Aux from "./hoc/Auxiliary";
        import asyncComponent from "./hoc/asyncComponent/asyncComponent";
        import "primereact/resources/themes/nova-light/theme.css";
        import "primereact/resources/primereact.min.css";
        import "primeicons/primeicons.css";
        import "primeflex/primeflex.css";
        import "fullcalendar/dist/fullcalendar.css";
        import "./layout/layout.css";
        import "./App.css";
        import axios from "axios";
        import * as actions from "./store/actions/index";
        const asyncAuth = asyncComponent(() => {
        return import("./containers/Auth/Auth");
        });
        const Dashboard = asyncComponent(() => {
        return import("./containers/Dashboard/Dashboard");
        });
        const Users = asyncComponent(() => {
        return import("./containers/User/Users");
        });
        const openChallenges = asyncComponent(() => {
        return import("./containers/Challenge/OpenChallenges");
        });
        const matchPlayed = asyncComponent(() => {
        return import("./containers/Challenge/MatchPlayedChallenges");
        });
        const contentManagement = asyncComponent(() => {
        return import("./containers/Cms/Pages");
        });
        const ForgotPassword = asyncComponent(() => {
        return import("./containers/ForgotPassword/ForgotPassword");
        });
        const frontPage = asyncComponent(() => {
        return import("./containers/Home/Front");
        });
        const updatePage = asyncComponent(() => {
        return import("./containers/Cms/UpdatePage");
        });
        const globalNotification = asyncComponent(() => {
        return import("./containers/GlobalNotification/GlobalNotification");
        });
        const globalNotificationList = asyncComponent(() => {
        return import("./containers/GlobalNotification/GlobalNotificationLists");
        });
        const acceptedChallenges = asyncComponent(() => {
        return import("./containers/Challenge/AcceptedChallenges");
        });
        const group = asyncComponent(() => {
        return import("./containers/Group/GroupLists");
        });
        const updateGroup = asyncComponent(() => {
        return import("./containers/Group/UpdateGroup");
        });
        const addGroup = asyncComponent(() => {
        return import("./containers/Group/AddGroup");
        });
        const feedback = asyncComponent(() => {
        return import("./containers/Feedback/FeedbackLists");
        });
        const feedbackReply = asyncComponent(() => {
        return import("./containers/Feedback/FeedbackReply");
        });
        const changePassword = asyncComponent(() => {
        return import("./containers/Setting/ChangePassword");
        });
        const manageProfile = asyncComponent(() => {
        return import("./containers/Setting/ViewProfile");
        });
        const editProfile = asyncComponent(() => {
        return import("./containers/Setting/UpdateProfile");
        });
        const viewUserDetail = asyncComponent(() => {
        return import("./containers/User/ViewDetail");
        });
        const updateUserLevel = asyncComponent(() => {
        return import("./containers/User/UpdateLevel");
        });
        const viewReport = asyncComponent(() => {
        return import("./containers/Group/ViewReport");
        });
        
        const imageUpload = asyncComponent(() => {
        return import("./containers/ImageUpload/ImageUpload");
        });
        
        const updateUserGroup = asyncComponent(() => {
        return import("./containers/User/UpdateGroup");
        });
        
         const selectBox = asyncComponent(() => {
        return import("./containers/User/SelectBox");
        });
        const port = 5000;
        axios.defaults.baseURL =
        window.location.protocol + "//" + window.location.hostname + ":" + port;
// axios.defaults.baseURL =
//   window.location.protocol + "//node.newmediaguru.co:" + port;
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
        );
        class App extends Component {
        constructor(props) {
        super(props);
                this.state = {
                layoutMode: "static",
                        layoutColorMode: "dark",
                        staticMenuInactive: false,
                        overlayMenuActive: false,
                        mobileMenuActive: false
                };
                this.createMenu();
        }

        initMap = () => {
        this.props.onGoogleMapLoad();
        };
                componentDidMount() {
        const gmapScriptEl = document.createElement(`script`)
                gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_Is11HwzMFGIFAU-q78V2kQUiT9OQiZI&libraries=places&callback=initMap`
                document.querySelector('head').insertAdjacentElement('beforeend', gmapScriptEl)
                window.initMap = this.initMap;
        }

        onWrapperClick = event => {
        if (!this.menuClick) {
        this.setState({
        overlayMenuActive: false,
                mobileMenuActive: false
        });
        }

        this.menuClick = false;
        };
                onToggleMenu = event => {
                this.menuClick = true;
                        if (this.isDesktop()) {
                if (this.state.layoutMode === "overlay") {
                this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
                });
                } else if (this.state.layoutMode === "static") {
                this.setState({
                staticMenuInactive: !this.state.staticMenuInactive
                });
                }
                } else {
                const mobileMenuActive = this.state.mobileMenuActive;
                        this.setState({
                        mobileMenuActive: !mobileMenuActive
                        });
                }

                event.preventDefault();
                };
                onSidebarClick = event => {
                this.menuClick = true;
                        setTimeout(() => {
                        if (this.layoutMenuScroller) this.layoutMenuScroller.moveBar();
                        }, 500);
                };
                onMenuItemClick = event => {
                if (!event.item.items) {
                this.setState({
                overlayMenuActive: false,
                        mobileMenuActive: false
                });
                }
                if (event.item.path) this.props.history.push(event.item.path);
                };
                createMenu = () => {
        this.menu = [...Menu.Menu];
        };
                addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
                else element.className += " " + className;
        };
                removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
                else
                element.className = element.className.replace(
                        new RegExp(
                                "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
                                "gi"
                                ),
                        " "
                        );
        };
                isDesktop = () => {
        return window.innerWidth > 1024;
        };
                componentDidUpdate() {
        if (this.state.mobileMenuActive)
                this.addClass(document.body, "body-overflow-hidden");
                else this.removeClass(document.body, "body-overflow-hidden");
        }

        render() {
        let logo =
                this.props.layoutColorMode === "dark"
                ? "assets/layout/images/logo-white.svg"
                : "assets/layout/images/logo.svg";
                let wrapperClass = classNames("layout-wrapper", {
                "layout-overlay": this.state.layoutMode === "overlay",
                        "layout-static": this.state.layoutMode === "static",
                        "layout-static-sidebar-inactive":
                        this.state.staticMenuInactive && this.state.layoutMode === "static",
                        "layout-overlay-sidebar-active":
                        this.state.overlayMenuActive && this.state.layoutMode === "overlay",
                        "layout-mobile-sidebar-active": this.state.mobileMenuActive
                });
                let sidebarClassName = classNames("layout-sidebar", {
                "layout-sidebar-dark": this.state.layoutColorMode === "dark"
                });
                const PATHNAME = "/admin/login";
                let redirect = null;
                let authRedirect = null;
                console.log("h", window.location);
                if (this.props.isAuthenticated && window.location.pathname === PATHNAME) {
        redirect = (
<Redirect
    to={{
        push: true,
                to: "/admin/dashboard"
    }}
    />
                );
                console.log("redirect", redirect);
        }
        return (
<div
    className={wrapperClass}
    onClick={this.props.isAuthenticated ? this.state.onWrapperClick : null}
    >
    {this.props.isAuthenticated ? (
    <Aux>
        <AppTopbar onToggleMenu={this.onToggleMenu} />

        <div
            ref={el => (this.sidebar = el)}
            className={sidebarClassName}
            onClick={this.onSidebarClick}
            >
            <ScrollPanel
                ref={el => (this.layoutMenuScroller = el)}
                style={{ height: "100%" }}
                >
                <div className="layout-sidebar-scroll-content">
                    <div className="layout-logo">

                    </div>
                    <AppInlineProfile />
                    <AppMenu
                        model={this.menu}
                        onMenuItemClick={this.onMenuItemClick}
                        />
                </div>
            </ScrollPanel>
        </div>
    </Aux>
                        ) : null}
    <div
        className={this.props.isAuthenticated ? "layout-main" : "login-box"}
        >
        <Switch>
        {this.props.isAuthenticated ? (
        <Aux>
            <Route path="/home" exact component={frontPage} />
            <Route path="/admin/selectbox" exact component={selectBox} />
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/logout" exact component={Logout} />
            <Route path="/admin/users" exact component={Users} />
            <Route path="/admin/open-challenges" exact component={openChallenges} />
            <Route path="/admin/match-played" exact component={matchPlayed} />
            <Route path="/admin/content-management" exact component={contentManagement} />
            <Route path="/admin/update-page/:slug" exact component={updatePage} />
            <Route path="/admin/global-notification" exact component={globalNotification} />
            <Route path="/admin/accepted-challenges" exact component={acceptedChallenges}/>
            <Route path="/admin/manage-groups" exact component={group}/>
            <Route path="/admin/update-group/:id" exact component={updateGroup} />
            <Route path="/admin/view-report/:id" exact component={viewReport} />
            <Route path="/admin/add-group" exact component={addGroup} />
            <Route path="/admin/manage-feedback" exact component={feedback} />
            <Route path="/admin/notification-lists" exact component={globalNotificationList} />
            <Route path="/admin/feedback-reply/:id" exact component={feedbackReply} />
            <Route path="/admin/change-password" exact component={changePassword} />
            <Route path="/admin/manage-profile" exact component={manageProfile} />
            <Route path="/admin/update-profile/:id" exact component={editProfile} />
            <Route path="/admin/user-detail/:id" exact component={viewUserDetail} />
            <Route path="/admin/update-level/:id" exact component={updateUserLevel} />
            <Route path="/admin/image-upload" exact component={imageUpload} />
             <Route path="/admin/update-user-group/:id" exact component={updateUserGroup} />
            <Route path={PATHNAME} component={asyncAuth} />
        </Aux>
                        ) : (
        <Aux>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path={PATHNAME} component={asyncAuth} />
            <Route
                path="/admin/forgot-password"
                exact
                component={ForgotPassword}
                />
                <Route
                path="/"
                exact
                component={asyncAuth}
                />
                <Route path="/home" exact component={frontPage} />
                <AppFooter />
               
        </Aux>
                        )}
        {redirect}
        </Switch>
    </div>
    {this.props.isAuthenticated ? (
    <Aux>
        <AppFooter />

        <div className="layout-mask" />
    </Aux>
                        ) : null}
</div>
                        );
                }
                }
                const mapStateToProps = state => {
                return {
                isAuthenticated: state.loginReducer.isAuthenticated,
                        authRedirectPath: state.loginReducer.authRedirectPath
                        //store:
                };
                };
                        const mapDispatchToProps = dispatch => {
                        return {
                        onGoogleMapLoad: () => dispatch(actions.loadGoogleMap())
                                };
                        }
                export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
