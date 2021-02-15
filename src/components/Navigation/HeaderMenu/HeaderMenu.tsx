import {
  FC,
  ReactElement,
  Fragment,
  useState,
  useRef,
  KeyboardEvent,
} from 'react';

import classnames from 'classnames';

import {
  CurrentlyViewing,
  HeaderMenuOption,
  HeaderMenuProps,
  HeaderMenuSubOption,
} from 'types';

import Icon from 'components/Icon/Icon';
import { keyboardKeyEnum } from 'shared/data/enums';

const getBaseClassName = (goDark: boolean | undefined): string =>
  goDark ? 'fd-header-menu-dark' : 'fd-header-menu';

const HeaderMenu: FC<HeaderMenuProps> = ({
  currentlyViewing,
  menuOptions,
  onNavigate,
  defaultTitle,
  goDark,
  className,
}: HeaderMenuProps) => {
  const [baseClassName] = useState(getBaseClassName(goDark));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const subOptionsMenu = useRef<HTMLDivElement>(null);

  const handleRemoveEventListener = (): void => {
    document.removeEventListener('click', handleHeaderMenuOutsideClick);
  };

  const handleHeaderMenuOutsideClick = (): void => {
    if (subOptionsMenu.current) {
      handleRemoveEventListener();
      setSelectedOption(null);
    }
  };

  const handleSelectOption = (
    name: string,
    optionObject: HeaderMenuOption
  ): void => {
    const { subOptions, path } = optionObject;

    if (subOptions) {
      setSelectedOption(name);

      if (!selectedOption) {
        // Slight timeout is needed to prevent this from firing on the initial click event
        setTimeout(
          () =>
            document.addEventListener('click', handleHeaderMenuOutsideClick),
          100
        );
      }
    } else if (path && onNavigate) {
      onNavigate({
        title: name,
        path,
      });
    }
  };

  const handleSelectSubOption = (title: string, path: string): void => {
    if (title && path && onNavigate) {
      onNavigate({
        path,
        title,
      });
    }
  };

  // RENDER METHODS
  const renderCurrentlyViewingHeader = ({
    title,
    subTitle,
  }: CurrentlyViewing): ReactElement => {
    const titleClassNames = classnames({
      [`${baseClassName}__location-title`]: true,
    });

    return (
      <>
        <h2 className={titleClassNames}>{title || defaultTitle}</h2>
        {subTitle && (
          <h4 className={`${baseClassName}__location-sub-title`}>{subTitle}</h4>
        )}
      </>
    );
  };

  const renderSubOptions = (
    subOptions: HeaderMenuSubOption[]
  ): (ReactElement | null)[] =>
    subOptions
      .filter(subOption => subOption.hasAccess)
      .map(({ label, icon, path, href }, index) => {
        const key = `${label}__${index}`;
        const isSelected = path === currentlyViewing.path;
        const subOptionClassNames = classnames({
          [`${baseClassName}__sub-option-link`]: true,
          [`${baseClassName}__sub-option-link-${label
            .toLowerCase()
            .split(' ')
            .join('-')}`]: true,
          [`${baseClassName}__sub-option-link-selected`]: isSelected,
        });

        if (href) {
          return (
            <a
              key={key}
              className={subOptionClassNames}
              href={href}
              onClick={(): void => {
                handleRemoveEventListener();
                setSelectedOption(null);
              }}
              onKeyDown={(event): void => {
                if (event.key === keyboardKeyEnum.Enter) {
                  handleRemoveEventListener();
                  setSelectedOption(null);
                }
              }}
            >
              <div
                className={classnames({
                  [`${baseClassName}__sub-option-icon-background`]: true,
                  [`${baseClassName}__sub-option-icon-background-selected`]: isSelected,
                })}
              />

              <Icon
                className={classnames({
                  [`${baseClassName}__sub-option-icon`]: true,
                  [`${baseClassName}__sub-option-icon-selected`]: isSelected,
                })}
                icon={icon}
              />
              {label}
            </a>
          );
        }

        if (path) {
          return (
            <div
              key={key}
              role="link"
              tabIndex={0}
              className={subOptionClassNames}
              onClick={(): void => {
                if (!isSelected) {
                  handleSelectSubOption(label, path);
                }
              }}
              onKeyDown={(event): void => {
                if (event.key === keyboardKeyEnum.Enter) {
                  if (!isSelected) {
                    handleSelectSubOption(label, path);
                  }
                }
              }}
            >
              <div
                className={classnames({
                  [`${baseClassName}__sub-option-icon-background`]: true,
                  [`${baseClassName}__sub-option-icon-background-selected`]: isSelected,
                })}
              />

              <Icon
                className={classnames({
                  'material-icons': true,
                  [`${baseClassName}__sub-option-icon`]: true,
                  [`${baseClassName}__sub-option-icon-selected`]: isSelected,
                })}
                icon={icon}
              />
              {label}
            </div>
          );
        }

        return null;
      });

  const renderMenuOptions = (): ReactElement => (
    <div className={`${baseClassName}__menu-icon-container`}>
      {Object.keys(menuOptions).map((option, index) => {
        const key = `${option}__${index}`;
        const { icon, subOptions, subTitle, indicator, isActive } = menuOptions[
          option
        ] as HeaderMenuOption;

        const isSelected = selectedOption === option || isActive;

        const menuOptionIconClassNames = classnames({
          'material-icons': true,
          [`${baseClassName}__menu-icon`]: true,
          [`${baseClassName}__menu-icon-${option}`]: true,
          [`${baseClassName}__menu-icon-selected`]: isSelected,
        });

        return (
          <Fragment key={key}>
            <div
              className={`${baseClassName}__icon-container`}
              role="menuitem"
              tabIndex={0}
              onClick={(): void => {
                if (!selectedOption) {
                  handleSelectOption(option, menuOptions[option]);
                }
              }}
              onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
                if (event.key === keyboardKeyEnum.Enter) {
                  if (!selectedOption) {
                    handleSelectOption(option, menuOptions[option]);
                  }
                }
              }}
            >
              <Icon className={menuOptionIconClassNames} icon={icon} />

              <div
                className={classnames({
                  [`${baseClassName}__menu-icon-background`]: true,
                  [`${baseClassName}__menu-icon-background-selected`]: isSelected,
                })}
              />

              {indicator && (
                <div
                  className={`${baseClassName}__icon-indicator`}
                  role="alert"
                >
                  {typeof indicator === 'number' && indicator}
                </div>
              )}
              {subOptions && (
                <div
                  className={classnames({
                    [`${baseClassName}__sub-options`]: true,
                    [`${baseClassName}__sub-options-shown`]: isSelected,
                  })}
                  ref={subOptionsMenu}
                  role="menu"
                >
                  <div className={`${baseClassName}__sub-options-header`}>
                    <span className={`${baseClassName}__sub-options-title`}>
                      {option}
                    </span>
                    {subTitle && (
                      <span
                        className={`${baseClassName}__sub-options-sub-title`}
                      >
                        {subTitle}
                      </span>
                    )}
                  </div>
                  {renderSubOptions(subOptions)}
                </div>
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );

  const hasTitle = currentlyViewing.title || defaultTitle;

  return (
    <div
      className={classnames({
        [`${baseClassName}`]: true,
        [className as string]: className,
      })}
      role="menubar"
    >
      <div className={`${baseClassName}__left`}>
        <div className={`${baseClassName}__location-container`}>
          {hasTitle && renderCurrentlyViewingHeader(currentlyViewing)}
        </div>
      </div>

      <div className={`${baseClassName}__right`}>
        {menuOptions && renderMenuOptions()}
      </div>
    </div>
  );
};

HeaderMenu.defaultProps = {
  menuOptions: undefined,
  onNavigate: undefined,
  defaultTitle: undefined,
  goDark: false,
};

export default HeaderMenu;
