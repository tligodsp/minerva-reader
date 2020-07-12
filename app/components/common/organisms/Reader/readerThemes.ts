import Theme from '../../../../styles/themes';

export const light = {
  'body': {
    'background': `${Theme.light.readerBackgroundColor} !important`,
    'color': `${Theme.light.readerTextColor} !important`,
  },
  '.ms_text': {
    'color': `${Theme.light.readerTextColor} !important`,
  }
}

export const dark = {
  'body': {
    'background': `${Theme.dark.readerBackgroundColor} !important`,
    'color': `${Theme.dark.readerTextColor} !important`,
  },
  '.ms_text': {
    'color': `${Theme.dark.readerTextColor} !important`,
  }
}
