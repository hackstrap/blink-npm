import { Typography as MuiTypography, TypographyTypeMap } from '@material-ui/core';
import { ElementType, FC } from 'react';

const Typography: FC<
  TypographyTypeMap['props'] & {
    weight?: number;
    component?: ElementType;
    className?: string;
    style?: { [key: string]: string | number };
  }
> = ({ weight, children, className, component, style, ...type_props }) => {
  return (
    <MuiTypography
      {...type_props}
      {...(component ? { component: component } : {})}
      className={`${className && className}`}
      style={{ ...(weight ? { fontWeight: weight } : {}), ...style }}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
