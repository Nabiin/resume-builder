import React, { useContext, useState } from 'react';

import { Add } from '~/assets/image';
import * as storage from '~/storage/LocalStorage';
import { FormContext } from '~/components/FormContext';
import EmptyCard from '~/components/emptycard/EmptyCard';
import CardFooter from '~/components/cardfooter/CardFooter';
import CardHeader from '~/components/cardheader/CardHeader';
import CertificateItem from '~/components/certificate/CertificateItem';
import AddCertificate from '~/components/form/certificate/AddCertificate';

const Certificate = () => {
  const [addCertificate, setAdd] = useState(false);
  const context = useContext(FormContext);

  const certificates = context.data.get.certificates;
  const preview = context.preview.get;

  const togggleAddCertificate = () => setAdd(!addCertificate);

  /**
   * Update the hidden state of skill.
   *
   * @param {string} key [ name of a particular certificate].
   */
  const updateHiddenStateCertificates = key => {
    const data = context.data.get;

    data['certificates'].find(({ name, hidden }, index) => {
      if (name === key) {
        const newState = !hidden;

        data['certificates'][index].hidden = newState;
        context.data.set(data); // new state of data
      }
    });
  };

  const deleteCertificate = (name, link) => {
    const data = context.data.get;

    const filteredCertificates = data['certificates'].filter(certificate => {
      return certificate.name !== name && certificate.link !== link;
    });

    data['certificates'] = filteredCertificates;

    context.data.set(prevState => ({ ...prevState, ...data }));

    storage.saveResume(context.data.get);
  };

  if ((!certificates || certificates.length < 1) && preview) {
    return <></>;
  }

  if (!certificates || certificates.length < 1) {
    return (
      <div className="content-block">
        <div className="card">
          <EmptyCard emptyMessage="You do not have any certificates yet."></EmptyCard>
          <CardFooter
            icon={Add}
            hide={preview}
            label="Add another certificate"
            showModal={addCertificate}
            onAdd={togggleAddCertificate}
            component={AddCertificate}
            onClose={togggleAddCertificate}
            modifier="empty"
          />
        </div>
      </div>
    );
  }

  const certificatesList = certificates.map(({ name, link, date, description }) => (
    <CertificateItem
      key={name}
      title={name}
      link={link}
      year={date}
      description={description}
      preview={preview}
      onHiddenIconClicked={updateHiddenStateCertificates}
      onDelete={deleteCertificate}
    />
  ));

  return (
    <div className="content-block">
      <div className="card">
        <CardHeader title="Certificates" />
        <div className="certificate">{certificatesList}</div>
        <CardFooter
          icon={Add}
          hide={preview}
          label="Add another certificate"
          showModal={addCertificate}
          onAdd={togggleAddCertificate}
          component={AddCertificate}
          onClose={togggleAddCertificate}
        />
      </div>
    </div>
  );
};

export default Certificate;
