import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SideDrawer from './SideDrawer';
import Accordion from 'components/Accordion/Accordion';
import { Button } from 'components/Buttons';
import Input from 'components/Form/Input/Input';
import TextArea from 'components/Form/TextArea/TextArea';

export default {
  title: 'Components/SideDrawer',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [isShown, toggleIsShown] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        backgroundColor: 'navy',
        borderRadius: '0.25rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1rem',
        }}
      >
        <Button type="neutral" onClick={() => toggleIsShown(!isShown)}>
          Toggle SideDrawer
        </Button>
      </div>

      <div style={{ position: 'relative' }}>
        <SideDrawer shown={isShown}>
          <div style={{ margin: '1rem' }}>
            <Button type="brand" onClick={() => toggleIsShown(false)}>
              Secret Button!
            </Button>
          </div>
        </SideDrawer>
      </div>
    </div>
  );
};

export const FormExample = (): JSX.Element => {
  const [layoutRatio, updateRatio] = useState('2fr 1fr');
  const [isShown, toggleIsShown] = useState(false);
  const [inputValue, updateInputValue] = useState('Doge');
  const [textAreaValue, updateTextAreaValue] = useState(
    'There is debate on who painstakingly birthed our favourite monumental flavor creation into existence. What really matters is that, at the end of the day, we can collectively relish in the sweet glory of it all. From beef-to-bun ratio, ‘how much is too much?’ cheese, and the careful alchemy of condiments, every cheeseburger is a small mountain of heaven.'
  );
  const [isHiddenFieldsShown, toggleHiddenFields] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === 'doge') {
      updateInputValue(value);
    } else {
      updateTextAreaValue(value);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: layoutRatio,
        overflow: 'hidden',
        height: '50rem',
        margin: '1rem',
        border: '1px solid black',
        borderRadius: '0.25rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'navy',
        }}
      >
        <Button type="neutral" onClick={() => toggleIsShown(!isShown)}>
          Toggle SideDrawer
        </Button>

        <Button
          type="neutral"
          onClick={() =>
            updateRatio(layoutRatio === '2fr 1fr' ? '1fr 2fr' : '2fr 1fr')
          }
        >
          Change layout ratio
        </Button>
      </div>

      <div style={{ position: 'relative' }}>
        <SideDrawer shown={isShown}>
          <form
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
            }}
          >
            <div style={{ flex: '1' }}>
              <h3>Form</h3>

              <Input
                label="Name"
                name="doge"
                value={inputValue}
                onChange={handleChange}
              />

              <TextArea
                name="cheeseburger"
                value={textAreaValue}
                onChange={handleChange}
              />

              <Accordion expanded={isHiddenFieldsShown}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h2> Add new contact</h2>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Input
                      label="First Name"
                      name="doge"
                      value={inputValue}
                      onChange={handleChange}
                    />

                    <Input
                      label="Last Name"
                      name="doge"
                      value={inputValue}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    label="Email"
                    name="doge"
                    value={inputValue}
                    onChange={handleChange}
                  />
                </div>
              </Accordion>

              <Button type="brand" disabled>
                I am below the hidden thing
              </Button>
            </div>

            <div style={{ display: 'flex' }}>
              <Button
                type="neutral"
                onClick={() => toggleHiddenFields(!isHiddenFieldsShown)}
              >
                Toggle hidden fields
              </Button>

              <Button type="neutral" onClick={() => toggleIsShown(false)}>
                Cancel
              </Button>

              <Button type="brand" onClick={() => toggleIsShown(false)}>
                Submit
              </Button>
            </div>
          </form>
        </SideDrawer>
      </div>
    </div>
  );
};
