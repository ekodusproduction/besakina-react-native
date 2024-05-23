import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 21,
    fontWeight: '500',
    color: 'black',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  subsubtitle: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  inputfield: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 60,
    paddingLeft: 20,
    borderWidth: 0.8,
  },
  button: {
    backgroundColor: '#3184b6',
    borderRadius: 12,
    height: 60,
    justifyContent: 'center',
  },
  indicatorcontainerstyle: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
   },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    height: '100%',
  },
  icon: {
    marginLeft: 10,
  },
  dropdown: {
    borderRadius: 5,
    height: 60,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
  },
  iconsearch: {
    marginLeft: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    left: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
