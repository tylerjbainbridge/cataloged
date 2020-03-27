// @ts-ignore
import { Email, Item, Span, A, Image, renderEmail } from 'react-html-email';
import React from 'react';

import sgMail from '@sendgrid/mail';

const textStyles = {
  fontFamily: 'Verdana',
  fontSize: 16,
};

const css = `
  @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
  
  body {
    font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.625;
  }
`.trim();

export class EmailService {
  static sendEmail = async ({ to, html, text }: any) => {
    sgMail.setApiKey(
      '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',
    );

    const msg = {
      to,
      html,
      text,
      from: 'support@cataloged.com',
      subject: 'Cataloged Waitlist Confirmation',
    };

    return await sgMail.send(msg);
  };

  static sendWailistConfirm = async ({ to }: any) => {
    // @ts-ignore
    const html = renderEmail(
      <Email title="Cataloged Waitlist Confirmation" headCSS={css}>
        <Item align="left">
          <Image
            alt="Cataloged Logo"
            src="https://collections-file-storage-1.s3.amazonaws.com/assets/fulllogo.png"
            width="200px"
            style={{ paddingBottom: '20px' }}
          />
        </Item>

        <Item>
          <Span>Thanks for joining the Cataloged waitlist.</Span>
        </Item>
        <Item>
          <Span>We'll contact you when we're ready.</Span>
        </Item>
      </Email>,
    );

    await EmailService.sendEmail({ to, html });
  };
}
