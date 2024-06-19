import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppMenu from './AppMenu';
import { classNames } from 'primereact/utils';
import logo from './assets/images/rrLogo.png';

const AppTopbar = (props: any) => {
    const onTopbarSubItemClick = (event: any) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="layout-topbar">
                <div className="layout-topbar-left">
                    <button className="topbar-menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>

                    <button className="logo p-link" onClick={() => navigate('/')}>
                        <img src={logo} alt="logo" />
                    </button>

                    {/* <button className="app-name p-link" onClick={() => navigate('/')}> */}
                    <p className="ml-3 p-link" style={{ fontSize: '1.6em' }} onClick={() => navigate('/')}>
                        Read & Reflect
                    </p>
                    {/* </button> */}
                </div>

                <AppMenu
                    model={props.items}
                    menuMode={props.menuMode}
                    colorScheme={props.colorScheme}
                    menuActive={props.menuActive}
                    activeInlineProfile={props.activeInlineProfile}
                    onSidebarMouseOver={props.onSidebarMouseOver}
                    onSidebarMouseLeave={props.onSidebarMouseLeave}
                    toggleMenu={props.onToggleMenu}
                    onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
                    onMenuClick={props.onMenuClick}
                    onRootMenuItemClick={props.onRootMenuItemClick}
                    onMenuItemClick={props.onMenuItemClick}
                />

                <div className="layout-topbar-right">
                    <ul className="layout-topbar-right-items">
                        <li id="profile" className={classNames('profile-item', { 'active-topmenuitem': props.topbarMenuActive })}>
                            <button className="p-link" onClick={props.onTopbarItemClick}>
                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${'HQ'}`} alt="profile" style={{ width: '44px', height: '44px', borderRadius: '25px' }} />
                            </button>

                            <ul className="fadeInDown">
                                <li role="menuitem">
                                    <button className="p-link" onClick={onTopbarSubItemClick}>
                                        <i className="pi pi-fw pi-user"></i>
                                        <span>Profile</span>
                                    </button>
                                </li>
                                <li role="menuitem">
                                    <button className="p-link" onClick={onTopbarSubItemClick}>
                                        <i className="pi pi-fw pi-cog"></i>
                                        <span>Settings</span>
                                    </button>
                                </li>
                                <li role="menuitem">
                                    <button className="p-link" onClick={onTopbarSubItemClick}>
                                        <i className="pi pi-fw pi-sign-out"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                        {/* <li>
                            <button className="p-link">
                                <i className="topbar-icon pi pi-fw pi-bell"></i>
                                <span className="topbar-badge">2</span>
                                <span className="topbar-item-name">Notifications</span>
                            </button>
                        </li>
                        <li>
                            <button className="p-link">
                                <i className="topbar-icon pi pi-fw pi-comment"></i>
                                <span className="topbar-badge">5</span>
                                <span className="topbar-item-name">Messages</span>
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AppTopbar;
