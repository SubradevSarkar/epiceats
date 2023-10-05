export default (data) => {
  return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtm11/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.W3.org/1999/xhtml">

<head>
    <meta charset="UTF-8" http-equiv="Content—Type" content="text/html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Email Template</title>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,800&family=Inter:wght@400;500;600;700;800&display=swap');

        body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            color: #222222;
        }

        table {
            border-spacing: 0;
        }

        td {
            padding: 0;
        }

        img {
            border: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-weight: 500;
            margin: 0;
            padding: 0;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #ffe1d8;
            padding-bottom: 60px;
        }

        .main {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
        }

        .brandname {
            font-family: "Bricolage Grotesque", sans-serif;
            font-weight: 800;
            color: #f36438;
        }
        .info{
            background-color: #f36438;
            padding: 15px 50px;
            color: #ffefea;
            border-radius: 8px;

        }
        .info li{
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <center class="wrapper">
        <table class="main" width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr style="text-align: center">
                            <td>
                                <img src="${data.logo}" height="80" alt="email logo" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 0 70px">
                    <table width="100%">
                        <tr>
                            <td>
                                <h4 style="padding-top: 25px; font-size:14px;">Hello <span
                                        style="font-weight: 700;">${data.username}</span></h4>
                                <div style="padding-top:25px">
                                    <h2 style="font-weight: 500; font-size:25px;">Welcome to <span
                                            class="brandname">Epiceats!</span></h2>
                                    <h6 style="font-size:14px;">we're excited to have you on board</h6>
                                    </di>
                            </td>
                        </tr>
                    </table>
                    <table width="100%">
                        <tr>
                            <td style="padding-top: 20px;">
                                <p style="font-size:14px;font-weight: 500; color: #8b8b8b;">To complete your
                                    registration, please use the following One-Time Password (OTP)</p>

                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding: 20px 0;">
                                <h1 style="font-weight: 800; font-size:xxx-large;">${data.otp}</h1>
                            </td>
                        </tr>
                    </table>
                    <table width="100%">
                        <tr>
                            <td style="padding: 10px 0;">
                                <ul style="font-size: small;" class="info">
                                    <li>Your OTP is a security measure to protect your account.</li>
                                    <li>Please note that this OTP is valid for the next 5 minutes.</li>
                                    <li>If you encounter any issues, you can request a new OTP on the registration page.</li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                    <table width="100%">
                        <tr>
                            <td style="text-align: center;padding-bottom: 20px;">
                                <p style="font-weight: 600;font-size: 14px;">Thank you for choosing Epiceats</p>
                                <a style="color: #f36438;font-weight: 600;" href="${data.siteUrl}">epiceats</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td height="8" style="background-color: #f36438; "></td>
            </tr>
        </table>
    </center>
</body>

</html>`;
};
