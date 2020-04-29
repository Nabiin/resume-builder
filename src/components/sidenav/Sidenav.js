import React, { useContext, useState } from 'react';

import { FormContext } from '../FormContext';
import Contact from '~/components/contact/Contact';
import CardHeader from '~/components/cardheader/CardHeader';
import AddContact from '~/components/form/contact/AddContact';
import * as pdfGenerator from '~/utilities/resume/PdfGenerator.js';
import { Edit, ProfileImage, Trash, Download, Copy, Email, Check, Delete } from '~/assets/image';

const Sidenav = () => {
  const [showModal, setModal] = useState(false);

  const editBtnHandler = e => {
    e.preventDefault();
    setModal(!showModal);
  };

  const closeBtnHandler = e => {
    e.preventDefault();
    setModal(!showModal);
  };

  const context = useContext(FormContext);
  const preview = context.preview.get;
  const email = context.data.get.email;
  const phone = context.data.get.phone;
  const github = context.data.get.github;
  const linkedIn = context.data.get.linkedIn;

  /**
   * Update the hidden state of contact detail.
   *
   * @param {React.MouseEvent} e [ on click event ].
   * @param {string} key [ label of a particular contact type].
   */
  const updateHiddenStateContact = (e, key) => {
    e.preventDefault();

    const data = context.data.get;
    const previousState = data[key].hidden;
    const newState = !previousState;

    data[key].hidden = newState;
    context.data.set(data);
  };

  const openMailTo = (e, value) => {
    window.open('mailto:' + value);
  };

  const openCallTo = (e, value) => {
    window.open('tel:' + value);
  };

  const openLink = (e, url) => {
    window.open(url, '_blank').focus();
  };

  return (
    <div className="sidenav">
      <div className="sidenav-top">
        <div className="card">
          <CardHeader title="Display Picture" />
          <div className="sidenav__upload-block">
            <div className="sidenav__upload-block-l">
              <div className="profile-image-wrapper">
                <img src={ProfileImage} alt="Image" />
              </div>
              {!preview && <span className="text-link text-link--small">Upload new version</span>}
            </div>
            {!preview && (
              <div className="sidenav__upload-block-r">
                <div className="icon">
                  <img src={Trash} alt="Trash" />
                </div>
              </div>
            )}
          </div>
          <div className="sidenav__contact-block">
            <CardHeader
              title="Contact Information"
              icon={Edit}
              hideIcon={preview}
              component={AddContact}
              onEdit={editBtnHandler}
              onClose={closeBtnHandler}
              showModal={showModal}
            />
            {email && (
              <Contact
                id="email"
                label="Email Address"
                value={email.value}
                preview={preview}
                onHiddenIconClicked={updateHiddenStateContact}
                onLinkClicked={openMailTo}
              />
            )}
            {phone && (
              <Contact
                id="phone"
                label="Phone Number"
                value={phone.value}
                preview={preview}
                onHiddenIconClicked={updateHiddenStateContact}
                onLinkClicked={openCallTo}
              />
            )}
            {github && (
              <Contact
                id="github"
                label="GitHub"
                value={github.value}
                preview={preview}
                onHiddenIconClicked={updateHiddenStateContact}
                onLinkClicked={openLink}
              />
            )}
            {linkedIn && (
              <Contact
                id="linkedIn"
                label="LinkedIn"
                value={linkedIn.value}
                preview={preview}
                onHiddenIconClicked={updateHiddenStateContact}
                onLinkClicked={openLink}
              />
            )}
          </div>
        </div>
      </div>

      {!preview && (
        <div className="sidenav-bottom">
          <div className="card">
            <CardHeader title="CV Actions" />
            <ul>
              <li className="sidenav__cv-action">
                <span className="sidenav__cv-action-icon">
                  <img src={Download} alt="Edit" />
                </span>
                <span className="sidenav__cv-action-label text-link" onClick={e => pdfGenerator.downloadPDF(e)}>
                  Download PDF
                </span>
              </li>
              <li className="sidenav__cv-action">
                <span className="sidenav__cv-action-icon">
                  <img src={Copy} alt="Edit" />
                </span>
                <span className="sidenav__cv-action-label text-link">Copy Shareable Link</span>
              </li>
              <li className="sidenav__cv-action">
                <span className="sidenav__cv-action-icon">
                  <img src={Email} alt="Edit" />
                </span>
                <span className="sidenav__cv-action-label text-link">Email CV as Attachment</span>
              </li>
              <li className="sidenav__cv-action">
                <span className="sidenav__cv-action-icon">
                  <img src={Check} alt="Edit" />
                </span>
                <span className="sidenav__cv-action-label text-link">Request Professional Review</span>
              </li>
              <li className="sidenav__cv-action">
                <span className="sidenav__cv-action-icon">
                  <img src={Delete} alt="Edit" />
                </span>
                <span className="sidenav__cv-action-label text-link text-link--danger">Delete CV</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidenav;
