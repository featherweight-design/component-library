import React, { useEffect, useState, CSSProperties } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import NavigationControls from './NavigationControls';
import { Button } from 'components/Buttons';
import Icon from 'components/Icon/Icon';
import { ProgressItem } from 'types';

export default {
  title: 'Components/Navigation/NavigationControls',
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
  margin: '0 auto',
  border: '1px solid black',
};

const boundingStyles: CSSProperties = {
  ...sharedStyles,
  width: '100%',
  padding: '1rem',
  backgroundColor: '#fff',
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

const initialItemsToComplete = [
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
];

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
  const [currentAnchor, updateCurrentAnchor] = useState<string>('');
  const [isShown, toggleIsShown] = useState(true);
  const [areCancelCompleteShown, toggleCancelComplete] = useState<boolean>(
    true
  );
  const [isProgressShown, toggleIsProgressShown] = useState<boolean>(true);
  const [itemsToComplete, updateCompleteItems] = useState<ProgressItem[]>(
    initialItemsToComplete
  );

  useEffect(() => {
    if (currentAnchor) {
      const numberComplete = anchorIdCollection.indexOf(currentAnchor);

      const newCompleteItems = itemsToComplete.map(item => ({
        isComplete: itemsToComplete.indexOf(item) <= numberComplete,
      }));

      updateCompleteItems(newCompleteItems);
    }
  }, [currentAnchor]);

  const handleOnBack = (anchorId: string) => {
    updateCurrentAnchor(anchorId);
    console.log(`Move back to anchor ${anchorId}`);
  };

  const handleOnCancel = () => {
    updateCurrentAnchor('');
    toggleIsShown(false);
    console.log('Cancel!');
  };

  const handleOnComplete = () => {
    toggleIsShown(false);
    console.log('Complete!');
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

  const isComplete =
    !!currentAnchor && !itemsToComplete.find(({ isComplete }) => !isComplete);

  return (
    <div style={pageStyles}>
      <div className="story__controls-container">
        <Button type="brand" onClick={() => toggleIsShown(!isShown)}>
          {`isShown: ${isShown}`}
        </Button>

        <Button
          type="brand"
          onClick={() => toggleCancelComplete(!areCancelCompleteShown)}
        >
          {`areCancelCompleteShown: ${areCancelCompleteShown}`}
        </Button>

        <Button
          type="brand"
          onClick={() => toggleIsProgressShown(!isProgressShown)}
        >
          {`isProgressShown: ${isProgressShown}`}
        </Button>
      </div>

      <div className="bounding-element" style={boundingStyles}>
        {renderTargetElement(anchorIdCollection)}
      </div>

      <NavigationControls
        anchorId={currentAnchor}
        anchorIdCollection={anchorIdCollection}
        onCancel={areCancelCompleteShown ? handleOnCancel : undefined}
        onComplete={areCancelCompleteShown ? handleOnComplete : undefined}
        onBack={handleOnBack}
        onNext={handleOnNext}
        isShown={isShown}
        isComplete={isComplete}
        progress={
          isProgressShown
            ? {
                itemsToComplete,
              }
            : undefined
        }
      />
    </div>
  );
};
