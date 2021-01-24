import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserContext from 'shared_resources/context/user_context';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const TopBar = ({}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: 80,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    search: {
      position: 'relative',
      borderRadius: 25,
      backgroundColor: '#EDEEEF',
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        marginRight: 10,
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      borderRadius: 25,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DFE0E1',
    },
    inputRoot: {
      color: '#000000',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      color: '#000000',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    expand: {
      color: '#C4C4C4',
    },
    text: {
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(3),
      color: '#495057',
      fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    logo: {
      marginLeft: theme.spacing(7),
      marginTop: theme.spacing(0.5),
      cursor: 'pointer',
      textDecoration: 'none'
    },
    user: {
      color: '#000000', 
    },
    button: {
      textTransform: 'capitalize',
      backgroundColor: '#FFFFFF',
      marginRight: theme.spacing(8)
  },
   pointer: {
     cursor: 'pointer',
     textDecoration: 'none'
   }
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  
  const { user, setUser } = useContext(UserContext);

  const handle_logout = () => {
    localStorage.removeItem('token');
    setUser({ username: '', email: '' });
  };

  return (
    <AppBar
      style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(0,40,100,.12)' }}
      elevation={0}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBar]: open,
      })}
    >
      <Toolbar disableGutters>
      <Grid
              container
              direction="row"
  justify="space-between"
  alignItems="center"
            >
              <Grid item>
              <Grid
              container
              direction="row"
  justify="flex-start"
  alignItems="center"
            >
              <Grid item classNAme={classes.pointer}>
      <img
            className={classes.logo}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABpcAAAaXCAMAAACkJMYyAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURQAAAFWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWs7lWt7gjm0+4AAAAQdFJOUwBgIOCAQKDwwBAw0FCwcJD3X/rgAAAgAElEQVR42u3d23rbOLIG0JAiKVISSb3/046d7uk4iWzrwEMBWOtyzzfdsxMCv1AoAD9+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZO3Uvpmav1Xv/8HgDwiA1Q3vSTT3/fl6h2Pfj01zaU/+3ABYWHt5i6O70uh2Qo3N1Nb+GAF4fYU0zf3huoy3eLpYPQHwnPrSLJZIv6VTN7X+dAF4ZJX0FknH65rO3WTlBMAdTlV3uG6jby769gD4IpOm8Xjd1nmWTQDcUG+3TvormxobTgB81M7n666OY6WPHIB3Q9UdrxGcZ60QAEJpvAZymC/+TgCEUiTHTjQBCKVY0aSgB1CaS3cN7dBogwAoxmk+XuM7Vw42ARRgqM7XRBw755oAcl8qdcdrSg5TEYumWtUSKFPVX5Nz7LJvghiaq1wCClQ3x2ua+irvXwvH69nnCRTn1F0TlnE5r31fw04+UKAwbX9N3HHOstRV//NzQRkPKEs6HXhf6rKbvYd/S6vKeEBZqXS45iKzFoj//maU8QCplKo+nxNN7a9VrDIeIJUk085OH3b8eh8qIJWSTqb0lxf1b92RlU8VkEo6IHY0NL//v+MeQKAE6XeGf51M6c7lw5/nmztfK5C/Ou9Uej/P1CSaTNVft264nBbI3tBdC3BIcVvmRnH14IMFcjcdr2VIrjXv5pZf44sF8tYeruVIqgHik0YUh5eArNXjtSjHZFYbn7VHjj5aIGfN8VqaQxLFvM+b9i++WiBfRZXwUuoZ/+Ioma4HIF9ldOHdLObF7sz78oCzrgcgW5fjtVxxryYavrl2w10PQK6LpfFatGPMpyKG7zb83PUAWCxZMm2m/r4N5eTbBSyWLJk2SqU79vu8cAFYLFkybeO+e3M1iQM5LpY6gRSuMa8633f2yudLVJX7hHn+d/lBHH28PSFAf9vQ3Pt34kFAwv7ePR5tfvKkRhQFu/6hvn/9evT9EtV8vZ4dYuCpObAXRLFOql76VP6XwldTi7Ycnp0ENTyEan+4v4D3z3LJz1Gi+qfFd/YHwRMrbW5O+Lu0ubVdSgs7+OpjtgPKcz/OzwIozpQ/VA//dVguEVbv4DdP/aBRw/uylrfppH/qnvjbUCMhqsuvX0+CiftNoueb1chm4+mJpdJP3qklqg/7pJryuHsqdJY2yuGgtnty4Wq5RFSVu7J4XG1r6R7r39VdT0+fara7RArLpas777nzJ7qtpfusXIKoXrkuVzMeSSyX3kz+SHj4q+Hzyx/W22Q6dS/9OrBcIpHl0tX1wnzP1tL+J5nq+dVbCS2XSOeHr6Y8vuappd27H+rp9e09yyXSWS69fa+aR/kqlnQ87Nv9MFSLXEmoYk86yyXd4nzppOPhiWBabEgN1UKrVe8ukdJySbc4YilmW95ioWQfmdSWS7rFefiL4btgerk6XldL7uv57UliyyWtOoilxdvyXuonWqLR4TceqCaqy94XqJAWL9PuEkynefFWExURwur9nuIBji29FkzPjKnh0q2wo6fnlrDa9coOiCVerkLU00pHxdTpSXSe8ZMKsbRjMF1evtBBjzjpqTdpbUUs8WgwnaZ+zf8VivSENV8FE3fy2tJmwVRX48pnxEbfM2FnmqPvl3s/FncPbRJMddUdVv9foEJPXPccRdFNiljaKJg2ySRND8R21xgQTPywt7R6MJ2mjTLpvTzveyasdp3OVsQSDw2qtuk3vXPQARDSn2sEk09FkqwUTKdq3rxCOvugCWu4+zt277BYYvFgqi9Nv8e/+aDJlrim+7t3rPvFEkv3xO31L3Z0icAe2GUVTCVzVWtWVPEIrH3ot51gKpaHLbKiikc+xRlfs1giB6p4BDY8WN52I1GZTmZyVTyI+jNYMBUZS0dTeU6MYkLrfdIsvqomOPvERFY/81vLH1tpseRSvLy4F4/Qpme+alflFWY0k2el90kT2nM/hAVTUZynzYvXLYjt2S4rwVQQHeKZcZ8Ysc1XwcTXWhO5FnHY0PMvvQimQtRa8TJrEfdNk2cZTzAVQyuezSVIo4wnmEqh58HmEmzqtd/CDkHkbzKR21yCLdUvfuMesM2dnofMOLlE/j+GBVPeXD+UGc8BkHsZTzD5QEir58G1eMT/NbzAly6YMjabyfNitBJf5VPnCxcTuZ4H2FjnNxifc6A2M6NvmgQsNO8Ipjz1ZvKseDeNFCz2MrZzTDlqzOR59Ty454GyJh43P+THySWteLC9BZuABVNuhoOpXCsebD7zLPnVC6bMuBZPLMH2lu0CFkw+DsIyPEnE7Mvns7W0FnGxBDs4+/b5xGgqz6pD3BdNKj+J/ShDFa+IWHJwiYLnHt+/Kh5iCZ42GwGo4uXP0xYk5OynGap42XOelpSoGaCKJ5YgkLWumTkYB4lzolYswT4aI4Etf7CQTSzVjYecWMfoJxq3uBdPLH3p1F2PqvUkN/0cL/54raPJMpaq91e5DHDWUa86IFwSmex3oelBLH1RwPv5c9a7t6xk5V5gwaS8S2ax1P7bEaOKR6rlGncSJUnTg1i6bZj+q/y3xgkr6a+Cib9oesjFedFX00/dr/quXjwSnoBGq/3kTObzXGJpwdE3TB/vhnGtEasZEhsabPJVaHoQS3+Vdv84Z+0UCGnvIyxbSmB1swk9D4vVKv5twPugMUxIvGDjhG1SahN6Hhba2x2qv7szvTBI+r+Mj1p3EtKb0bOwzJKm7W5UdY9KIOQwBTnIpLbLppYYcqf5YDizuWNiP96wXGKjEkU9ffY2m4seWNOw4UBxkCkNlTk9Ay8/MzNUnz8YqkWcfEo2va85BY7U6g+/1emgRZw8fxvrF/dJEL428U0oKcmzto0fM9AvbrnE+qbn//rr6dsbe3uDhHVtfWu0F5kslwjb8fB5o8PHf7xyPCvrU/oph+USq1XLP2sJ/5OjiKwttdI3lkt8Pb6eWc4Ml+7eEyM2l8gxl7TlWS4RqR5RTw+UTWwusbp9TvafdT9YLrGGh08tDZf5oZ8iNpfINZe05VkusYYHrw8/TQ/vL9tcYn3NXgPI9VqWS+xZw6ur8Yk7yGwukXMueYM5pLO5vYQaXl11zy2MbS6xhW6/UaT7QVmX7fvwns6kq2vx2MieN0frfvA5sNiW7T0H1k9T99IGohFL/hORtwKDOZneU9V/e5a2bfpX37RxJJ5tJLRPS85VXV76hff1QDpV3RIbhw7EU0YuPXc2nXXUJvjsFkv1pVmqJnI2Vikkl7x8EUhjhs9psXS6vF65+/ivMVLZSID+K5tMYRzN8XksloZ2mhffOTZOKSiXbDJF4UxtBoultmr6g1GKXLLJlAdN4un5de/Q2xpppUTS88DGphijyyZTAJrEk3NofwZS1Yxr/6bQ88CGoux022Tanybx1Jznud/m4ig9D5SYS+6D3N2g64HPuOeBMnPp0Rv6WZiuBz7j8n9KzaXHXzRjSW4SR88DIYRqwTr6WbYfXQ98wtsWlJxLGsZ3NJt/0YqHXLo1BvT97ETXA7erGMrrlJ5L970iw+IuJmC04iGXPuF99T04vIRWPOSSWl4ggwmYWxwrRC6p5e3E4SVuNiIZGsgltbydjKZgbpQujAzkklqeMh6BRqEOceTSb7U8+63KeOw7Bv04RC79Wdr2Y00Zjx1jSYc4cunvKoJxoYzHbnQfIZdu8XSzMh47UUhHLt3Wq+Up47EHB5eQS5/WuBUTlPHYYXfXsEAufW62ZFLGQywhl7Q/lMTdePwx5gwK5JL2h1154oLfY0mNArn0ffuDA34rak3EiCXkkvaHQLxUy2+Dza9A5NJ9Rr/h1nI2FfMhluznsrd0Tq4cW39bq6hNxYglImkSGjE6xlehSxyxhFx61sGSaQW6xPnFRi5yyZJpfweTMf/nUjzk0hNLJmWGhZ1MxoglQrkkN3TcJ7msyWyMWCKUBM9UupdoUe4SRywhl+wyReISIsQSdhcW2GXSmGd7CbFErhIdRJZMC3F6CbGEXLJkisTpJcQStheW0lkyLcDpJcQS0fTpjiWXjL/OE+qIJeTSkkY38r/oYk5GLBFN2o/vHD1l+5rGpIxYwsS0LKdsy10uI5bIU/p9wo3+h+c5VSuWjALCadMfWFrGn+ZNQLFkFBBPFuf99T88SduDWIKAshhd+h+eo+1BLEFAmRysPCvmPUHbQ9E8mo6paWXufyj2Rwliibzkc0GaYt6j3PYglsAWg2JeJK3JuVwHsURcebVkKeY9whvq5TobKfjNrJgX0Gx6FksQUXYjTjHvXtrxSjWKJWLLryfLMdti/+q5r9zt28eP5s2Lee7MK3KpjFgiE1me+T84yP69kxm6SMYG8VV5Dr7eNtN3tImLJfCredtqhW2mAlfKfFPjdmwJuwy7ss30JW3i5XGalkScM/5xqGbxBW3ixXFsiVR0Wf8+tM1U4g8SbnJsiWRkfhuNBojyCrjc3nH1zZOM7NuyNEDIJTTiYX6KZVa/KPD3CL/ttV588thniDUotebJpaJpxCMxXRE/F1Ux/uCVi4JoxCM1VSG/GCXTbxyrLajjQSyRmmLuSdM0/pFjtcXwKBkJOhYzQDWN/+JYrY4HiGssaJBKJrmk4wHsNEimiFz3UMbnbmuJNJXWMdw7aPvDsdoyzD50TFGp9CdJJrlUwtaSHlRsNUgmuYStJbDBJJmeUZu2bS1BYKcyx21XcgeEa4hy15jYSNux1F+UrVwiz60lp5ZI3Vjs8C02meRS1s46e0heyXd4FppMcinrErU5jfSVvQle5I2urhPPuIanPZwsHK6SqSyuE8+3hqc9nDwUf7n0obSXA+VStjU87eFk4mI4H5taLqGGB2EcjeiyjtrKJTU8CK4zpN+V05wnl3LkmlayUhnT//7grOQSidbwnKUlL4NRXVYLhFzKj1giN6Nh/et3ZwEbTXIpP168RCHPRpNcQi6BQt525bxqkEukRIs4Cnn5l/PmWi6RDi9boJBXRDnvIpeQS6CQF6qcNw1yCbkECnmRZPmurVySS6CQl7Bzfj0QckkuQQKFPHfkfdED0Z3kEnIJNuaOvIIWTXIpP27HI0Oe1i5o0SSX8tObw8jQwdD+TjbteXJJLoG5KhddFmeavAQplyAFtaF936Ipg4sgFG3lEiShN7ZLaYKQS3IJkuAIUzH1PLkklyANjjA94jif5BJyCVal8+HRraYp0a0m1yHKJUiDzoditpr8xcklSIPLW58xJhhN/tbkEth2yDuaUuuCsJUolyAR7nx4ugsirQY9ZwLkEiRCq3gh0SSX8tvpNH2RKa9dvBxNaew12UnMj+mLXGkVL6MNwt+zXIJUaBVfJppquYRcgmV4HnChan/sI7c2EuUSWDCV5zC3Yf+anQiQS5AOO+KL9kEE3Ww6+buRS5AMv6QX1k8R73f19yKXIB2OtqxQ0bvIJeQSWDBZNvn1IZfAgokvlk2Bdpv8JcslsGDi3TlIk54DTHIJLJiIVNKb/DXIJbBg4pfjuHM2+TvOrkps4sKCiaSzyfnp7Fbh5i0smEg7m/zZyyVIiksftsymvtmhF+LsD14uQUpUeTafVeZL7acHcgk+5VrxPXauu2m7hZNGcbkEiS2YPFyb+cLp4o9aLkFa/Jzed8dp9ffY3SgulyAxgwXT3lW9sWnXXDn5E5ZLkBgvmkZZOa0UThry5BKkxrwVaM9phYYIrS1yCVLjcG2wul7fVEuewbWDKJcgOX5QB3Qem6r1uwO5RJn0ikdeO02vNkUM/hiz0pixKIJKT/SfyO+Lp6cbyg/+AOUSaH1gldpe3zTt41tPbiKSS6D1gTUd+/d8un/95GlAuQRaH9ho/TS+B1TtV4dcgvy49SHxDaj3hKo+W0P585FLkCC3e+bi8DOjmkvb/tdm7lliuQQpMnflupLqe4vhnLQmK4rhEBPIJQhF1xbIJVDJA+QSqOSBXAKVPGABtZkKlTwgEPMUZXG6FuQShOJ0LcglCMU9eSCXIFQlz1s9EJnnainPycAHuQSRaBYHuQSheN0U5BLYYgLuMZuisMUEBOL5JWwxAXIJducUE8glCLXFdDb8ISTXiVPsFpOL8kAuQSQuygO5BKE0JgAIyPNL6H0AIjE1ofcBkEsQJJj0PkA0BzMTRdOUB9G4Ho/CacoDuQShVKYBCKUzLVE6TXkQimuIQDCBXIJQdItDIJU5CRxjgkBcQwSCCeQSBFM7xgRRDGYk+OF8LcRhPgLBBIEcTUcgmCAQ1z2AYAK5BIIJuG02F5GFsRFMkAfXPZCH/nqoBBPkYDKhkUkuXa+Hi2CC9DlWSz65dL32rWACuQRxcmmJZBJMsC/zGXnl0gLJJJhALsGCufSWTC92QNQucYX9nM1n5JdL11d789wuDvtxrJYsc+ktmZpBMEGKOvMZeebS9Xqc6xf+eZ5Wh504Vku2ufRmfKEFYjY9wC68ok4mxttf+KF6upxXmR9gD44vkYnms2/82J2e/Ede9IvDDk7mMzLPpTfnJxdNDjLBDkxnFJBLb7qnrs7Tlgeb81otheTS9XqYn6gODNryYGOOL1FMLr3X86bHO8cn0wRsajSdkYn2vk/+8WjS/QCbcnyJwnLpPZqaxwp6bsuDLTm+RHm59HOv6ZE2CJtMsCHHl8jF6cFv/zhW91f0bDLBZmrTGbl44vt/WzbdebDpdDBbwDZMZpScSz93m+7LpmE0XcAWvL5EPl5omzvPd9T01PJgC44vkY/+tcFw7Jv264XTSV8erE+bOHLptw2nvrl83kQ+ePoCVjeZzMjGcs3c57G53G5VdcYW1qZNnHw0C4+OY981VXvS/gCb0iaOXPp+G7Yfm2Zq23+2nyZLJliTuYx8tNsMmt5JJliRNnHkEhCJNnFyYkRD+rSJI5eASNwmTk4ce4X0aRMnJ70hDckbTGVkpDGkIXVHMxk5cbEqJE87HlnRKA7Jm81k5KQ2piF1bm0lL8Y0pE47HnnRkAepc2sreXHXN6TOPEZeNIpD4rTjkRkNeZA47XhkRkMeJE47HrkxqiFt2vHIjYY8SJvb8cjNbFhDytyOR3Yq4xpSph2P7JyMa0iZx2rR+ABE4rFaND4AkZxMYmh8AAIxh5Gfi4EN6Tqbw8iPGx8gYZ05jAwdDG1IlluIyJGnLiBdbiEiR5OhDclyCxE5crIWknUwg5Glo8ENiRpNYNhgAgJxCxE2mIBItD1ggwmIRNsDNpiAQLQ9kKvO8IYkaXsgV94GhDRpeyBXrsiDNGl7IFtn4xtSpO2BbHmDCVKk7YF86RSHFHnkgozpFIcEeeSCjOkUhwRpeyBjHlOHBJm6yJkRDsnpzVzkzJ3ikJzZzEXOXPkAybmYucjZYIxDamozFwp5QBxO1aKQB0TiMnEU8oBInKpFIQ+IxKlacudoLaTFrEX23JEHKXGqlvy5Iw9S4q1a8uexC0iJU7UU4GCkQzq8VUsBJiMdknE2ZVGA2lCHZLi0lSI4wgS2lyASR5ggGS5tRecDEIhLWylEY7RDGjrzFTofgEAq8xWFcOcD2F6CSFrDHWwvgc4HwPYS3ObZWrC9BKF47QJsL0EkWsXB9hJEMhjyYHsJItEqDuG5HI+iOFsL4Xl7CQsmIBBvL1EYZ2shOG8vUZresAfbS2DBBNzJLIUFExBIb5LCggkIpDFJYcEEBHIyR2HBBMRxNEVhwQQE4hIiLJiASLxxQZlc+gBReeOCMrklD4JyCREWTEAkLiGi2AWTh2shpNb0RKk8XAsR6RKnXIMFEwQ0mpwoV2UGgHh0iVOysykAwtElTskcroVwdIlTNr3iEI0uccqmVxyicZc4hdMrDrHoEkfrg3kAInGXOFofzAMQycWshNYHEwEEMpiUKJ5bHyAQlz3Ajx8XUwGEMZmSwJPqEIjLHuCHQ0wQh8se4KfJbAAxNOYjUMmDQFz2ACp5EMjBbAQqeRCIO1tBJQ8iac1F8H9O18L+3NkKHzhdC7tzZyt85J482Js7W+G3St7BrADKeBDIybQAyngQiWZxUMaDUEYTAyjjQaQtJs3ioIwHtpgAZTywxQTReEEdbDGBMh6E32I6mx5AGQ8ibTHpfYA96MaDz7goD5TxIJTGDAHKeBCJG1xBGQ/0PoAyHvBZMOl9AGU8iERTHijjQSiVeQKU8UAwQalOJh34jqY82M7BlAOCCQKZzTjwPd3ioIwHgglKdDbfwH3BdDBfwBYm0w3cxzEm2ERttgHBBHGM5hoQTBBIZaoBwQRxHAczDQgmiMMdRCCYIJLWNAOPuQgmWJE7iMCKCSJpzDEgmCAQh5dAMEEgvQkGBBME4vASCCYIxOEleDqYXOIKK3B4CZ7m2QtYgcNLIJggEIeX4KVg8rQ6LMzLS/AawQTLcngJXjSZR2BBXl6Cl1X6xWE5F3MKvMxBJliMrgdYQq0tDxbiylZYxDCaTmARuh5gIY35BBag6wEWo/sBFqDrAZbjtjx4ma4HsMkEkeh6AJtMEImuB1hYa5MJXqDrAZav5fWmFniaFy5ALQ8C0fUA69Ty9OXBc7xwASvV8vTlwVMG0wesxBlbeEJn7oDV1Nof4GEnUwesyGuB8KDevAGrOnn7Ah5SmTZgZY1dJrifJnGwywSRuBoPNtllsmSCO7kaDzbhLBPcR5M4bMX1D3APTeKw3ZLJjXnwLU3isCX9D/AdTeKgmAeBaBKHzenMgy9oEocdtplmcw984ugmcdhlm6kz/cBNmsRhr20mDRBwizO1IJkgkNHUAHsmk3vG4Q+tiQF2VWkah4+cqQXVPIjEmVqQTBCIM7UQJJl0jYPlEoRSd+6AAGdqIZKh0QJB8VxBBLFUNpqwXAKU8yAKVxBBxHJe5awtxXIFEcR0mi2asFwCQrmM5igslwD1PNiRK4ggunoSTZTEja0gmsByCXg4mip7TVguAbH2mi6duyCwXAJCOU0ugyBrbmyFBLWz3SZy5YELSLak11g3YbkEBFs3TaP9JiyXgFDLJk16WC4BUTLJNhOWS0AMp0rHOJZLQAi1jgcsl4DHjX1zOS38z2yruff0BZZLwDOmn8PsPDbVAreqDG3V9Ap3WC4BL5TbPg63fmymtn0mj9qm6ZXtsFwCXnerV+7c903TtG17+jKL3lZHzdxbIGG5BCxeyPvSW0z9RhBhuQRsU8gDLJcgYiEPsFyCwIU8wHIJNjOYacByCSJxpSpYLkEkF3MNWC5BJO4Mgjv15gvYwmy2gfu05gvYwslsA5ZLEIkjTGC5BJFU5huwXIJABp0PcIeTyQK20plx4FudqQI2o/MBvlebKmA73vQDyyWIROcDfOM4mChgS976g681pgnYVGPaAcslCESrOHzJha2wNa3i8AXvW8DmajMPfO5ijgALJojDDUSwg9bcA59xYSvswdla+IQjtWDBBJG4gQgsmCAQR2rBggkCcaQWduMyIrhhMjfAXtzeCn9zpBZ2dDYHwZ/0iIMdJgjEkVrYlZY8+IMecbBggkBm0wJYMEEcesTBggki0SMOu3OtOPxyNiXA7rzDBL/oEYcAZnMR/Gs0IUAAw9FsBP80PegRhxAm0xH85B5xCML1rfDuoEccgtArDu8uJgOIYjQjgYvxIJBa6wO4GA8iacxJaHowEUAkWh/Q9GAegEi0PqDpAQhF6wNlc9MDROPWB4rmpgeIx60PaHoAQvFCIOXyvAVE5BAT5fK8BajkQSCd4Q8qeRCo6cHRJVDJg0Aqgx9U8iAO97WCSh5E4ugSqORBII4uQWgXsxSFcXQJguvMU5TF0SUIbvDiBUWZDXqI7mSmoiBeXYIEaBZHFQ8IRbM4xfDqEqSxxaRZnEK4gAhsMUEk3k4HW0ygigc8YTRloYoHRNpiOpu0yJ5rxCGpLSa9D+TONeKQFhflkXsVzzXikJjGxEXWJoMcUuMGV1TxgEj0PqCKB8QKJr0PZMuJWkiSpjxy5UQtJEpTHplW8ZyohVRVZjBU8YBIZlMYqnhAJLrFyY43aiFtXgkkN96ohbQ5xkRmZqMaBBPEcVbFg/SDyTEmMnIypCF9zteSj8aABsEEcbiuFQQTBOK6VhBMEImn00EwQSAuegDBBIG46AEEE0TiogcQTBCIFnEQTBDI2RAGwQRxaBGHPIPJXXmkyluAkCeXuJKozugFwQSBNpe0iEO+wTSa40hvc8kt4pAzT6uTHPcPQd4a0xxpcf8Q5K4y0ZES916QmlAAAAu4SURBVA9B/loHmUiIzSUogINMpGMyYKEEQ2+6w+YSEIm2PJLg5BKUQ/cDCXByCYraZNL9QHhOLkFZm0y6HwjOtXhgkwlsLgF7bjKp5RF4c8mbS1DiJpNaHmF5cwnK3GRSyyOoxvAEtTyIozc2oVi1Wh7xuK0VijabBYnGgVooW3swDxKKA7VQOu+rE4oDtcCPi/YHwjgbkIAlE3Ec9TwAlkzoeQACLpkcskXPAxCKxjz0PACxlkyNeRE9D0AkdW9qZD/ueQD+5sY89mvF0/MAKOah5wFQzINbvG0BfEpnHlrxgFhsM7F1K56eB+BLQyOZ2LLnQSwB3yaTCyDQigeEUksmtOIBkgmteACSCa14gGSCn614RhnwaDLpzWPFWNKKBzxM1zha8YBgyVS5A4JViCXgWRf35rE8HeLAC2w0sbTJsAJeLOedTaUsR4c48LqTRRNL6Y0nYJlFk50mlqBDHFhM3WjP41UHsQQsWs+b1fN4hYNLwOIutpoQS0CwaJoV9HiKg0vAegU9veOIJSCUehpNtDzCi0vA6lrLJu7mPC2wieEimxBLQLhscuqWrzlPC2xe05tGbXqIJSDWwqltRlU9xBIQbOVUNb2lEx8ca8MC2N2pbebe4omrax6AYKW9tmm63gJKLAEEjKj3kHo3m6wLIpaA+DU+9b2CuH0ICO/iSnKxBBCHIp5YAohjcDWEWAKIo1XDK4krxIHoGlN1SdzVCqjhIZYA1PAQS0CC9OGJJYA4amdpxRJAHJUanlgCCGPoTNRiCSCMk9vExRJAHA4tiSWAODQ8iCWAQCYND2IJIAw3PIglgEC8tCSWAAItlkaztFgCsFhCLAFYLCGWAIslxBKAxRJiCbBYQiwBPKm2WCrS7NMHYnLBQ5kqnz4Q0skFD2IJIA5Xh4slgDha7yyJJYAwPEpbqmPr6wcC0u9QbCydfP1APPodxBJAoBLebHou1VksAfFUSnjlxtLg+weiac9mZ7EEEKaEpwuvYJ1YAqJplPBKjiUDAAjm4iBtydzUCgSjN7xsLnkAYqltLIklgDAGG0tlc5oWiMWJJbEEEId7wx1bMgqAQKmk3aF0vVgC4qhH07JjSwBhUkkTHo1xAEgl9IcD/ElrOBrxAKlErEY8sQRIJfSHA0glNOIBUgmNeABSiTs7HjTiAQHoDEcjHiCV0PEA8LfWjUP81/EgloC9XdzOio4HIIzKSxb82lq6GBHArrTg8dFBxwOwq7qTSnzgsSVgVx7943ezQQHsWMCzrcQfW0sO0wI7FvBmBTxsLQFR6AvH1hIQZ6nUKOBhawmIonXdEDe2lpxaAvZZKk2WStzgZVpgFxd34HHTaGsJ2GGpNFsqcdtkeABbG6qz2ZdPtpbU8IDN63daHdAeDkRxUr/jCx61ADal/46va3itQQJsZ5hsKqGGB0QJpUpTOGp4gFBCDQ/gd7VQQg0PCBNK9pRQwwOiOM1Cibsc1PCA1V06LeHcyX14wNrVO1tKPNDw4D48YFWt6h2P8KYFsOZCaRqPJloe4V1aYC2DHSUer+FpeABWyiTFOzQ8ADIJDQ8AMomFGh5qIwhY0qmyn8QL3PAALLhMapte3x26w4EI2qlTuuPl7nAND4BIIgzX4QELFO5EEhZLQIhFUjXbS8JiCYiwRpqaXscdC3OUFnhiiXRput4EyhqLpYvxBdzv9LZCGhXtsLME3E6JsWumtl1/INdv66Oml0fYWQK+yYt/a2mHvp+bpm0XHdRD+55GXa9eh8UScLfLX2uYc9+PTfO+jmrbx24XO73/V97+q28rI90MWCwBT65q5u+He/9/XfPRf/9nBToCaCyWIBet46ykz214kJXGeoe0eWcJclPrTSBlvXeWID8XjQoku1hykhaydEf/A0SkORyydVLMI8F+B83hkLNK/wP6HQDFPHjSqN8BFPMgDPc7QCnFPJ15JFHCawxWKKaY15jzUMIDIqlH0x5KeEAkrWIeSnhAKJOecYLqlPCg0G0mPeNE5CAtlLzNpGeccCW8ysCEsreZPM1EKN7+A1xNRBx6w4Ef76eZJBMh9DaWgH/UnSmR3R1sLAEfkkkDBDu3O9hYAn7XSiZ25Ok/4G8eWke7AxCLi8bR7gCEojWP7dsdpBIgmdCEBySUTG7NY7MmvMmAA+7gOBPbpJLWcEAyIZUAyQR/k0qAZCIOD/8BkgmpBEgmkEqAZEIqAZIJpBIgmZBKQKHJ5HYiXuW8ErAo9+YhlYBoyeQVDKQSEIr3mXiGO8OBFZPJa+s86CyVgFW1o5mW+3mLFliftnHubgw/GS/AFjTncU+zw+y4ErAdLRB80+wwacEDttVqgeDzbSXNDsAO6k45j5vbSpodgJ04a8vf20qNbSVgT0408ZHTSoByHgp4AH+U8yblPK4HBTwgENdA6MAzCoBg5Tw9EAX3OjhCC4R0sWgqtNfBEVrAookoSyV34AEWTQTaVbJUAiyasKsE8KDWWxjZGy++cyAlQ3U2dWd8VmmyVAISrOfN6nlaHQBCuajn5Ve/c4AWSLye52LXnI4qee0PyKGeN9lqymNTyQV4QDZOtprSbwq3qQRkFk2ew0i500FTOJCji2gSSgCiCaEEIJqEEoBoQigBiCahBJBJNGkeD3pOSUs4UKzT7MhtMOdJKAFlqycXFYUxVm50AHi/Q89mU4DqnS0lgA9am0176lXvAG5U9EYBsc9CySXhAJ/Qo2ehBBBt2VSNdpu2ab2b7SgB3KdtNOmtXbzTegfwkOHibNNalzmMk0wCeK6k19luWjyTbCgByCaZBCCb+G0/SSYBLJtN9pue77vT4wCwikGf3qOlu75pHZoFWNVpUtS7b5nUVUp3ABstnC5N7/DtF7tJY9P6SgC2XjhVs6rezUhSuQMQTiIJAOH03/Wr3SSSAGKpL81YYEPEoW8u2hsAwmqnuZSOiLdEqnQ3AKRgyDydJBJAounU9HlV9o59p2oHkLhT28zJx9PPQLJEAsgrnpo+vRv2+r5pWiskgGwN7eVt+dTH30Eam6m1QAIoR9tOTRctoPq+e1seOYkEULK6bZv3JdRhvzDqm/fFkbcoAPgroqqfGbVyk/n5ZxQ1VWvnCIC7ndqfMdU0Y//u6Z2id937P+dtTaRGB8DyafWf5jcf/xMrIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACO5/ioxNu9HxjVUAAAAASUVORK5CYII="
            align="middle"
            height="48"
            width="48"
            component={Link}
            to={'/app'}
          />
        </Grid>
        <Grid item style={{textDecoration: 'none'}} component={Link}
          to={'/app'}>
          <h1 
          className={classes.text}
          >Social Pill
          </h1>
          </Grid>
          </Grid>
          </Grid>
          <Grid item>
          {user.username === '' ? null : 
          <Grid
              container
              direction="row"
  justify="flex-start"
  alignItems="center"
  spacing={5}
            >
              <Grid item></Grid>
            
          <div className={classes.user}>Hi, {user.username}
          </div>
          
          <Grid item>
          <Button size="small" className={classes.button} variant="outlined" color="primary" onClick={handle_logout}>
        Sign Out
      </Button>
          </Grid>
          
          </Grid>
          }
          </Grid>
          </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
