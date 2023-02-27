import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 10px;
        font-family: Quicksand;
        font-size: 1.1rem;
        background-color: #f6f8ff;
    }   

    * {
        box-sizing: border-box;
    }

    @font-face {
        font-family: Quicksand;
        src: url("/fonts/Quicksand/static/Quicksand-Regular.ttf") format("truetype");
    }
`;

export default GlobalStyles;
