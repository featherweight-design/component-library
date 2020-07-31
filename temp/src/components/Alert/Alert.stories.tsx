import React, { useState, useEffect } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Alert from './Alert';
import { Button } from 'components/Buttons';
import { AlertType } from 'types';

export default {
  title: 'Components/Alert',
  decorators: [withA11y],
};

export const Types = (): JSX.Element => (
  <div>
    <Alert
      type="success"
      title="I am a success alert:"
      description="Nailed it!"
    />

    <Alert
      type="info"
      title="I am an info alert:"
      description="This message is very informative"
    />

    <Alert
      type="warning"
      title="I am a warning alert:"
      description="Wary ye' who go this way..."
    />

    <Alert
      type="error"
      title="I am an error alert:"
      description="Bad things are bad!"
    />
  </div>
);

export const WithCloseAction = (): JSX.Element => {
  const initialAlerts: AlertType[] = ['success', 'info', 'warning', 'error'];
  const [renderedAlerts, updateRenderedAlerts] = useState<AlertType[]>(
    initialAlerts
  );

  const handleOnClose = (type: AlertType) =>
    window.setTimeout(
      () =>
        updateRenderedAlerts(
          renderedAlerts.filter(rendered => rendered !== type)
        ),
      500
    );

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        {renderedAlerts.map(type => (
          <Alert
            key={type}
            type={type as AlertType}
            title={`I am a ${type} alert:`}
            description={`This is ${type} descriptive text`}
            onClose={() => handleOnClose(type)}
          />
        ))}
      </div>

      <Button type="brand" onClick={() => updateRenderedAlerts(initialAlerts)}>
        Reset Alerts
      </Button>
    </>
  );
};

export const WithDelay = (): JSX.Element => {
  const initialAlerts: AlertType[] = ['success', 'info', 'warning', 'error'];
  const [renderedAlerts, updateRenderedAlerts] = useState<AlertType[]>(
    initialAlerts
  );

  const [counter, updateCounter] = useState<number>(5);

  useEffect(() => {
    if (counter > 0) {
      window.setTimeout(() => updateCounter(counter - 1), 1000);
    }

    if (counter === 0) {
      window.setTimeout(() => updateRenderedAlerts([]), 500);
    }
  }, [counter]);

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        {renderedAlerts.map(type => (
          <Alert
            key={type}
            type={type as AlertType}
            title={`I am a ${type} alert:`}
            description={`This is ${type} descriptive text`}
            delay={counter * 1000}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="brand"
          onClick={() => {
            updateCounter(5);
            updateRenderedAlerts(initialAlerts);
          }}
          disabled={counter > 0}
        >
          {counter || 'Reset alerts'}
        </Button>
      </div>
    </>
  );
};

export const WithDetails = (): JSX.Element => (
  <div>
    <Alert
      type="info"
      title="An info alert:"
      description="Open for some sweet details"
      details={
        <div style={{ padding: '1rem' }}>
          <h2>From Cat Ipsum</h2>

          <p>
            Climb leg rub face on everything give attitude nap all day for under
            the bed. Chase mice attack feet but rub face on everything hopped up
            on goofballs.
          </p>
        </div>
      }
    />
  </div>
);

export const WithCustomHeightDetails = (): JSX.Element => (
  <Alert
    type="success"
    title="A success alert with a custom details height:"
    description="Open for a surprise"
    details={
      <img
        src="https://i.ytimg.com/vi/Yj7ja6BANLM/maxresdefault.jpg"
        alt="Doge"
      />
    }
    detailsHeight="20rem"
  />
);
