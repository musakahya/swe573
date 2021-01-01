import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#535BD6',
      color: '#535BD6',
      borderColor: '#535BD6',
    },
    secondary: {
      main: '#3AC47D',
      color: '#3AC47D',
      borderColor: '#3AC47D',
    },
    success: {
      main: '#3AC47D',
      color: '#3AC47D',
      borderColor: '#3AC47D',
    },
    error: {
      main: '#D92550',
      color: '#D92550',
      borderColor: '#D92550',
    },
    warning: {
      main: '#F7B924',
      color: '#F7B924',
      borderColor: '#F7B924',
    },
    info: {
      main: '#30B1FF',
      color: '#30B1FF',
      borderColor: '#30B1FF',
    },
    dark_success: {
      main: '#03C360',
      color: '#03C360',
      borderColor: '#03C360',
    },
    dark_info: {
      main: '#0296F0',
      color: '#0296F0',
      borderColor: '#0296F0',
    },
    dark: {
      black: '#000000',
    },
  },
  dark: {
    title: {
      fontFamily: 'Aktiv Grotesk,sans-serif',
      color: '#000000',
      fontWeight: 'bold',
    },

  },
  chip: {
    primary: {
      main: '#535BD6',
      color: '#FFFFFF',
      backgroundColor: '#535BD6',
    },
    secondary: {
      main: '#00ECFF',
      color: '#FFFFFF',
      backgroundColor: '#00ECFF',
    },
    success: {
      main: '#3AC47D',
      color: '#FFFFFF',
      backgroundColor: '#3AC47D',
    },
    error: {
      main: '#D92550',
      color: '#FFFFFF',
      backgroundColor: '#D92550',
    },
    warning: {
      main: '#F7B924',
      color: '#FFFFFF',
      backgroundColor: '#F7B924',
    },
    info: {
      main: '#30B1FF',
      color: '#FFFFFF',
      backgroundColor: '#30B1FF',
    },
    assigned: {
      main: '#0689D8',
      color: '#FFFFFF',
      backgroundColor: '#0689D8',
    },
    progress: {
      main: '#4DFCA2',
      color: '#FFFFFF',
      backgroundColor: '#4DFCA2',
    },
    closed: {
      main: '#03C360',
      color: '#FFFFFF',
      backgroundColor: '#03C360',
    },
    others: {
      main: '#DCDCDC',
      color: '#FFFFFF',
      backgroundColor: '#DCDCDC',
    },
  },
});

export default Theme;