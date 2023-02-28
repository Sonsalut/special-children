const colors = new (class {
  black = '#000000';
  white = '#FFFFFF';
  light_white = 'rgba(255, 255, 255, 0.5)';
  green = '#42CFA4';
  grey = '#F3F5FA';
  dark_grey = '#ADAEC2';
  red = '#F3684A';
  violet = '#6078F8';
  linearApp = ['#CE9FFC', '#6078F8'];
  lightPink = '#CE9FFC';
  light_violet = '#DFE4FE';
  orange = '#F39B4A';
  transparent = 'transparent';
  text1 = '#2F2F2F';
  text2 = '#ADAEC2';
  redLive = '#FF471F';
  white_gray='#FDF8EF';
  blue = '#0096FF';
  title_blue = '#87C2E4';
  text_blue = '#2D5672';
  btn_blue = '#60A2C8'

  whiteWithOpacity = (opacity: number) => `rgba(255, 255, 255, ${opacity})`;
  blackWithOpacity = (opacity: number) => `rgba(0, 0, 0, ${opacity})`;
  violetOpacity = (opacity: number) => `rgba(96, 120, 248, ${opacity})`;
})();

export default colors;
