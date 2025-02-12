import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle` 
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

:root {
    --gray900: #111827;
    --gray800: #1f2937;
    --gray700: #374151;
    --gray600: #4b5563;
    --gray500: #6b7280;
    --gray400: #9ca3af;
    --gray200: #e5e7eb;
    --gray100: #f3f4f6;
    --gray50: #f9fafb;
    --blue: #3692ff;
    --red: #f74747;
}

* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Pretendard-Regular', sans-serif;
}

a,
img {
    display: inline-block;
    vertical-align: top;
}

a {
    text-decoration: none;
}
`;
