import React, { useState } from 'react'
import './LoginScreen.css'
import SignInScreen from './SignInScreen'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)

    const handleLogin = () => {
        setSignIn(true)
    }

    return (
        <div className='loginScreen'>
            <div className='loginScreen__background'>
                <div className='loginScreen__nav'>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix-logo-red-black-png"
                        className='loginScreen__logo'
                    />
                    {!signIn ? (
                        <button onClick={handleLogin} className='loginScreen__btn netflix__btn'>Đăng nhập</button>
                    ) : (<></>)}

                </div>
                <div className="loginScreen__slogan">
                    {signIn ? (
                        <SignInScreen />
                    ) : (
                        <>
                            <h1 className='slogan'>Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.</h1>
                            <h3 className='slogan2'>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</h3>
                            <h4>Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</h4>
                            <form className='register__box'>
                                <input className='enter__Email' type='text' placeholder='Nhập email'></input>
                                <button onClick={handleLogin} className='register__btn netflix__btn'>
                                    Bắt đầu
                                    <span><i className="fa-solid fa-chevron-right"></i></span>
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginScreen