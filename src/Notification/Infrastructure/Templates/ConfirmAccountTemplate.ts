import dotEnv from 'dotenv'

dotEnv.config()
const FRONT_URL = process.env.FRONT_URL

export function confirmAccountTemplate (token: string): string {
  const buttonText = 'Confirmar correo'
  const processMessage = 'REGISTRO'
  const gratitudeMessage = 'Gracias por registrarte 🥳'
  const contentMessage = 'Estas a un paso de completar tu registro 🤩, solo debes dar click en el botón de abajo para confirmar tu correo electrónico.'
  const urlConfirmation = `${FRONT_URL}/confirm/${token}`

  // ts-ignore
  return `
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0;">
       <meta name="format-detection" content="telephone=no"/>
      <style>
    body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
    body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    #outlook a { padding: 0; }
    .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
    @media all and (min-width: 560px) {
      .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px; }
    }
    a, a:hover {
      color: #FFFFFF;
    }
    .footer a, .footer a:hover {
      color: #828999;
    }
       </style>
      <title>To Do List App</title>
    </head>
    <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      background-color: #22242C;
      color: #FFFFFF;"
      bgcolor="#22242C"
      text="#FFFFFF">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
      bgcolor="#22242C">
    <table border="0" cellpadding="0" cellspacing="0" align="center"
      width="500" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 500px;" class="wrapper">
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 20px;
          padding-bottom: 20px;">
          <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
            color: #2D3445;" class="preheader">
            Confirmación de correo electrónico 🔑</div>
          <a target="_blank" style="text-decoration: none;"
            href="${urlConfirmation}"><img border="0" vspace="0" hspace="0"
            src="https://firebasestorage.googleapis.com/v0/b/upload-file-app-3cd72.appspot.com/o/files%2Fec15a90d-671e-4d7e-9143-69ee5db126fd?alt=media&token=0e633774-945b-4b73-bed4-1f3eaeb7d1a5"
            width="100" height="30"
            alt="Logo" title="Logo" style="
            color: #FFFFFF;
            font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
          padding-top: 0px;" class="hero"><a target="_blank" style="text-decoration: none;"
          href="${urlConfirmation}"><img border="0" vspace="0" hspace="0"
          src="https://firebasestorage.googleapis.com/v0/b/upload-file-app-3cd72.appspot.com/o/files%2Fb3c241cf-2576-4206-98b8-f47671f3c0a8?alt=media&token=39655077-e6c1-430b-8959-003ab6945d0e"
          alt="Please enable images to view this content" title="Hero Image"
          width="340" style="
          width: 87.5%;
          max-width: 340px;
          color: #FFFFFF; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"/></a></td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 14px; font-weight: 400; line-height: 150%; letter-spacing: 2px;
          padding-top: 27px;
          padding-bottom: 0;
          color: #FFFFFF;
          font-family: system-ui,sans-serif;" class="supheader">
            ${processMessage}
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;  padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
          padding-top: 5px;
          color: #FFFFFF;
          font-family: sans-serif;" class="header">
            ${gratitudeMessage}
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
          padding-top: 15px; 
          color: #FFFFFF;
          font-family: sans-serif;" class="paragraph">
            ${contentMessage}
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;
          padding-bottom: 5px;" class="button"><a
          href="${urlConfirmation}" target="_blank" style="text-decoration: none;">
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
              bgcolor="#ffa526"><a target="_blank" style="text-decoration: none;
              color: #000000; font-family: sans-serif; font-size: 18px; font-weight: 500; line-height: 120%;"
              href="${urlConfirmation}">
                ${buttonText}
              </a>
          </td></tr></table></a>
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 30px;" class="line"><hr
          color="#565F73" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
          padding-top: 10px;
          padding-bottom: 20px;
          color: #828999;
          font-family: sans-serif;" class="footer">
    
            To Do List App • David Ponce • ${new Date().getFullYear()} • GitHub <a href="https://github.com/david-ponc/" target="_blank" style="text-decoration: underline; color: #828999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">davidp-ponc</a>.
            <img width="1" height="1" border="0" vspace="0" hspace="0" style="margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"
            src="https://raw.githubusercontent.com/konsav/email-templates/master/images/tracker.png" />
        </td>
      </tr>
    </table>
    </td></tr></table>
    </body>
    </html>
  `
}
