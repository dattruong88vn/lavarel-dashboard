const template401 = () => {
   document.querySelector("head").innerHTML += `
    <style>
        html, body {
            height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            color: #B0BEC5;
            display: table;
            font-weight: 100;
            font-family: 'Lato';
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 72px;
            margin-bottom: 40px;
        }
        </style>
    `;
  document.querySelector("body").innerHTML = `
    <div class="container">
        <div class="content">
            <div class="title">401 Forbidden.</div>
            <p style="text-align: center; color: black">Bạn không có quyền truy cập tính năng này. <a href="/">Quay trở lại</a></p>
        </div>
    </div>`;
};

export const pageStatusPermission = (code) => {
    switch (code) {
        case 401:
            template401();
            break;

        default:
            break;
    }
}
