import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { LocationEnum } from 'types';
import { Button } from 'components/Buttons';
import Icon from 'components/Icon/Icon';
import NavigationPointer from './NavigationPointer';

export default {
  title: 'Components/Navigation/NavigationPointer',
  decorators: [withA11y],
};

const sharedStyles: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const pageStyles: CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '30rem',
};

const boundingStyles: CSSProperties = {
  ...sharedStyles,
  width: '100%',
  padding: '1rem',
  border: '1px solid black',
  borderRadius: '0.25rem',
  backgroundColor: '#dddbda',
  overflowY: 'scroll',
};

const documentStyles: CSSProperties = {
  ...sharedStyles,
  justifyContent: 'center',
  marginBottom: '1rem',
  backgroundColor: 'aquamarine',
  height: '50rem',
  width: '30rem',
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5)',
};

const renderTargetElement = (anchorIdCollection: string[]) => (
  <div id="target-element">
    <div style={documentStyles}>
      <Icon id={anchorIdCollection[0]} designSystem="material" icon="anchor" />
    </div>

    <div style={documentStyles}>
      <Icon id={anchorIdCollection[1]} designSystem="material" icon="android" />
    </div>

    <div style={documentStyles}>
      <Icon id={anchorIdCollection[2]} designSystem="material" icon="pets" />
    </div>

    <div style={documentStyles}>
      <Icon
        id={anchorIdCollection[3]}
        designSystem="material"
        icon="local_fire_department"
      />
    </div>
  </div>
);

export const Default = (): JSX.Element => {
  const [areKeyboardControlsEnabled, toggleKeyboardControls] = useState(false);
  const [areKeyboardHintsShown, toggleKeyboardHints] = useState(false);
  const [isComplete, toggleIsComplete] = useState(false);
  const [isDisabled, toggleIsDisabled] = useState(false);
  const [isShown, toggleIsShown] = useState(true);
  const [location, toggleLocation] = useState<LocationEnum>('left');
  const [currentAnchor, updateCurrentAnchor] = useState<string>('');
  const [isLoading, updateLoading] = useState<boolean>(true);

  const boundingElement = useRef<HTMLElement | undefined>(undefined);
  const targetElement = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const foundBoundingElement = document.getElementById('bounding-element');
    const foundTargetElement = document.getElementById('target-element');

    if (foundBoundingElement && foundTargetElement) {
      boundingElement.current = foundBoundingElement;
      targetElement.current = foundTargetElement;

      updateLoading(false);
    }
  }, []);

  const handleOnBack = (anchorId: string) => {
    updateCurrentAnchor(anchorId);
    console.log(`Move back to anchor ${anchorId}`);
  };
  const handleOnNext = (anchorId: string) => {
    updateCurrentAnchor(anchorId);
    console.log(`Move next to anchor ${anchorId}`);
  };

  const anchor1 = 'anchor-1';
  const anchor2 = 'anchor-2';
  const anchor3 = 'anchor-3';
  const anchor4 = 'anchor-4';
  const anchorIdCollection = [anchor1, anchor2, anchor3, anchor4];

  return (
    <div style={pageStyles}>
      <div className="story__controls-container">
        <Button
          type="brand"
          onClick={() => toggleKeyboardControls(!areKeyboardControlsEnabled)}
        >
          {`Keyboard Controls: ${areKeyboardControlsEnabled}`}
        </Button>

        <Button
          type="brand"
          onClick={() => toggleKeyboardHints(!areKeyboardHintsShown)}
        >
          {`Keyboard Hints: ${areKeyboardHintsShown}`}
        </Button>

        <Button type="brand" onClick={() => toggleIsShown(!isShown)}>
          {`isShown: ${isShown}`}
        </Button>

        <Button type="brand" onClick={() => toggleIsDisabled(!isDisabled)}>
          {`isDisabled: ${isDisabled}`}
        </Button>

        <Button type="brand" onClick={() => toggleIsComplete(!isComplete)}>
          {`isComplete: ${isComplete}`}
        </Button>

        <Button
          type="brand"
          onClick={() => toggleLocation(location === 'left' ? 'right' : 'left')}
        >
          {`Location: ${location}`}
        </Button>
      </div>

      <div id="bounding-element" style={boundingStyles}>
        {!isLoading && boundingElement.current && targetElement.current && (
          <NavigationPointer
            anchorId={currentAnchor}
            boundingElement={boundingElement.current}
            targetElement={targetElement.current}
            anchorIdCollection={anchorIdCollection}
            onBack={handleOnBack}
            onNext={handleOnNext}
            location={location}
            disabled={isDisabled}
            isComplete={isComplete}
            isShown={isShown}
            areKeyboardControlsEnabled={areKeyboardControlsEnabled}
            areKeyboardHintsShown={areKeyboardHintsShown}
          />
        )}

        {renderTargetElement(anchorIdCollection)}
      </div>
    </div>
  );
};
