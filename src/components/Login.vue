<template>
    <div class="login-container">
      <div class="login-box">
        <img src="/logo-icon.png" alt="Logo" class="logo" />
        <form class="login-form">
          <label for="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력하세요" />
  
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
  
          <div class="remember-me">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">로그인 유지</label>
          </div>
  
          <button type="submit" class="login-button">로그인</button>
        </form>
  
        <div class="links">
          <a href="#" class="find-password">비밀번호 찾기</a>
          <a href="#" class="signup">회원가입</a>
        </div>
  
        <div class="social-login">
          <span>또는</span>
          <div class="social-icons">
            <img src="/kakao-icon.png" alt="Kakao" />
            <img src="/naver-icon.png" alt="Naver" />
            <img src="/google-icon.png" alt="Google" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  
  .login-box {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 16px;
    padding: 40px;
    width: 360px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .logo {
    width: 80px;
    height: auto;
    margin-bottom: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .login-form label {
    font-size: 14px;
    color: #fff;
    text-align: left;
  }
  
  .login-form input {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.35);
    color: #3a5a40;
    font-size: 14px;
  }
  
  .login-form input::placeholder {
    color: rgba(58, 90, 64, 0.7);
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #fff;
  }
  
  .login-button {
    padding: 12px;
    background: rgba(255, 255, 255, 0.35);
    border: none;
    border-radius: 8px;
    color: #3a5a40;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .login-button:hover {
    background: rgba(255, 255, 255, 0.55);
  }
  
  .links {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 14px;
  }
  
  .links a {
    color: #fff;
    text-decoration: none;
  }
  
  .links a:hover {
    text-decoration: underline;
  }
  
  .social-login {
    margin-top: 24px;
  }
  
  .social-login span {
    font-size: 14px;
    color: #fff;
  }
  
  .social-icons {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 12px;
}

.social-icons img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.2s;
}

.social-icons img:hover {
  transform: scale(1.1);
}
  </style>