import React from 'react';
import {Text} from 'react-native';
import Colors from '../theme/Colors';

function convertHtmlToReact(htmlString, width = 200) {
  const reactElements = htmlString
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<br>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .trim();

  return (
    <Text
      style={{
        width: width,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
      }}>
      {reactElements}
    </Text>
  );
}

export default convertHtmlToReact;
