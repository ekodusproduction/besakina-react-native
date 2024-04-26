import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomDropdown = ({options, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = option => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSelectOption(option)}>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
export default CustomDropdown;
