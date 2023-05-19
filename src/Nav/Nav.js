import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './Nav.css';
import './Responsive.css';
// import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

function Nav() {
    const history = useNavigate(); // thay cho useHistory() ở phiên bản v5
    const [show, handleShow] = useState(true);
    // const user = useSelector(selectUser);

    const search_Ref = useRef();
    const search_box_Ref = useRef();
    const search_input_Ref = useRef();
    const search_tab_Ref = useRef();

    const transitionNav = () => {
        if (window.scrollY < 200) handleShow(false);
        else handleShow(true);
    };

    /**
     * xử lý cho windown lắng nghe sự kiện scroll
     * hàm clearn up func giúp loại bỏ sự kiện khi k còn sử dụng
     * ngăn rò rỉ bộ nhớ và tránh các lỗi trong đó trình xử lý
     * sự kiện vẫn hoạt động ngay cả khi thành phần không còn trong DOM.
     *
     * Tham số thứ hai cho useEffect, là một mảng trống,
     * chỉ định rằng hiệu ứng chỉ được chạy một lần (khi gắn kết)
     * và không được chạy lại trong các lần kết xuất lại tiếp theo.
     */
    useEffect(() => {
        window.addEventListener('scroll', transitionNav);

        return () => window.removeEventListener('scroll', transitionNav);
    }, []);

    // xử lý khi chuyển tab thì sẽ cuộn lên trang đầu
    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    // Xủa lý sự kiện ẩn hiện thanh tìm kiếm
    const HandleSearch = () => {
        search_tab_Ref.current.classList.add('search-tab-hide');

        search_box_Ref.current.classList.add('show-search-box');

        search_input_Ref.current.classList.add('action');
        search_input_Ref.current.focus();
    };

    // xủa lý sự kiện khi click ra ngoài vùng search thì sẽ loại bỏ classes action
    const HandleClickOutSide = (e) => {
        e.stopPropagation();
        if (search_Ref.current && !search_Ref.current.contains(e.target)) {
            search_tab_Ref.current.classList.remove('search-tab-hide');

            search_box_Ref.current.classList.remove('show-search-box');

            search_input_Ref.current.classList.remove('action');
            search_input_Ref.current.value = '';
        }
    };

    useEffect(() => {
        document.addEventListener('click', HandleClickOutSide);

        return () => document.removeEventListener('click', HandleClickOutSide);
    }, []);

    return (
        <nav className={`nav ${show ? 'nav__black' : 'nav__black--gradien'}`}>
            <div className="nav__contents">
                <div className="nav-box">
                    <img
                        onClick={() => history('/')}
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix-logo-red-black-png"
                        className="nav__logo"
                    />

                    <ul className="nav__list">
                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} exact="true" to="/" active="true">
                                Trang chủ
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/TVShow">
                                Phim truyền hình
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/Anime">
                                Phim hoạt hình
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/MyList">
                                Danh sách của tôi
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/SearchByName">
                                Tìm kiếm theo tên
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <ul className="nav__user--box">
                    {/* Search */}
                    <li ref={search_Ref} className="search">
                        <div ref={search_box_Ref} className="search-box">
                            <button>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <div className="search-input-wrap">
                                <input
                                    ref={search_input_Ref}
                                    className="search-input"
                                    htmlFor="text"
                                    placeholder="Phim, diễn viên, thể loại ..."
                                />
                            </div>
                        </div>
                        <button ref={search_tab_Ref} className="search-tab" onClick={() => HandleSearch()}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </li>

                    {/* Trẻ em */}
                    <li className="for__kid">Trẻ em</li>

                    {/* Notification */}
                    <li className="notification">
                        <div className="notify__icon">
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="notificaion__list">
                            <h3 className="notify__list--title">Thông báo</h3>
                            <ul className="notificaion__list--body">
                                {/* <h3>Hiện chưa có thông báo nào</h3> */}
                                <li className="notif__item">
                                    <img
                                        className="notif__item--img"
                                        src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
                                        alt="Hình ảnh thông báo bộ phim sắp chiếu"
                                    />
                                    <div className="notif__item--text">
                                        <h3>Ra mắt vào mùng 4 tháng 5</h3>
                                        <h3>Phát trailer</h3>
                                        <p>Hôm nay</p>
                                    </div>
                                </li>

                                <li className="notif__item">
                                    <img
                                        className="notif__item--img"
                                        src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
                                        alt="Hình ảnh thông báo bộ phim sắp chiếu"
                                    />
                                    <div className="notif__item--text">
                                        <h3>Ra mắt vào mùng 4 tháng 5</h3>
                                        <h3>Phát trailer</h3>
                                        <p>Hôm nay</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* User */}
                    <li>
                        <div className="account-menu-item">
                            <div className="account-dropdown">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                                    alt="Netflix User Avatar"
                                    className="nav__avatar"
                                />

                                <span>
                                    <i className="rotate-icon fa-solid fa-caret-down"></i>
                                </span>
                            </div>

                            <ul className="subnav-account-menu">
                                <li
                                    className="menu-item li-hover"
                                    onClick={() => alert('This feature is in development ...')}
                                >
                                    <span>
                                        <i className="fa-solid fa-pen"></i>
                                    </span>
                                    Quản lý hồ sơ
                                </li>
                                <li className="menu-item">
                                    <span>
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <NavLink className="li-hover" to="/your-Account">
                                        Tài khoản
                                    </NavLink>
                                </li>
                                <li className="menu-item" onClick={() => alert('This feature is in development ...')}>
                                    <span>
                                        <i className="fa-solid fa-circle-question"></i>
                                    </span>
                                    Trung tâm trợ giúp
                                </li>
                                <li className="logout-netflix li-hover" onClick={() => auth.signOut()}>
                                    Đăng xuất khỏi netflix
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
