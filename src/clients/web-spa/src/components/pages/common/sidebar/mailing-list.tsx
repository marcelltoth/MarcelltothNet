import * as React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

export const SubscribeForm : React.FC = React.memo((props) => {

    return <div id="mc_embed_signup">
        <Form action="https://marcelltoth.us3.list-manage.com/subscribe/post?u=c53d3e4f573f9eefd2ccaa9d3&amp;id=876dc285b4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
            <div id="mc_embed_signup_scroll">
                <h3>Subscribe to my mailing list</h3>
                <div className={"mb-3"}>I hate spam just as much as you do. I will only email you quality content, and only one or two emails a month.</div>
                <FormGroup className="mc-field-group">
                    <label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span></label>
                    <Input type="email" name="EMAIL" className="required email" id="mce-EMAIL" />
                </FormGroup>
                <FormGroup className="mc-field-group">
                    <label htmlFor="mce-FNAME">First Name  <span className="asterisk">*</span></label>
                    <Input type="text" name="FNAME" className="required" id="mce-FNAME" />
                </FormGroup>
                <FormGroup className="mc-field-group">
                    <label htmlFor="mce-LNAME">Last Name </label>
                    <Input type="text" name="LNAME" className="" id="mce-LNAME" />
                </FormGroup>
                <FormGroup id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                    <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                </FormGroup>
                <div style={{position: 'absolute', left: -5000}} aria-hidden="true">
                    <Input type="text" name="b_c53d3e4f573f9eefd2ccaa9d3_876dc285b4" />
                </div>
                <div className="clear">
                    <Input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
                </div>
            </div>
        </Form>
    </div>;
});