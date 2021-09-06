import { Tooltip } from 'bootstrap';

export const initButtonIconTooltips = (buttons) => {
  if (buttons.some(item => !item.ref.current)) {
    return [];
  }

  const defaultConfig = {
    trigger: 'hover',
    container: 'body',
    placement: 'auto',
    customClass: 'btn-icon-tooltip'
  };

  return buttons.map(item => {
    return Tooltip.getOrCreateInstance(item.ref.current, {
      ...defaultConfig,
      ...item.config
    });
  });
};
