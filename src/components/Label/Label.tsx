import React, { FunctionComponent } from 'react';

type LabelProps = {
  label: string;
};

const Label: FunctionComponent<LabelProps> = ({ label }: LabelProps) => (
  <Label label={label} />
);

export default Label;
